'use client';

import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../shared/SectionTitle';


gsap.registerPlugin(ScrollTrigger);

const headingText = 'Building Digital Experiences Through Code & Creativity';

const stats = [
    { value: 2, suffix: ' Years', label: 'Experience' },
    { value: 10, suffix: '+', label: 'Projects' },
    { value: 5, suffix: '+', label: 'Global Clients' },
];
const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Skill orbit visualization (ported from the Skills section)        */
/* ------------------------------------------------------------------ */

type IconType =
    | 'react'
    | 'node'
    | 'express'
    | 'postgresql'
    | 'typescript'
    | 'nextjs'
    | 'mongodb';

const iconComponents: Record<IconType, { component: () => React.ReactElement; color: string }> = {
    react: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <g stroke="#61DAFB" strokeWidth="1" fill="none">
                    <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
                </g>
            </svg>
        ),
        color: '#61DAFB',
    },
    node: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path
                    d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z"
                    fill="#339933"
                />
            </svg>
        ),
        color: '#339933',
    },
    postgresql: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <rect x="2" y="4" width="20" height="16" rx="4" fill="#336791" />
                <path
                    d="M7 8c3-1 10-1 10 4s-7 5-10 4V8zm0 5c3-1 7-1 7 2s-4 2-7 1v-3z"
                    fill="#fff"
                    opacity="0.92"
                />
            </svg>
        ),
        color: '#336791',
    },
    express: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path
                    d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-1.083A6.575 6.575 0 0 1 .12 13.404c0-.279-.045-.547-.045-.83.001-.314.069-.628.069-.998zM1.224 10.4h9.428c-.114-2.84-1.787-4.927-3.967-5.063C4.107 5.16 1.5 7.045 1.224 10.4z"
                    fill="#000000"
                />
            </svg>
        ),
        color: '#9CA3AF',
    },
    typescript: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <rect width="24" height="24" rx="3" fill="#3178C6" />
                <path
                    d="M13.5 16.8v1.95a5.7 5.7 0 0 0 1.45.5 7.4 7.4 0 0 0 1.7.18 6.4 6.4 0 0 0 1.65-.2 4 4 0 0 0 1.3-.6 2.9 2.9 0 0 0 .85-1 3.1 3.1 0 0 0 .3-1.42 2.8 2.8 0 0 0-.2-1.1 2.6 2.6 0 0 0-.58-.86 4 4 0 0 0-.92-.68c-.36-.2-.78-.4-1.24-.58-.34-.13-.64-.26-.9-.38a3.4 3.4 0 0 1-.66-.38 1.5 1.5 0 0 1-.4-.4.9.9 0 0 1-.14-.5c0-.18.05-.34.13-.48a1 1 0 0 1 .37-.36c.16-.1.36-.18.6-.23.24-.06.5-.08.8-.08.22 0 .45.02.7.05.24.04.49.09.74.17.25.07.5.16.73.27.24.1.46.23.66.37v-1.82a5.6 5.6 0 0 0-1.27-.4 7 7 0 0 0-1.46-.14c-.58 0-1.13.07-1.62.21a4 4 0 0 0-1.3.6 2.8 2.8 0 0 0-.85 1 2.9 2.9 0 0 0-.3 1.35c0 .7.2 1.3.6 1.78.4.5 1 .9 1.8 1.25.36.15.7.3 1 .43.3.14.55.28.76.42.2.14.36.3.47.46.1.17.16.36.16.58 0 .17-.04.32-.12.46a1 1 0 0 1-.35.36 1.8 1.8 0 0 1-.58.24 3.3 3.3 0 0 1-.82.1c-.53 0-1.05-.1-1.56-.28a4.4 4.4 0 0 1-1.36-.78zM10.4 9.42H7.3v8.96H5.1V9.42H2V7.6h8.4v1.82z"
                    fill="#fff"
                />
            </svg>
        ),
        color: '#3178C6',
    },
    nextjs: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <circle cx="12" cy="12" r="12" fill="#000000" />
                <path
                    d="M9.86 8.5h-1.4v7h1.16v-5.36l4.55 5.86c.1-.03.2-.07.3-.12L9.86 8.5z"
                    fill="#fff"
                />
                <path d="M14.5 8.5h-1.16v7h1.16v-7z" fill="#fff" />
            </svg>
        ),
        color: '#FFFFFF',
    },
    mongodb: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path
                    d="M12 1.5c-.4 1.5-1 2.7-1.85 3.9-.92 1.3-2.1 2.6-2.95 4.3-.85 1.7-1.4 3.7-1.2 6 .2 2.5 1.4 4.7 3.1 6.2.5-1.9.5-3.6.4-5.2-.1-1.6-.4-3.1-.3-4.8.1-1.5.5-2.9 1.1-4.2.3 1.3.7 2.6.85 4 .15 1.4.1 2.9-.1 4.3-.2 1.5-.55 2.9-.55 4.5 0 .5.05 1 .15 1.5.55.15 1.1.25 1.35.27.25-.02.8-.12 1.35-.27.1-.5.15-1 .15-1.5 0-1.6-.35-3-.55-4.5-.2-1.4-.25-2.9-.1-4.3.15-1.4.55-2.7.85-4 .6 1.3 1 2.7 1.1 4.2.1 1.7-.2 3.2-.3 4.8-.1 1.6-.1 3.3.4 5.2 1.7-1.5 2.9-3.7 3.1-6.2.2-2.3-.35-4.3-1.2-6-.85-1.7-2.03-3-2.95-4.3C13 4.2 12.4 3 12 1.5z"
                    fill="#47A248"
                />
            </svg>
        ),
        color: '#47A248',
    },
};

const SkillIcon = memo(({ type }: { type: IconType }) => {
    const IconComponent = iconComponents[type]?.component;
    return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

interface SkillConfig {
    id: string;
    orbitRadius: number;
    size: number;
    speed: number;
    iconType: IconType;
    phaseShift: number;
    glowColor: 'cyan' | 'purple';
    label: string;
}

const skillsConfig: SkillConfig[] = [
    {
        id: 'react',
        orbitRadius: 110,
        size: 46,
        speed: 0.95,
        iconType: 'react',
        phaseShift: 0,
        glowColor: 'cyan',
        label: 'React.js',
    },
    {
        id: 'nextjs',
        orbitRadius: 110,
        size: 44,
        speed: 0.95,
        iconType: 'nextjs',
        phaseShift: (2 * Math.PI) / 3,
        glowColor: 'cyan',
        label: 'Next.js',
    },
    {
        id: 'typescript',
        orbitRadius: 110,
        size: 44,
        speed: 0.95,
        iconType: 'typescript',
        phaseShift: (4 * Math.PI) / 3,
        glowColor: 'cyan',
        label: 'TypeScript',
    },
    {
        id: 'node',
        orbitRadius: 180,
        size: 48,
        speed: -0.55,
        iconType: 'node',
        phaseShift: 0,
        glowColor: 'purple',
        label: 'Node.js',
    },
    {
        id: 'express',
        orbitRadius: 180,
        size: 42,
        speed: -0.55,
        iconType: 'express',
        phaseShift: (2 * Math.PI) / 3,
        glowColor: 'purple',
        label: 'Express.js',
    },
    {
        id: 'mongodb',
        orbitRadius: 180,
        size: 44,
        speed: -0.55,
        iconType: 'mongodb',
        phaseShift: (4 * Math.PI) / 3,
        glowColor: 'purple',
        label: 'MongoDB',
    },
    {
        id: 'postgresql',
        orbitRadius: 140,
        size: 44,
        speed: 0.65,
        iconType: 'postgresql',
        phaseShift: Math.PI / 2,
        glowColor: 'purple',
        label: 'PostgreSQL',
    },
];

const OrbitingSkill = memo(({ config, angle }: { config: SkillConfig; angle: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { orbitRadius, size, iconType, label } = config;

    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    return (
        <div
            className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                zIndex: isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative w-full h-full rounded-full bg-slate-900/90 p-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? 'scale-110 shadow-2xl' : 'shadow-lg'
                    }`}
                style={{
                    boxShadow: isHovered
                        ? `0 0 24px ${iconComponents[iconType]?.color}40, 0 0 48px ${iconComponents[iconType]?.color}20`
                        : undefined,
                }}
            >
                <SkillIcon type={iconType} />
                {isHovered && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/95 px-3 py-1 text-xs text-white shadow-xl whitespace-nowrap">
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(
    ({
        radius,
        glowColor = 'cyan',
        animationDelay = 0,
    }: {
        radius: number;
        glowColor?: 'cyan' | 'purple';
        animationDelay?: number;
    }) => {
        const glowColors = {
            cyan: {
                primary: 'rgba(34, 211, 238, 0.35)',
                secondary: 'rgba(34, 211, 238, 0.16)',
                border: 'rgba(34, 211, 238, 0.3)',
            },
            purple: {
                primary: 'rgba(192, 132, 252, 0.35)',
                secondary: 'rgba(192, 132, 252, 0.16)',
                border: 'rgba(192, 132, 252, 0.3)',
            },
        };

        const colors = glowColors[glowColor] || glowColors.cyan;

        return (
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    animationDelay: `${animationDelay}s`,
                }}
            >
                <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                        background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
                        boxShadow: `0 0 50px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
                        animation: 'pulse 4s ease-in-out infinite',
                        animationDelay: `${animationDelay}s`,
                    }}
                />
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: `1px solid ${colors.border}`,
                        boxShadow: `inset 0 0 20px ${colors.secondary}`,
                    }}
                />
            </div>
        );
    },
);
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

function SkillOrbitVisual() {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        setMounted(true);

        let animationFrameId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;
            setTime((prev) => prev + deltaTime);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative flex min-h-[480px] sm:min-h-[480px] lg:min-h-[600px] items-center justify-center overflow-hidden rounded-[2.25rem] p-6">
            <div className="absolute inset-0 rounded-[2.25rem] via-transparent to-violet-400/10 opacity-95" />
            <div className="relative mx-auto h-[380px] w-[380px] sm:h-[440px] sm:w-[440px] lg:h-[460px] lg:w-[460px]">
                <GlowingOrbitPath radius={192} glowColor="cyan" animationDelay={0} />
                <GlowingOrbitPath radius={140} glowColor="purple" animationDelay={1.5} />
                <div className="absolute top-1/2 left-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900/90 text-center shadow-cyan-500/10">
                    <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Core</span>
                    <span className="mt-2 text-2xl font-black text-white">Skills</span>
                </div>

                {!mounted ? (
                    <>
                        <div className="absolute left-1/2 top-[18%] h-12 w-12 -translate-x-1/2 rounded-full border border-cyan-400/30 bg-cyan-400/10" />
                        <div className="absolute right-[18%] top-[24%] h-10 w-10 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10" />
                        <div className="absolute bottom-[18%] left-[20%] h-10 w-10 rounded-full border border-emerald-400/30 bg-emerald-400/10" />
                        <div className="absolute bottom-[20%] right-[16%] h-10 w-10 rounded-full border border-amber-400/30 bg-amber-400/10" />
                    </>
                ) : (
                    skillsConfig.map((config) => {
                        const angle = (time * config.speed + config.phaseShift) % (Math.PI * 2);
                        return <OrbitingSkill key={config.id} config={config} angle={angle} />;
                    })
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  About section                                                     */
/* ------------------------------------------------------------------ */

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const statsRefs = useRef<Array<HTMLDivElement | null>>([]);
    const lineRef = useRef<HTMLDivElement>(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: '-10%' });

    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');
            const chars = headingRef.current?.querySelectorAll<HTMLElement>('.char');

            gsap.fromTo(
                revealEls || [],
                { opacity: 0, y: 42, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 82%',
                    },
                },
            );

            if (chars) {
                gsap.fromTo(
                    chars,
                    { opacity: 0, y: 24, filter: 'blur(8px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        stagger: 0.018,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 82%',
                        },
                    },
                );
            }

            statsRefs.current.forEach((card, index) => {
                if (!card) return;
                const numberEl = card.querySelector<HTMLElement>('[data-counter]');
                if (!numberEl) return;
                const suffix = numberEl.dataset.suffix ?? '';
                const targetValue = Number(numberEl.dataset.value ?? 0);
                const counter = { value: 0 };

                gsap.to(counter, {
                    value: targetValue,
                    duration: 1.25,
                    delay: index * 0.12,
                    ease: 'power3.out',
                    onUpdate: () => {
                        numberEl.textContent = `${Math.round(counter.value)}${suffix}`;
                    },
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative overflow-hidden bg-[#0A0A0A]  px-6 py-24 sm:px-10 lg:px-16"
        >
            {/* Section label */}
            <SectionTitle title="About" />
            <div className="relative mx-auto ">
                <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
                    <motion.div
                        ref={visualRef}
                        data-reveal
                        initial={{ opacity: 0, y: 44 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* skill animation section */}
                        <SkillOrbitVisual />
                    </motion.div>

                    <motion.div
                        data-reveal
                        initial={{ opacity: 0, y: 44 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        className="relative"
                    >
                        {/* <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/85 backdrop-blur">
                            <Sparkles size={12} />
                            About Me
                        </div> */}

                        <h2
                            ref={headingRef}
                            className="mt-6 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
                        >
                            {Array.from(headingText).map((char, index) => (
                                <span key={`${char}-${index}`} className="char inline-block">
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </h2>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                            My journey started on January 1st, 2024. It wasn&apos;t easy — investing high effort and facing constant challenges. Through persistence, I developed a deep love for the craft and a mindset of continuous growth.
                        </p>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                            I love crafting beautiful user interfaces and solving real-world problems with code. I live for the &quot;aha!&quot; moment when a complex feature finally works.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {stats.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    ref={(node) => {
                                        statsRefs.current[index] = node;
                                    }}
                                    whileHover={{ scale: 1.03, y: -4, boxShadow: '0 0 40px rgba(34,211,238,0.16)' }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-500/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                                    <div className="relative">
                                        <div
                                            className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
                                            data-counter
                                            data-value={item.value}
                                            data-suffix={item.suffix}
                                        >
                                            0{item.suffix}
                                        </div>
                                        <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/55">{item.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}