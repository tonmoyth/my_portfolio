'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import {
    Bug,
    ShoppingCart,
    Smartphone,
    RefreshCw,
    PenTool,
    Rocket,
    ArrowUpRight,
} from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 'bugfix',
        icon: Bug,
        title: 'Website Bug Fixing',
        description:
            "Stuck on a broken layout, a flaky API call, or a feature that won't behave? I dig in, find the root cause, and ship a clean fix — not a patch.",
        tag: 'Maintenance',
    },
    {
        id: 'ecommerce',
        icon: ShoppingCart,
        title: 'E-commerce Websites',
        description:
            'Full storefronts built to sell — product catalogs, cart and checkout flows, payment integration, and inventory you can actually manage yourself.',
        tag: 'Build',
    },
    {
        id: 'ecommerce1',
        icon: ShoppingCart,
        title: 'E-commerce Websites',
        description:
            'Full storefronts built to sell — product catalogs, cart and checkout flows, payment integration, and inventory you can actually manage yourself.',
        tag: 'Build',
    },
    {
        id: 'mobileapp',
        icon: Smartphone,
        title: 'Mobile App Development',
        description:
            'Cross-platform apps with React Native or native-feeling PWAs — from onboarding to push notifications, built to feel fast on real devices.',
        tag: 'Build',
    },
    {
        id: 'mobileapp1',
        icon: Smartphone,
        title: 'Mobile App Development',
        description:
            'Cross-platform apps with React Native or native-feeling PWAs — from onboarding to push notifications, built to feel fast on real devices.',
        tag: 'Build',
    },
    {
        id: 'update',
        icon: RefreshCw,
        title: 'Website Updates & Revamps',
        description:
            'Already have a site but it feels dated or slow? I modernize the stack, refresh the UI, and tune performance without starting from zero.',
        tag: 'Maintenance',
    },
    {
        id: 'update1',
        icon: RefreshCw,
        title: 'Website Updates & Revamps',
        description:
            'Already have a site but it feels dated or slow? I modernize the stack, refresh the UI, and tune performance without starting from zero.',
        tag: 'Maintenance',
    },
    {
        id: 'uiux',
        icon: PenTool,
        title: 'UI / UX Design',
        description:
            'Wireframes to high-fidelity prototypes. I design interfaces people actually enjoy using — grounded in real user flows, not just pretty mockups.',
        tag: 'Design',
    },
    {
        id: 'seo',
        icon: Rocket,
        title: 'Landing Pages & SEO',
        description:
            'High-converting landing pages with on-page SEO baked in from the start — fast loads, clean markup, and copy structured to rank and convert.',
        tag: 'Growth',
    },
    {
        id: 'seo1',
        icon: Rocket,
        title: 'Landing Pages & SEO',
        description:
            'High-converting landing pages with on-page SEO baked in from the start — fast loads, clean markup, and copy structured to rank and convert.',
        tag: 'Growth',
    },
] as const;

// ─── Card ─────────────────────────────────────────────────────────────────────
function ServiceCard({
    service,
    tilt,
    floatDelay,
}: {
    service: (typeof SERVICES)[number];
    tilt: number;
    floatDelay: number;
}) {
    const Icon = service.icon;

    return (
        <div
            data-service-card
            className="group relative flex-shrink-0 select-none"
            style={{ width: 'min(78vw, 360px)' }}
        >
            <div
                className="relative h-full rounded-[28px] border border-white/[0.08] p-7 backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.45)]"
                style={
                    {
                        background: 'rgba(255,255,255,0.5)',
                        '--tilt': `${tilt}deg`,
                        animation: `service-float 4.6s ease-in-out ${floatDelay}s infinite`,
                    } as CSSProperties
                }
            >
                {/* Tag */}
                <span
                    className="relative z-10 inline-flex items-center rounded-full bg-black/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-black/60"
                    style={{ fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif' }}
                >
                    {service.tag}
                </span>

                {/* Icon */}
                <div className="relative z-10 mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(19,20,21)]">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3
                    className="relative z-10 mt-5 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-[rgb(19,20,21)]"
                    style={{ fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif' }}
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p
                    className="relative z-10 mt-3 text-[15px] leading-[1.55] text-black/65"
                    style={{
                        fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
                        letterSpacing: '-0.1px',
                    }}
                >
                    {service.description}
                </p>

                {/* Footer link */}
                <div className="relative z-10 mt-6 flex items-center gap-1.5 text-[13px] font-medium text-black/70 transition-colors duration-200 group-hover:text-[rgb(19,20,21)]">
                    <span style={{ fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif' }}>
                        Let&apos;s talk
                    </span>
                    <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </div>
            </div>
        </div>
    );
}

// Deterministic gentle tilt per card index — alternating, not random, so it
// stays consistent between server and client renders.
const TILT_PATTERN = [-1.5, 1.5, -1, 1.25, -1.75, 1];

// ─── Main component ────────────────────────────────────────────────────────────
export function Services() {
    const wrapperRef = useRef<HTMLDivElement>(null); // tall scroll-distance wrapper
    const viewportRef = useRef<HTMLDivElement>(null); // sticky inner viewport (mask area)
    const trackRef = useRef<HTMLDivElement>(null); // horizontal flex track being moved

    const draggableRef = useRef<Draggable[] | null>(null);
    const isDraggingRef = useRef(false);
    const maxScrollRef = useRef(0);

    const [canDragLeft, setCanDragLeft] = useState(false);
    const [canDragRight, setCanDragRight] = useState(true);

    useEffect(() => {
        if (!trackRef.current || !viewportRef.current || !wrapperRef.current) return;

        const track = trackRef.current;
        const viewport = viewportRef.current;
        const wrapper = wrapperRef.current;

        const updateEdgeState = (x: number) => {
            const maxScroll = maxScrollRef.current;
            setCanDragLeft(x < -4);
            setCanDragRight(x > -(maxScroll - 4));
        };

        const recomputeMaxScroll = () => {
            maxScrollRef.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
        };

        recomputeMaxScroll();

        // Draggable — lets the user manually drag the track at any time.
        // While dragging (or while its inertial throw is still settling),
        // the ScrollTrigger below skips writing to `x` so the two controls
        // don't fight over the same value.
        draggableRef.current = Draggable.create(track, {
            type: 'x',
            inertia: true,
            edgeResistance: 0.85,
            dragClickables: true,
            cursor: 'grab',
            activeCursor: 'grabbing',
            bounds: { minX: -maxScrollRef.current, maxX: 0 },
            onPress: () => {
                isDraggingRef.current = true;
            },
            onDrag() {
                updateEdgeState(this.x);
            },
            onThrowUpdate() {
                updateEdgeState(this.x);
            },
            onThrowComplete: () => {
                isDraggingRef.current = false;
            },
            onDragEnd() {
                // onThrowComplete also fires after inertia settles; this
                // covers the case where inertia is negligible and no
                // throw tween is created at all.
                if (!this.tween) isDraggingRef.current = false;
            },
        });

        // ScrollTrigger — pins the section and drives the track horizontally
        // as the user scrolls the page vertically.
        const trigger = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate(self) {
                if (isDraggingRef.current) return;
                recomputeMaxScroll();
                const maxScroll = maxScrollRef.current;
                const x = -self.progress * maxScroll;
                gsap.set(track, { x });
                draggableRef.current?.[0]?.update();
                updateEdgeState(x);
            },
        });

        const onResize = () => {
            recomputeMaxScroll();
            draggableRef.current?.[0]?.applyBounds({ minX: -maxScrollRef.current, maxX: 0 });
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            trigger.kill();
            draggableRef.current?.forEach((d) => d.kill());
        };
    }, []);

    const nudge = (direction: 1 | -1) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector<HTMLElement>('[data-service-card]');
        const cardWidth = card ? card.getBoundingClientRect().width + 28 : 360;
        const currentX = (gsap.getProperty(track, 'x') as number) || 0;
        const nextX = gsap.utils.clamp(-maxScrollRef.current, 0, currentX - direction * cardWidth);

        gsap.to(track, {
            x: nextX,
            duration: 0.6,
            ease: 'power3.out',
            onUpdate: () => {
                setCanDragLeft(nextX < -4);
                setCanDragRight(nextX > -(maxScrollRef.current - 4));
            },
        });
    };

    return (
        <section id='services' className="relative w-full" >
            <style>{`
                @keyframes service-float {
                    0%, 100% { transform: rotate(var(--tilt)) translateY(0px); }
                    50% { transform: rotate(var(--tilt)) translateY(-14px); }
                }
            `}</style>
            <div ref={wrapperRef} className="relative" style={{ height: '260vh' }}>
                <div
                    ref={viewportRef}
                    className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden py-16"
                >
                    <div className="mx-auto w-full  px-6 sm:px-10">
                        <div>
                            <SectionTitle title='Service' />
                        </div>
                        {/* ── Header ──────────────────────────────────────────────────── */}
                        <div className="flex flex-col items-center text-center">


                            <motion.h2
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: 0.05 }}
                                className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white/95"
                                style={{ fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif' }}
                            >
                                what I can build for you
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: 0.1 }}
                                className="mt-4 max-w-[36rem] text-[18px] leading-[1.4] text-white/50"
                                style={{
                                    fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
                                    letterSpacing: '-0.1px',
                                }}
                            >
                                From quick fixes to full product builds — here&apos;s where I can help.
                            </motion.p>
                        </div>

                        {/* ── Horizontal track ─────────────────────────────────────────── */}
                        <div
                            className="relative mt-14 w-full overflow-hidden"
                            style={{
                                maskImage:
                                    'linear-gradient(to right, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%)',
                                WebkitMaskImage:
                                    'linear-gradient(to right, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%)',
                            }}
                        >
                            <div
                                ref={trackRef}
                                className="flex items-stretch gap-7 will-change-transform"
                                style={{ width: 'max-content', padding: '28px 24px' }}
                            >
                                {SERVICES.map((service, i) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        tilt={TILT_PATTERN[i % TILT_PATTERN.length]}
                                        floatDelay={i * 0.3}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── Controls ─────────────────────────────────────────────────── */}
                        <div className="mt-10 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                aria-label="Scroll services left"
                                disabled={!canDragLeft}
                                onClick={() => nudge(-1)}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-all duration-200 enabled:hover:border-white/30 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                aria-label="Scroll services right"
                                disabled={!canDragRight}
                                onClick={() => nudge(1)}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-white/60 transition-all duration-200 enabled:hover:border-white/30 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}