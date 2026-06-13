import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { sendTrackingEmail } from '@/lib/email';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getAdminClient();
  const body = await req.json();
  const { notifyTracking, ...updates } = body;

  const { data, error } = await supabase.from('orders').update(updates).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let emailed = false;
  if (notifyTracking && data?.tracking_number && data?.customer_email) {
    try {
      await sendTrackingEmail(data);
      emailed = true;
    } catch (e) {
      console.error('Tracking email failed:', e);
    }
  }

  return NextResponse.json({ ...data, emailed });
}
