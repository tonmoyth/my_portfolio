import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-black text-center text-xs text-zinc-500 font-mono">
      <div className="max-w-7xl mx-auto px-6">
        &copy; {new Date().getFullYear()} Nurislam Hasan Tonmoy. All rights reserved.
      </div>
    </footer>
  );
}
