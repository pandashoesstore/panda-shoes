import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Panda Shoes – Union City, NJ',
  description: "Quality footwear for the whole family. Men's, women's, and kids' shoes at great prices in Union City, NJ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
