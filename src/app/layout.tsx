'use client';

import '../styles/globals.scss';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import { metadata } from './seo';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.favicon.src} />
      </head>
      <body>
        <Provider store={store}>
          {children}
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
