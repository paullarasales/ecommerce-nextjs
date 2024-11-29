import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';
import Link from 'next/link';

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Superbike Rental App",
  description: "Rent superbikes easily and conveniently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Superbike Rental</h1>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/auth/signin" className="hover:underline">Sign In</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto my-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Superbike Rental. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}