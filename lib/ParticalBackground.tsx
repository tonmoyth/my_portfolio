'use client';

import { useEffect, useRef } from 'react';

export function ParticleBackground({ children, className = "" }: { children: React.ReactNode, string?: string, className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const wrapper = canvas.parentElement;
        if (!wrapper) return;

        let raf = 0;
        let w = 0;
        let h = 0;

        const resize = () => {
            w = wrapper.clientWidth;
            h = wrapper.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const observer = new ResizeObserver(resize);
        observer.observe(wrapper);
        window.addEventListener('resize', resize);

        interface Ball {
            x: number;
            y: number;
            vx: number;
            vy: number;
            r: number;
            a: number;
            aMin: number;
            aMax: number;
            aDir: number;
            aSpd: number;
        }

        const COUNT = 70;
        const make = (): Ball => {
            const isBig = Math.random() < 0.06;
            const aMax = isBig ? 0.85 + Math.random() * 0.15 : 0.15 + Math.random() * 0.35;
            const aMin = isBig ? aMax * 0.7 : aMax * 0.1;
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.1,
                r: isBig ? 3 + Math.random() * 1.5 : 0.6 + Math.random() * 1.3,
                a: aMin + Math.random() * (aMax - aMin),
                aMin,
                aMax,
                aDir: Math.random() < 0.5 ? 1 : -1,
                aSpd: 0.0003 + Math.random() * 0.0006,
            };
        };

        const balls: Ball[] = Array.from({ length: COUNT }, make);

        const tick = () => {
            raf = window.requestAnimationFrame(tick);
            if (document.hidden) return;

            ctx.clearRect(0, 0, w, h);

            for (const b of balls) {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x < -4) b.x = w + 4;
                else if (b.x > w + 4) b.x = -4;
                if (b.y < -4) b.y = h + 4;
                else if (b.y > h + 4) b.y = -4;

                b.a += b.aSpd * b.aDir;
                if (b.a >= b.aMax) {
                    b.a = b.aMax;
                    b.aDir = -1;
                } else if (b.a <= b.aMin) {
                    b.a = b.aMin;
                    b.aDir = 1;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${b.a.toFixed(3)})`;
                ctx.fill();
            }
        };

        raf = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            style={{
                position: 'relative',
                isolation: 'isolate',
                overflow: 'hidden',
            }}
        >
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    background: '#000000',
                    pointerEvents: 'none',
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </div>
    );
}