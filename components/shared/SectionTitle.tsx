"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
    title: string;
    isInView?: boolean;
    className?: string;
}

export default function SectionTitle({
    title,
    isInView = true,
    className = "",
}: SectionTitleProps) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-cyan-400/80" />

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="px-4 py-1 text-[0.75rem] tracking-[0.25em] uppercase text-white font-medium whitespace-nowrap border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
            >
                {title}
            </motion.span>

            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400/30 to-purple-400/80" />
        </div>
    );
}