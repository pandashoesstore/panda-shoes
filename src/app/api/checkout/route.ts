import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminClient } from '@/lib/supabase';
import type { CartItem } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { items, customer } = await req.json() as { items: CartItem[]; customer: { name: string; email: string; phone?: string } };
    if (!items?.length) return NextResponse.json({ error: 'No items' }, { status: 400 });

    const lineItems = items.map((item) => ({
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

    // Pre-create order in Supabase
    const supabaseAdmin = getAdminClient();
    const { data: order } = await supabaseAdmin.from('orders').insert({
      status: 'pending',
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone || null,
      items,
      subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
    }).select().single();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer.email,
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: {
        orderId: order?.id || '',
        customerName: customer.name,
        customerPhone: customer.phone || '',
      },
    });

    // Store session ID on order
    if (order?.id) {
      await supabaseAdmin.from('orders').update({ stripe_session_id: session.id }).eq('id', order.id);
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
