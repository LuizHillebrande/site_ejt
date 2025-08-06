import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

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
        <main className="pt-32">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
