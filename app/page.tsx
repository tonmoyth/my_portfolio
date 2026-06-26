'use client';
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
// import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/proccess";
import { Projects } from "@/components/sections/project";
import { Services } from "@/components/sections/service";
import { PageLoader } from "@/lib/PageLoader";
import { ParticleBackground } from "@/lib/ParticalBackground";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}
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
          {/* <Experience /> */}
        </main>
      </SmoothScroll>


    </div>
  );
}
