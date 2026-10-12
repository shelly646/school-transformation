import type { Metadata, Viewport } from 'next';
import { Geist, Unbounded } from 'next/font/google';
import './globals.css';

const display = Unbounded({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
});

const sans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mamta Modern School | From Chalk to Autonomous Agents',
  description:
    'The transformation of Mamta Modern School, New Delhi — from traditional teaching to autonomous AI agents. An interactive journey in four acts.',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
