import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "./components/NavMenu";

export const metadata: Metadata = {
  title: "Swiss Army Knife",
  description: "Bunch of common utilities in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='stack-sans-text-regular'>
      <body className='py-6 px-20'>
        <h1 className='mb-2 text-2xl'>Swiss Army Knife</h1>
        <NavMenu />
        <div className='mt-10 p-2'>{children}</div>
      </body>
    </html>
  );
}
