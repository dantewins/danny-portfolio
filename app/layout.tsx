import type { Metadata } from "next";
import { Poppins, Merriweather, Raleway } from "next/font/google";
import "./globals.css";
import { Container } from "@/components/ui/container";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Danny Kim",
  description: "Danny's developer portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${merriweather.variable} ${raleway.variable} antialiased`}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}