'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

export default function OrderActions({ orderId, currentStatus, trackingNumber: initialTracking = '' }: { orderId: string; currentStatus: string; trackingNumber?: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [tracking, setTracking] = useState(initialTracking);
  const [trackingSaved, setTrackingSaved] = useState(false);
  const [saving, setSaving] = useState(false);
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
    </div>
  );
}
