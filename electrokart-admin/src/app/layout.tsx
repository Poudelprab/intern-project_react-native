import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner"



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
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <main>{children}</main>
            <Toaster richColors/>
            </ThemeProvider>
      
        
      </body>
    </html>
  );
}
