import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
}
