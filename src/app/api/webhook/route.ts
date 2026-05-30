import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminClient } from '@/lib/supabase';
import { sendOrderConfirmation } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabaseAdmin = getAdminClient();

    // Find and update the order
    const { data: order } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        stripe_payment_id: session.payment_intent as string,
        shipping_address: session.shipping_details?.address ? {
          line1: session.shipping_details.address.line1,
          city: session.shipping_details.address.city,
          state: session.shipping_details.address.state,
          postal_code: session.shipping_details.address.postal_code,
          country: session.shipping_details.address.country,
        } : null,
        total: (session.amount_total || 0) / 100,
      })
      .eq('stripe_session_id', session.id)
      .select()
      .single();

    if (order) {
      try {
        await sendOrderConfirmation(order);
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
