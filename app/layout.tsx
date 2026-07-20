import type { Metadata } from "next";
import { Poppins, Merriweather, Raleway } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Danny Kim",
  description:
    "Danny Kim designs and builds thoughtful web products, learning tools, and AI workflows.",
  openGraph: {
    title: "Danny Kim",
    description: "Thoughtful web products, learning tools, and AI workflows.",
  },
  twitter: {
    card: "summary",
    title: "Danny Kim",
    description: "Thoughtful web products, learning tools, and AI workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body
        className={`${poppins.variable} ${merriweather.variable} ${raleway.variable} min-w-[320px] bg-white font-merriweather text-[#11110f] antialiased selection:bg-[#d8d8d8] selection:text-[#11110f]`}
      >
        {children}
      </body>
    </html>
  );
}
