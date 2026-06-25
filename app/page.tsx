import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/project";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
    </div>
  );
}
