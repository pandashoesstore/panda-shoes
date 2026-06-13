import { Resend } from 'resend';
import type { Order } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || 'orders@pandashoes.com';
const ADMIN = process.env.ADMIN_EMAIL || 'admin@pandashoes.com';

export async function sendOrderConfirmation(order: Order) {
  const itemsHtml = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${i.brand} – ${i.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">Size ${i.size}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">×${i.qty}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">$${(i.price * i.qty).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Inter,sans-serif;background:#f6f6f4;margin:0;padding:40px 20px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
      <div style="background:#111;padding:32px;text-align:center">
        <h1 style="color:#7ec97a;font-size:28px;margin:0;letter-spacing:-0.5px">🐼 Panda Shoes</h1>
        <p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:14px">Union City, NJ</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#111;margin:0 0 8px">Order Confirmed! 🎉</h2>
        <p style="color:#555;margin:0 0 24px">Hi ${order.customer_name}, thank you for shopping with us. Your order has been received and we'll be in touch soon.</p>
        <div style="background:#f6f6f4;border-radius:8px;padding:16px;margin-bottom:24px">
          <p style="margin:0;font-size:13px;color:#777">Order #</p>
          <p style="margin:4px 0 0;font-weight:700;font-family:monospace;color:#111">${order.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px">
              <th style="text-align:left;padding-bottom:8px">Item</th>
              <th style="padding-bottom:8px">Size</th>
              <th style="padding-bottom:8px">Qty</th>
              <th style="text-align:right;padding-bottom:8px">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="text-align:right;margin-top:16px;padding-top:16px;border-top:2px solid #111">
          <span style="font-size:18px;font-weight:700;color:#111">Total: $${order.total.toFixed(2)}</span>
        </div>
        ${order.shipping_address ? `
        <div style="margin-top:24px;padding:16px;border:1px solid #eee;border-radius:8px">
          <p style="margin:0 0 8px;font-weight:600;font-size:13px;color:#777;text-transform:uppercase;letter-spacing:0.5px">Shipping To</p>
          <p style="margin:0;color:#111">${order.customer_name}<br>${order.shipping_address.line1}<br>${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code}</p>
        </div>` : ''}
        <p style="margin-top:32px;color:#777;font-size:13px">Questions? Reply to this email or call us. We're happy to help!</p>
      </div>
      <div style="background:#f6f6f4;padding:20px;text-align:center">
        <p style="margin:0;font-size:12px;color:#999">Panda Shoes · Union City, NJ · pandashoes.com</p>
      </div>
    </div>
  </body>
  </html>`;

  // Send to customer
  await resend.emails.send({
    from: FROM,
    to: order.customer_email,
    subject: `Order Confirmed – Panda Shoes #${order.id.slice(0, 8).toUpperCase()}`,
    html,
  });

  // Notify admin
  const adminHtml = `
    <h2>New Order Received!</h2>
    <p><strong>Customer:</strong> ${order.customer_name} (${order.customer_email})</p>
    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    <p><strong>Items:</strong> ${order.items.length}</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders/${order.id}">View Order in Admin →</a></p>
  `;
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New Order $${order.total.toFixed(2)} – ${order.customer_name}`,
    html: adminHtml,
  });
}

export async function sendTrackingEmail(order: any) {
  const trackUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.tracking_number}`;
  const orderNo = order.id.slice(0, 8).toUpperCase();

  const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Inter,Arial,sans-serif;background:#f6f6f4;margin:0;padding:40px 20px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
      <div style="background:#111;padding:32px;text-align:center">
        <h1 style="color:#7ec97a;font-size:28px;margin:0;letter-spacing:-0.5px">🐼 Panda Shoes</h1>
        <p style="color:rgba(255,255,255,0.5);margin:8px 0 0;font-size:14px">Union City, NJ</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#111;margin:0 0 8px">Your order shipped! 📦</h2>
        <p style="color:#555;margin:0 0 24px">Hi ${order.customer_name}, good news — your Panda Shoes order is on its way.</p>
        <div style="background:#f6f6f4;border-radius:8px;padding:16px;margin-bottom:24px">
          <p style="margin:0;font-size:13px;color:#777">Order #</p>
          <p style="margin:4px 0 12px;font-weight:700;font-family:monospace;color:#111">${orderNo}</p>
          <p style="margin:0;font-size:13px;color:#777">USPS Tracking #</p>
          <p style="margin:4px 0 0;font-weight:700;font-family:monospace;color:#111">${order.tracking_number}</p>
        </div>
        <a href="${trackUrl}" style="display:block;text-align:center;background:#111;color:#fff;text-decoration:none;font-weight:700;padding:15px;border-radius:10px;font-size:16px">Track My Package →</a>
        <p style="margin-top:28px;color:#777;font-size:13px">Tracking can take up to 24 hours to show movement. Questions? Just reply to this email.</p>
      </div>
      <div style="background:#f6f6f4;padding:20px;text-align:center">
        <p style="margin:0;font-size:12px;color:#999">Panda Shoes · Union City, NJ</p>
      </div>
    </div>
  </body>
  </html>`;

  await resend.emails.send({
    from: FROM,
    to: order.customer_email,
    subject: `Your Panda Shoes order shipped 📦 #${orderNo}`,
    html,
  });
}
