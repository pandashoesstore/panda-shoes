import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (never expose to browser)
export function getAdminClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export type Product = {
  deal?: string | null;
  id: string;
  name: string;
  brand: string;
  gender: 'mens' | 'womens' | 'kids';
  category: string;
  style: string;
  price: number;
  image_url: string | null;
  is_new: boolean;
  is_active: boolean;
  sizes: string[];
  created_at: string;
};

export type Order = {
  id: string;
  stripe_session_id: string;
  stripe_payment_id: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: Record<string, string>;
  items: CartItem[];
  subtotal: number;
  total: number;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  productId: string;
  deal?: string | null;
  name: string;
  brand: string;
  price: number;
  size: string;
  qty: number;
  image_url?: string | null;
  gender?: 'mens' | 'womens' | 'kids' | null;
  category?: string | null;
};
