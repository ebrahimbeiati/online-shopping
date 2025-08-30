import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@/components/providers/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Shopping - Modern E-commerce Platform',
  description: 'Shop the latest products with our modern e-commerce platform built with Next.js and Tailwind CSS',
  keywords: 'e-commerce, online shopping, next.js, tailwind css',
  authors: [{ name: 'Online Shopping Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
