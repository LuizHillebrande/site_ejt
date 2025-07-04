import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Empresa Júnior Toledo",
  description: "Site institucional da Empresa Júnior Toledo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-background text-primary">
        <Header />
        <div className="pt-28 min-h-screen flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
