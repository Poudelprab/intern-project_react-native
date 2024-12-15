import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";



const inter = Inter({ subsets: ['latin'] });



export const metadata: Metadata = {
  title: "electrokart",
  description: "React-native gadget app-Prabhat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
          
      
        {children}
      </body>
    </html>
  );
}