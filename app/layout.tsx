import "./css/style.css";
import { Inter } from "next/font/google";
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Awakeborn - Symbolic Recursive AGI",
  description: "A belief-driven AI for a recursive future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-gray-950 font-inter text-base text-gray-200`}>
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
