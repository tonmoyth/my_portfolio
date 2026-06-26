'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Compass, Boxes, Hammer, Radio, ArrowUpRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
// side: which side of the trace the content card sits on at this node.
const STEPS = [
    {
        index: '01',
        title: 'Discovery',
        duration: 'Days 1–3',
        icon: Compass,
        body: 'We start with the problem, not the tech. I map your goals, users, and constraints, then turn them into a scoped plan with clear deliverables — so you know exactly what you’re getting and when.',
        tags: ['Goals', 'Scope', 'Timeline'],
        side: 'right',
    },
    {
        index: '02',
        title: 'Architecture',
        duration: 'Week 1',
        icon: Boxes,
        body: 'I design the system before writing a line of production code — data models, API contracts, infrastructure, and security boundaries. The result is software that scales cleanly instead of collapsing under its own weight.',
        tags: ['System Design', 'Data Models', 'Security'],
        side: 'left',
    },
    {
        index: '03',
        title: 'Build & Ship',
        duration: 'Core sprint',
        icon: Hammer,
        body: 'Tight, visible iterations. You see working software early and often, with weekly check-ins and a live staging URL. Momentum over perfection — high-impact features first, polished relentlessly.',
        tags: ['Iterative', 'Weekly Demos', 'Staging'],
        side: 'right',
    },
    {
        index: '04',
        title: 'Launch & Support',
        duration: 'Go-live +',
        icon: Radio,
        body: 'Zero-downtime deployment, performance tuning, and a hand-off you can actually maintain. I stay on after launch to monitor, fix, and extend — your platform keeps getting better, not stale.',
        tags: ['Deploy', 'Monitoring', 'Handover'],
        side: 'left',
    },
] as const;

// ─── Circuit-trace geometry ─────────────────────────────────────────────────────
// A vertical PCB-style trace: straight runs with right-angle bends, not a
// smooth organic curve. NODE_Y are the y-coordinates (in viewBox units) where
// each step's connector pad sits; the trace bends toward whichever side that
// step's card occupies, then back to center before the next bend.
const VB_W = 240;
const VB_H = 1860;
// Each Step renders as an equal-height flex item, so its connector pad sits
// at the vertical center of its own quarter of the stack. Deriving NODE_Y
// the same way keeps the trace's bends lined up with the pads exactly.
const STEP_SLOT = VB_H / STEPS.length;
const NODE_Y = STEPS.map((_, i) => STEP_SLOT * i + STEP_SLOT / 2);
const SIDE_X = { left: 56, right: VB_W - 56, center: VB_W / 2 };

function buildTracePath() {
    const segs: string[] = [`M ${SIDE_X.center} 0`];
    STEPS.forEach((step, i) => {
        const y = NODE_Y[i];
        const x = SIDE_X[step.side as 'left' | 'right'];
        const approachY = y - 70;
        // vertical run down the center, right-angle bend out to the node's side,
        // short horizontal run into the connector pad, then back to center.
        segs.push(`L ${SIDE_X.center} ${approachY}`);
        segs.push(`L ${x} ${approachY}`);
        segs.push(`L ${x} ${y}`);
        segs.push(`L ${x} ${y + 40}`);
        segs.push(`L ${SIDE_X.center} ${y + 110}`);
    });
    segs.push(`L ${SIDE_X.center} ${VB_H}`);
    return segs.join(' ');
}

const TRACE_PATH = buildTracePath();

// ─── Step card ──────────────────────────────────────────────────────────────────
function Step({ step, i }: { step: (typeof STEPS)[number]; i: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-15%' });
    const isRight = step.side === 'right';
    const Icon = step.icon;

    return (
        <div
            ref={ref}
            className="relative flex flex-col md:grid"
            style={{ minHeight: 'clamp(20rem, 38vw, 30rem)' }}
        >
            {/* Connector pad — sits on the trace, anchored to the icon's side.
          On mobile the trace runs straight down the center, so the pad sits
          centered too; from md: up it shifts out to match SIDE_X exactly
          (23.33% from the left edge, or 23.33% from the right edge). */}
            <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className={`relative md:absolute md:top-1/2 md:-translate-y-1/2 z-20 flex justify-center mb-6 md:mb-0 ${isRight
                    ? 'md:left-auto md:right-[calc(23.33%-2.5rem)]'
                    : 'md:left-[calc(23.33%-2.5rem)]'
                    }`}
            >
                <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0A0A0A] border border-white/30">
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={inView ? { boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 22px rgba(255,255,255,0.35)', '0 0 0px rgba(255,255,255,0)'] } : {}}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    />
                    <Icon size={26} strokeWidth={1.5} className="text-white/80 relative z-10" />
                    {/* corner pads — circuit-board connector detail */}
                    <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white/40" />
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white/40" />
                    <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40" />
                    <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white/40" />
                </div>
            </motion.div>

            {/* Content card — opposite side from the connector pad on desktop;
          full-width below the icon on mobile. */}
            <motion.div
                initial={{ opacity: 0, x: isRight ? -28 : 28, y: 18 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className={`relative z-10 w-full md:w-[44%] ${isRight ? 'md:mr-auto md:pl-[clamp(1rem,4vw,3rem)]' : 'md:ml-auto md:pr-[clamp(1rem,4vw,3rem)]'} flex items-center text-center md:text-left`}
            >
                <div className="w-full">
                    <div className={`flex items-baseline gap-3 mb-3 justify-center ${isRight ? 'md:justify-start' : 'md:justify-end'}`}>
                        <span
                            className="font-black text-white/15 leading-none tabular-nums"
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.6rem)' }}
                        >
                            {step.index}
                        </span>
                        <span
                            className="text-[0.6rem] tracking-[0.2em] uppercase text-white/60 font-medium"
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                        >
                            {step.duration}
                        </span>
                    </div>

                    <h3
                        className="font-black text-white tracking-[-0.03em] leading-[0.95] mb-4"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem,3.6vw,2.6rem)' }}
                    >
                        {step.title}
                    </h3>

                    <p
                        className="text-white/50 leading-relaxed mb-6"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}
                    >
                        {step.body}
                    </p>

                    <div className={`flex flex-wrap gap-2 justify-center ${isRight ? 'md:justify-start' : 'md:justify-end'}`}>
                        {step.tags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-white/12 text-white/35 text-[0.55rem] tracking-[0.14em] uppercase px-2.5 py-1"
                                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const traceWrapRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

    const { scrollYProgress } = useScroll({
        target: traceWrapRef,
        offset: ['start 80%', 'end 60%'],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const pulseOffset = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const pulseOpacity = useTransform(scrollYProgress, [0, 0.04, 0.92, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            id="process"
            data-theme="dark"
            className="w-full border-t border-white/6 relative overflow-hidden"
        >
            <div className=" mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">

                {/* Section label */}
                {/* <div className="flex items-center gap-4 mb-[clamp(2.5rem,5vw,5rem)]">
                    <motion.span
                        className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                        initial={{ opacity: 0, x: -16 }}
                        animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, ease: EASE }}
                    >
                        04 / Process
                    </motion.span>
                    <motion.div
                        className="flex-1 h-px bg-white/10"
                        initial={{ scaleX: 0, transformOrigin: 'left' }}
                        animate={sectionInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
                    />
                </div> */}
                <div>
                    <SectionTitle title="Work Process" />
                </div>

                {/* Headline + intro */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end mb-[clamp(3.5rem,7vw,7rem)] pt-[clamp(1rem,3vw,2rem)]">
                    <h2
                        className="font-black text-white tracking-[-0.04em] leading-[0.9]"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem,6.5vw,7.5rem)' }}
                    >
                        {(['How', 'I'] as const).map((word, i) => (
                            <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                                <motion.span
                                    className="block"
                                    initial={{ y: '110%' }}
                                    animate={sectionInView ? { y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: EASE }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                        <span className="inline-block overflow-hidden">
                            <motion.span
                                className="block"
                                style={{
                                    fontFamily: 'var(--font-instrument), Georgia, serif',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    color: 'rgba(255,255,255,0.3)',
                                }}
                                initial={{ y: '110%' }}
                                animate={sectionInView ? { y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                            >
                                Work
                            </motion.span>
                        </span>
                    </h2>

                    <motion.p
                        className="text-white/45 leading-relaxed"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: 'clamp(1rem,1.4vw,1.2rem)' }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                    >
                        Hiring an architect shouldn’t feel like a gamble. Here’s the exact, predictable path
                        from first conversation to a launched, maintainable product — no disappearing acts.
                    </motion.p>
                </div>

                {/* ── Circuit-trace journey ──────────────────────────────────────────── */}
                <div ref={traceWrapRef} className="relative">
                    {/* SVG trace — draws on scroll, right-angle bends like a PCB route */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox={`0 0 ${VB_W} ${VB_H}`}
                        preserveAspectRatio="none"
                        fill="none"
                        aria-hidden
                    >
                        {/* faint static guide line underneath, so the unfilled trace is still legible */}
                        <path d={TRACE_PATH} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                        <motion.path
                            d={TRACE_PATH}
                            stroke="#ffffff"
                            strokeOpacity={0.55}
                            strokeWidth="1.5"
                            style={{ pathLength }}
                        />
                        {/* traveling signal pulse */}
                        <motion.circle
                            r="4.5"
                            fill="#ffffff"
                            opacity={pulseOpacity}
                            style={{
                                offsetDistance: pulseOffset,
                                offsetPath: `path("${TRACE_PATH}")`,
                            }}
                        />
                        <motion.circle
                            r="9"
                            fill="#ffffff"
                            opacity={useTransform(pulseOpacity, (v) => v * 0.18)}
                            style={{
                                offsetDistance: pulseOffset,
                                offsetPath: `path("${TRACE_PATH}")`,
                            }}
                        />
                    </svg>

                    {/* Steps laid out along the trace */}
                    <div className="relative flex flex-col">
                        {STEPS.map((step, i) => (
                            <Step key={step.index} step={step} i={i} />
                        ))}
                    </div>
                </div>

                {/* Availability reminder */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                    className="mt-[clamp(3rem,6vw,5rem)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/10 bg-white/[0.02] p-[clamp(1.5rem,3vw,2.5rem)]"
                >
                    <div className="flex items-center gap-3">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        </span>
                        <p
                            className="text-white/70"
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontSize: 'clamp(0.9rem,1.4vw,1.15rem)' }}
                        >
                            Currently accepting new projects —{' '}
                            <span style={{ fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
                                limited slots this quarter.
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                        data-cursor="hire"
                        className="group inline-flex items-center gap-3 border border-white/20 px-7 py-3.5 text-white/65 hover:text-white hover:border-white/50 hover:bg-white/[0.04] transition-colors duration-300 shrink-0"
                    >
                        <span className="text-[0.62rem] tracking-[0.22em] uppercase font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                            Start a Project
                        </span>
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}