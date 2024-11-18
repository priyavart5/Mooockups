'use client';

import '../styles/globals.scss';
import { Inter } from 'next/font/google';

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
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
