import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/project";
import { Services } from "@/components/sections/service";
import { SmoothScroll } from "@/lib/SmoothScroll";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Services />
        </main>
      </SmoothScroll>
    </div>
  );
}
