import "../styles/main.scss";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
  display: 'swap',
})

export const metadata = {
  title: "Mockups By PV",
  description: "All New Mockup Editors By Dev.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body >
        {children}
      </body>
    </html>
  );
}
