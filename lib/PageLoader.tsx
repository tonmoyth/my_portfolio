'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function PageLoader({ onDone }: { onDone: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // ── Smooth entrance for branding ─────────────────────────────────────
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        // ── Readiness-driven progress ─────────────────────────────────────────
        let raf = 0;
        let current = 0;
        let ready = document.readyState === 'complete';
        let minElapsed = false;
        let exiting = false;

        const startExit = () => {
            if (exiting) return;
            exiting = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    onDone();
                },
            });

            // 1. Instant fade out of the branding content
            tl.to(contentRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.in'
            });

            // 2. Cinematic 3D Horizon Fold (No text bugs, completely clean)
            tl.to(topPanelRef.current, {
                rotateX: 90,
                y: '-50%',
                opacity: 0,
                duration: 1.2,
                ease: 'expo.inOut'
            }, 0.1);

            tl.to(bottomPanelRef.current, {
                rotateX: -90,
                y: '50%',
                opacity: 0,
                duration: 1.2,
                ease: 'expo.inOut'
            }, 0.1);

            // Global fade out overlay container to ensure safety
            tl.to(containerRef.current, { opacity: 0, duration: 0.3 }, '-=0.3');
        };

        const tick = () => {
            const target = ready && minElapsed ? 1 : 0.93;
            current += (target - current) * 0.06;

            if (target === 1 && current > 0.995) current = 1;

            setCount(Math.min(100, Math.round(current * 100)));
            if (lineRef.current) lineRef.current.style.transform = `scaleX(${current})`;

            if (current >= 1) {
                startExit();
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const onReady = () => { ready = true; };
        if (!ready) window.addEventListener('load', onReady);

        const minTimer = setTimeout(() => { minElapsed = true; }, 800);
        const fallback = setTimeout(() => { ready = true; minElapsed = true; }, 5000);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(minTimer);
            clearTimeout(fallback);
            window.removeEventListener('load', onReady);
            document.body.style.overflow = '';
        };
    }, [onDone]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] overflow-hidden bg-transparent select-none flex flex-col"
            style={{ perspective: '1200px' }} // Enables the premium 3D depth effect
        >

            {/* ── TOP PANEL (Folds Upward) ─────────────────────────────────────── */}
            <div
                ref={topPanelRef}
                className="w-full h-[50vh] bg-[#0A0A0A] origin-top will-change-transform border-b border-white/[0.01]"
            />

            {/* ── BOTTOM PANEL (Folds Downward) ─────────────────────────────────── */}
            <div
                ref={bottomPanelRef}
                className="w-full h-[50vh] bg-[#0A0A0A] origin-bottom will-change-transform"
            />

            {/* ── CENTAL BRANDING & PROGRESS HUD ───────────────────────────────── */}
            <div
                ref={contentRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6"
            >
                <div className="flex flex-col items-center gap-6 max-w-xs w-full">
                    {/* Logo Asset */}
                    <Image
                        src="/logo/logo_white_horizontal.jpg"
                        alt="Tonmoy's Logo"
                        width={520}
                        height={140}
                        priority
                        style={{
                            height: 'clamp(45px, 7vw, 80px)',
                            width: 'auto',
                            objectFit: 'contain',
                            opacity: 0.95,
                        }}
                    />

                    {/* Progress HUD Box */}
                    <div className="w-full flex flex-col gap-2 mt-4">
                        {/* Horizontal thin split scanner bar */}
                        <div className="h-[1px] w-full bg-white/[0.04] relative overflow-hidden">
                            <div
                                ref={lineRef}
                                className="h-full w-full bg-white/30 origin-left will-change-transform"
                                style={{ transform: 'scaleX(0)' }}
                            />
                        </div>

                        {/* Interactive Stats Panel */}
                        <div className="flex justify-between items-center text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase">
                            <span>PORTFOLIO // 2026</span>
                            <span className="tabular-nums text-white/70 font-semibold">{String(count).padStart(3, '0')}%</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}