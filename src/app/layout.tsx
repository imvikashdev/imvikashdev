import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { DebugProvider } from '@/context/DebugContext';
import { ThemeProvider } from '@/context/ThemeContext';
import MagneticCursor from '@/components/system/MagneticCursor';
import DebugOverlay from '@/components/system/DebugOverlay';
import SystemLog from '@/components/system/SystemLog';
import StatusBar from '@/components/system/StatusBar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vikash Choudhary — Full-Stack & Web3 Developer',
  description:
    'Engineering-first portfolio of Vikash Choudhary. Full-Stack & Web3 Developer specializing in zero-to-one product delivery with 99.9% uptime.',
  keywords: [
    'Full-Stack Developer',
    'Web3 Developer',
    'React',
    'Next.js',
    'Node.js',
    'Solidity',
    'Portfolio',
    'Vikash Choudhary',
    'imvikashdev',
  ],
  authors: [{ name: 'Vikash Choudhary' }],
  openGraph: {
    title: 'Vikash Choudhary — Full-Stack & Web3 Developer',
    description:
      'The fixer who ships. Zero to one ownership across full-stack and Web3.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikash Choudhary — Full-Stack & Web3 Developer',
    description:
      'The fixer who ships. Zero to one ownership across full-stack and Web3.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <DebugProvider>
            <MagneticCursor />
            <DebugOverlay />
            <SystemLog />
            <StatusBar />
            {children}
          </DebugProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
