import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Hero Banner Section */}
      <Navbar></Navbar>
      <main>
        <Hero />
      </main>



    </div>
  );
}
