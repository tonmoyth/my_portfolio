import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/proccess";
import { Projects } from "@/components/sections/project";
import { Services } from "@/components/sections/service";
import { ParticleBackground } from "@/lib/ParticalBackground";


import { SmoothScroll } from "@/lib/SmoothScroll";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">

      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <ParticleBackground >
            <About />
          </ParticleBackground>
          <Projects />
          <Services />
          <ParticleBackground>
            <Process />
          </ParticleBackground>

        </main>
      </SmoothScroll>


    </div>
  );
}
