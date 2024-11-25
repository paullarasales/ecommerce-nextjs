import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider'

const poppins = Poppins({ weight: "500", subsets: ["latin"] })

export const metadata = {
  title: "Ecommerce Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${poppins.className} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
