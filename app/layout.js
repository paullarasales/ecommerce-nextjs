import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';
import Link from 'next/link';
import Image from "next/image";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Superbike Rental App",
  description: "Rent superbikes easily and conveniently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-white`}>
        <header className="bg-white text-black p-1 mb-2">
          <nav className="container flex justify-between mx-auto items-center">
            <Image
              src="/logo.png"
              alt="Superbike"
              width={100}
              height={100}
              className=""
            />
            <ul className="flex space-x-4 items-center gap-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/" className="hover:underline">Superbike Listing</Link></li>
              <li><Link href="/" className="hover:underline">Contact</Link></li>
              <li><Link href="/about" className="hover:underline">About us</Link></li>
              <li>
                <Link href="/favorites" className="flex items-center hover:underline">
                  <FaHeart className="mr-1" />
                </Link>
              </li>
              <li>
                <Link href="/cart" className="flex items-center hover:underline">
                  <FaShoppingCart className="mr-1" />
                </Link>
              </li>
              <li>
                <button className="w-24 px-2 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <Link href="/auth/signin" className="hover:underline">Sign In</Link>
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto my-8">
          {children}
        </main>
      </body>
    </html>
  );
}