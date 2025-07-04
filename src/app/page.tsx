import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TeamCarousel from "@/components/TeamCarousel";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <TeamCarousel />
      <Contact />
    </main>
  );
}
