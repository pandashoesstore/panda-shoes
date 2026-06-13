'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

export default function OrderActions({ orderId, currentStatus, trackingNumber: initialTracking = '' }: { orderId: string; currentStatus: string; trackingNumber?: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [tracking, setTracking] = useState(initialTracking);
  const [saving, setSaving] = useState(false);
  const [trackMsg, setTrackMsg] = useState('');
  const router = useRouter();

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) { setStatus(newStatus); router.refresh(); }
    setSaving(false);
  };

  const saveTracking = async () => {
    if (!tracking.trim()) { setTrackMsg('Enter a tracking number first.'); return; }
    setSaving(true);
    setTrackMsg('');
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking_number: tracking.trim(), notifyTracking: true }),
    });
    const data = await res.json();
    if (res.ok) {
      setTrackMsg(data.emailed ? 'Saved & customer emailed the tracking link.' : 'Saved (email could not send - check tracking email is valid).');
      router.refresh();
    } else {
      setTrackMsg('Error: ' + (data.error || 'could not save'));
    }
    setSaving(false);
  };

  const STATUSES = ['pending', 'paid', 'fulfilled', 'cancelled'];

  return (
    <div>
      <div className={styles.formGroup} style={{ marginBottom: 16 }}>
        <label className={styles.formLabel}>Update Status</label>
        <select className={styles.formSelect} value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s}</option>)}
        </select>
      </div>
      <button className={styles.btnPrimary} onClick={() => updateStatus(status)} disabled={saving || status === currentStatus}>
        {saving ? 'Saving...' : 'Update Status'}
      </button>

      <div style={{ borderTop: '1px solid #eee', margin: '22px 0 0', paddingTop: 18 }}>
        <label className={styles.formLabel}>USPS Tracking Number</label>
        <input
          className={styles.formInput}
          value={tracking}
          onChange={(e) => { setTracking(e.target.value); setTrackMsg(''); }}
          placeholder="e.g. 9400111899223817658398"
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button className={styles.btnPrimary} onClick={saveTracking} disabled={saving}>
          {saving ? 'Sending...' : 'Save & Email Customer'}
        </button>
        {trackMsg && <p style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: trackMsg.startsWith('Error') ? '#c0392b' : '#3a7a37' }}>{trackMsg}</p>}
      </div>
    </div>
  );
}
