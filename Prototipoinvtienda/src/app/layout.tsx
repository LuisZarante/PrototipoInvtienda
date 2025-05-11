import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Configure Inter font
const inter = Inter({
  variable: '--font-sans', // Use standard --font-sans variable
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inventienda', // Update title
  description: 'Sistema de Inventario Web', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Set language to Spanish */}
      <body className={`${inter.variable} font-sans antialiased`}> {/* Use Inter variable */}
        {children}
        <Toaster /> {/* Add Toaster for notifications */}
      </body>
    </html>
  );
}
