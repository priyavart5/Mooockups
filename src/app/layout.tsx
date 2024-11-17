import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import favicon from '../../public/favicon.ico';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
  display: 'swap',
})

export const metadata = {
  title: "Mockups By PV",
  description: "All New Mockup Editors By Dev.",
  icons: favicon
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
