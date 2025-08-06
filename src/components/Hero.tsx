"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative text-white min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/header/header_principal.png"
          alt="Background"
          fill
          quality={100}
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40 z-10" />
    </section>
  );
} 