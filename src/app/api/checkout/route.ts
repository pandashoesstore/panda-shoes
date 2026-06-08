import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminClient } from '@/lib/supabase';
import type { CartItem } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const {
      items,
      customer,
      tipAmount = 0,
      discountAmount = 0,
      promoCode = null,
      shippingCost = 0,
      taxAmount = 0,
      deliveryMethod = 'pickup',
      shippingTier = null,
      address = null,
    } = await req.json() as {
      items: CartItem[];
      customer: { name: string; email: string; phone?: string };
      tipAmount?: number;
      discountAmount?: number;
      promoCode?: string | null;
      shippingCost?: number;
      taxAmount?: number;
      deliveryMethod?: string;
      shippingTier?: string | null;
      address?: Record<string, string> | null;
    };

    if (!items?.length) return NextResponse.json({ error: 'No items' }, { status: 400 });

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    // Build line items
    const lineItems: any[] = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.brand} – ${item.name}`,
          description: `Size ${item.size}`,
          metadata: { productId: item.productId, size: item.size },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    // Shipping line item
    if (shippingCost > 0) {
      const tierLabel = shippingTier === 'express' ? 'Express Shipping (USPS Priority Mail)'
        : shippingTier === 'overnight' ? 'Overnight Shipping (USPS Priority Express)'
        : 'Standard Shipping (USPS Ground Advantage)';
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: tierLabel },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // NJ Tax line item
    if (taxAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: `Sales Tax${address?.state ? ' (' + address.state + ')' : ''}` },
          unit_amount: Math.round(taxAmount * 100),
        },
        quantity: 1,
      });
    }

    // Tip line item
    if (tipAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tip — Thank you! 🙏' },
          unit_amount: Math.round(tipAmount * 100),
        },
        quantity: 1,
      });
    }

    // Discount coupon
    let discounts: any[] = [];
    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discountAmount * 100),
        currency: 'usd',
        duration: 'once',
        name: promoCode ? `Code: ${promoCode}` : 'Deal discount',
      });
      discounts = [{ coupon: coupon.id }];
    }

    const finalTotal = Math.max(0, subtotal + shippingCost + taxAmount + tipAmount - discountAmount);

    const supabaseAdmin = getAdminClient();
    const { data: order } = await supabaseAdmin.from('orders').insert({
      status: 'pending',
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone || null,
      items,
      subtotal,
      total: finalTotal,
      delivery_method: deliveryMethod,
      shipping_tier: shippingTier,
      shipping_cost: shippingCost,
      tax_amount: taxAmount,
      tip_amount: tipAmount,
      discount_amount: discountAmount,
      promo_code: promoCode,
      delivery_address: address,
    }).select().single();

    // Only collect shipping address for shipping orders
    const shippingCollection = deliveryMethod === 'shipping'
      ? { allowed_countries: ['US'] as const }
      : undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer.email,
      shipping_address_collection: shippingCollection,
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?order=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: {
        orderId: order?.id || '',
        customerName: customer.name,
        customerPhone: customer.phone || '',
        promoCode: promoCode || '',
        deliveryMethod,
        shippingTier: shippingTier || '',
        deliveryAddress: address ? JSON.stringify(address) : '',
      },
    });

    if (order?.id) {
      await supabaseAdmin.from('orders').update({ stripe_session_id: session.id }).eq('id', order.id);
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
