import type { Metadata } from 'next';
import { Heebo, Frank_Ruhl_Libre } from 'next/font/google';

import { content } from '../content';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  weight: ['400', '500', '700'],
});

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  variable: '--font-frank',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: `${content.branding.businessName} — ${content.branding.tagline ?? ''}`,
  description: content.seo.description,
  keywords: content.seo.keywords,
  openGraph: {
    title: content.branding.businessName,
    description: content.seo.description,
    locale: 'he_IL',
    type: 'website',
    images: content.hero.image?.src ? [{ url: content.hero.image.src }] : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`}>
      <body className="bg-rose-50 font-sans text-rose-900 antialiased">{children}</body>
    </html>
  );
}
