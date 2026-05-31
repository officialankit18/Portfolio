"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronUp,
  ExternalLink,
  Mail,
  Menu,
  Send,
  Sparkles,
  X
} from "lucide-react";
import {
  achievements,
  badges,
  certificates,
  contact,
  navItems,
  projects,
  socialLinks,
  techGroups,
  timeline
} from "@/data/portfolio";
import { fadeUp, spring, stagger } from "@/lib/motion";

const filters = ["All", "Hero Project", "Research Project", "Hackathon", "Freelance"];

const quickLinks = [
  ...socialLinks,
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail }
];

const galleryPhotos = [
  { src: "/s1.jpeg", alt: "Ankit Yadav slider photo 1" },
  { src: "/s2.jpeg", alt: "Ankit Yadav slider photo 2" },
  { src: "/s3.jpg", alt: "Ankit Yadav slider photo 3" },
  { src: "/s4.jpg", alt: "Ankit Yadav slider photo 4" },
  { src: "/s5.jpeg", alt: "Ankit Yadav slider photo 5" }
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.65 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <motion.span
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-[linear-gradient(110deg,rgba(6,182,212,.13),rgba(251,113,133,.16),rgba(139,92,246,.12))] bg-[length:220%_220%] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-glow"
      >
        <Sparkles size={14} />
        {eyebrow}
      </motion.span>
      <h2 className="mt-5 overflow-hidden font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        {title.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: index * 0.035 }}
            className="mr-3 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.18 }}
        className="mt-4 text-base leading-8 text-slate-600"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

function SectionBeam({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute top-16 h-64 w-1/2 opacity-50 blur-3xl",
        side === "left" ? "left-0 bg-[linear-gradient(110deg,rgba(6,182,212,.22),transparent)]" : "right-0 bg-[linear-gradient(250deg,rgba(251,113,133,.22),transparent)]"
      )}
    />
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
  download
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.a
      href={href}
      download={download}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.98 }}
      className={cx(
        "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-skybrand focus:ring-offset-2 focus:ring-offset-ink",
        variant === "primary"
          ? "bg-gradient-to-r from-slate-950 via-emerald-800 to-amber-500 text-white shadow-[0_18px_55px_rgba(15,23,42,.22)] hover:saturate-125"
          : "border border-rose-200/80 bg-white/75 text-slate-950 hover:border-rose-300 hover:bg-white/90"
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-rose-100/80 bg-white/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#home" className="inline-flex items-center gap-3 font-heading text-lg font-semibold tracking-tight">
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white">
            <Image src="/favicon.jpeg" alt="Ankit Yadav profile" fill sizes="40px" className="object-cover" />
          </span>
          <span>Ankit Yadav<span className="text-skybrand">.</span></span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} whileHover={{ y: -2 }} className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-white/75 hover:text-slate-950">
              {item}
            </motion.a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="mailto:ay7054464@gmail.com" className="rounded-full border border-rose-200/80 p-2 text-slate-600 transition hover:border-rose-300 hover:text-slate-950" aria-label="Email Ankit">
            <Mail size={18} />
          </a>
          <MagneticButton href="#contact">
            Contact <ArrowUpRight size={16} />
          </MagneticButton>
        </div>
        <button className="rounded-full border border-rose-200/80 p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 p-5 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg font-semibold">Ankit Yadav</span>
              <button className="rounded-full border border-rose-200/80 p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="mt-10 grid gap-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-2xl border border-rose-200/70 bg-white/80 px-5 py-4 text-lg text-slate-950">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Ambient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 animated-aurora opacity-80" />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background: useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(520px at ${x}px ${y}px, rgba(251,113,133,.16), rgba(6,182,212,.08) 32%, transparent 72%)`)
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 animated-grid opacity-[0.20]" />
      <div className="pointer-events-none fixed inset-0 z-0 scan-lines opacity-[0.18]" />
    </>
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 35 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div className="pointer-events-none fixed z-[80] hidden h-7 w-7 rounded-full border border-rose-400/70 shadow-[0_0_24px_rgba(251,113,133,.38)] md:block" style={{ x: smoothX, y: smoothY }}>
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500" />
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pb-28 pt-14 sm:pt-16 lg:pb-52">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-premium-radial" />
      <motion.div
        className="absolute left-1/2 top-24 h-px w-[72rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-rose-400/70 to-transparent"
        animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.88fr)] lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-20 max-w-2xl">
          <motion.div variants={fadeUp} className="relative mb-5 flex max-w-2xl flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="relative h-52 w-52 sm:h-64 sm:w-64">
              <Image src="/ai-avtar.png" alt="Ankit Yadav AI assistant" fill priority sizes="256px" className="object-contain mix-blend-multiply drop-shadow-[0_24px_45px_rgba(6,182,212,.22)]" />
            </div>
            <AiAssistantIntro />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-heading text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Hello I&apos;m
            <span className="animated-gradient-text block">Ankit Yadav</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A Software Engineering undergraduate and Full Stack Developer and Computer Science student focused on building practical web applications, backend systems, and AI-driven solutions. I enjoy solving real-world problems through technology, continuous learning, and hands-on development.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-slate-950">
                <link.icon size={16} />
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative z-10 mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0 lg:mt-4">
          <motion.div animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-300/40 via-rose-300/35 to-violet-300/35 blur-3xl" />
          <motion.div whileHover={{ y: -10, rotateX: 3, rotateY: -3 }} transition={spring} className="premium-card relative overflow-hidden rounded-[2rem] border border-sky-200/80 bg-white/75 p-3 shadow-premium backdrop-blur-2xl">
            <div className="relative aspect-[4/4.7] overflow-hidden rounded-[1.35rem] bg-slatepanel">
              <Image src="/main.jpeg" alt="Professional photograph of Ankit Yadav" fill priority sizes="(max-width: 768px) 90vw, 460px" className="object-cover object-center" />
              <motion.div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent" animate={{ y: ["-120%", "520%"] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.8 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            </div>
          </motion.div>
          <div className="absolute left-3 top-8 grid gap-3 sm:-left-6">
            {badges.slice(0, 3).map((badge, index) => (
              <motion.div key={badge} animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + index, repeat: Infinity }} className="rounded-2xl border border-rose-200/80 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-glow backdrop-blur-xl">
                {badge}
              </motion.div>
            ))}
          </div>
          <div className="absolute -right-2 bottom-8 grid gap-3 sm:-right-5">
            {badges.slice(3).map((badge, index) => (
              <motion.div key={badge} animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5 + index, repeat: Infinity }} className="rounded-2xl border border-rose-200/80 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-glow backdrop-blur-xl">
                {badge}
              </motion.div>
            ))}
          </div>
          <HeroPhotoSlideshow />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPhotoSlideshow() {
  const [activePhoto, setActivePhoto] = useState(0);
  const visiblePhotos = useMemo(
    () => Array.from({ length: 3 }, (_, index) => galleryPhotos[(activePhoto + index) % galleryPhotos.length]),
    [activePhoto]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % galleryPhotos.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-20 mt-4 w-full lg:absolute lg:left-0 lg:top-[calc(100%+12px)] lg:mt-0">
      <div className="overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white/75 p-3 shadow-premium backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-3">
          {visiblePhotos.map((photo, index) => (
            <div key={`${photo.src}-${activePhoto}-${index}`} className="relative h-32 min-w-0 overflow-hidden rounded-[0.9rem] bg-slate-100">
              <motion.div initial={{ x: 26, opacity: 0.35 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.55, ease: "easeOut" }} className="absolute inset-0">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 30vw, 145px" className="object-cover object-center" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AiAssistantIntro() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hi! I'm Ankit's Ai Assistant, How can I help you today?";

  useEffect(() => {
    let currentIndex = 0;
    const timer = window.setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex));
      currentIndex += 1;

      if (currentIndex > fullText.length) {
        window.clearInterval(timer);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const speakIntro = () => {
      const speechWindow = window as Window & { __ankitAssistantSpoken?: boolean };
      if (speechWindow.__ankitAssistantSpoken) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      utterance.onstart = () => {
        speechWindow.__ankitAssistantSpoken = true;
      };
      utterance.onend = () => {
        window.removeEventListener("click", speakIntro);
        window.removeEventListener("keydown", speakIntro);
        window.removeEventListener("scroll", speakIntro);
      };

      window.speechSynthesis.speak(utterance);
    };

    const timer = window.setTimeout(speakIntro, 700);
    window.addEventListener("click", speakIntro, { once: true });
    window.addEventListener("keydown", speakIntro, { once: true });
    window.addEventListener("scroll", speakIntro, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("click", speakIntro);
      window.removeEventListener("keydown", speakIntro);
      window.removeEventListener("scroll", speakIntro);
    };
  }, []);

  return (
    <div className="relative max-w-[330px] rounded-xl border border-cyan-200/80 bg-white/75 px-4 py-3 shadow-glow backdrop-blur-xl">
      <p className="font-heading text-sm font-semibold leading-6 text-slate-950">
        {displayedText}
        {displayedText.length < fullText.length && <span className="ml-1 inline-block h-5 w-0.5 translate-y-1 bg-cyan-500" />}
      </p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <SectionBeam side="right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A product-minded engineer with research depth." text="Ankit brings together backend thinking, client delivery, AI curiosity, and disciplined software fundamentals." />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" whileHover={{ y: -8 }} transition={spring} viewport={{ once: true }} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-7 shadow-premium backdrop-blur-xl sm:p-10">
            <p className="text-lg leading-9 text-slate-700">
              Ankit Yadav is a Software Engineering undergraduate passionate about building scalable web applications, backend systems, and AI-driven solutions. He has developed real-world client projects, educational platforms, OCR-based systems, and research-driven solutions while pursuing B.Tech Computer Science & Engineering at Pranveer Singh Institute of Technology.
            </p>
            <p className="mt-6 text-lg leading-9 text-slate-600">
              His work sits at the intersection of full stack engineering, secure backend design, applied AI, and practical product execution. He is preparing for top software engineering opportunities by building deployable systems, solving DSA problems, contributing to hackathons, and publishing research-oriented work.
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4">
            {[
              ["Name", contact.name],
              ["Location", contact.location],
              ["Education", contact.education],
              ["Institute", contact.institute],
              ["Year", contact.duration]
            ].map(([label, value]) => (
              <motion.div variants={fadeUp} whileHover={{ x: 8, scale: 1.02 }} transition={spring} key={label} className="premium-card rounded-2xl border border-sky-200/70 bg-white/80 p-5 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.2em] text-skybrand">{label}</div>
                <div className="mt-2 font-heading text-xl font-semibold text-slate-950">{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const skillRail = techGroups.flatMap((group) => group.items);

  return (
    <section id="stack" className="relative py-24">
      <SectionBeam side="left" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Tech Stack" title="Tools for shipping real products." text="A categorized skill system spanning engineering fundamentals, backend systems, AI integrations, cloud basics, and modern frontend delivery." />
        <div className="relative mb-10 overflow-hidden border-y border-sky-200/70 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink to-transparent" />
          <div className="marquee-track flex w-max gap-3">
            {[...skillRail, ...skillRail].map((skill, index) => (
              <span key={`${skill}-${index}`} className="rounded-full border border-sky-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-xl">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => (
            <motion.div variants={fadeUp} whileHover={{ y: -10, rotate: -0.4, scale: 1.015 }} transition={spring} key={group.title} className="premium-card group rounded-3xl border border-sky-200/70 bg-white/80 p-6 backdrop-blur-xl transition hover:border-skybrand/35 hover:bg-white/80">
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ rotate: 12, scale: 1.12 }} className="rounded-2xl border border-skybrand/25 bg-skybrand/10 p-3 text-skybrand">
                  <group.icon size={22} />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold">{group.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span whileHover={{ y: -3, scale: 1.05 }} key={item} className="rounded-full border border-sky-200/70 bg-white/80 px-3 py-1.5 text-sm text-slate-600 transition group-hover:border-skybrand/30">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState("All");
  const visibleProjects = useMemo(() => (active === "All" ? projects : projects.filter((project) => project.category === active)), [active]);

  return (
    <section id="projects" className="relative py-24">
      <SectionBeam side="right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Featured Projects" title="Production-minded work, not classroom demos." text="Live products, client websites, hackathon platforms, and research systems with backend, AI, OCR, and deployment experience." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} key={filter} onClick={() => setActive(filter)} className={cx("rounded-full border px-4 py-2 text-sm font-medium transition", active === filter ? "border-rose-300 bg-gradient-to-r from-cyan-500 to-rose-400 text-white shadow-glow" : "border-rose-200/70 bg-white/80 text-slate-600 hover:border-rose-300 hover:text-slate-950")}>
              {filter}
            </motion.button>
          ))}
        </div>
        <motion.div layout className="grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className={cx(
                  "premium-card group rounded-3xl border border-sky-200/70 bg-white/80 p-6 shadow-premium backdrop-blur-xl transition hover:border-skybrand/35",
                  index === 0 && active === "All" ? "lg:col-span-2" : ""
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ rotate: -10, scale: 1.12 }} className="rounded-2xl border border-rose-300/40 bg-gradient-to-br from-cyan-100 to-rose-100 p-3 text-violet-600">
                      <project.icon size={24} />
                    </motion.div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-skybrand">{project.priority}</div>
                      <h3 className="mt-1 font-heading text-2xl font-semibold">{project.title}</h3>
                    </div>
                  </div>
                  <motion.a whileHover={{ x: 4 }} href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 px-4 py-2 text-sm text-slate-600 transition hover:border-skybrand/40 hover:text-slate-950">
                    Live <ExternalLink size={15} />
                  </motion.a>
                </div>
                <p className="mt-5 max-w-3xl leading-8 text-slate-600">{project.description}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <motion.div key={feature} whileHover={{ x: 5 }} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-skybrand" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <motion.span whileHover={{ y: -3 }} key={item} className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="relative py-24">
      <SectionBeam side="left" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Research & Innovation" title="Applied research for trustworthy digital systems." text="Research work focused on digitization, document intelligence, and integrity verification for land record management." />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" whileHover={{ y: -8 }} transition={spring} viewport={{ once: true }} className="premium-card overflow-hidden rounded-3xl border border-sky-200/70 bg-gradient-to-br from-white/85 to-teal-50/85 shadow-premium backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-sky-200/70 p-8 lg:border-b-0 lg:border-r">
              <motion.div animate={{ borderColor: ["rgba(56,189,248,.20)", "rgba(168,85,247,.45)", "rgba(56,189,248,.20)"] }} transition={{ duration: 5, repeat: Infinity }} className="rounded-3xl border border-skybrand/20 bg-skybrand/10 p-6">
                <div className="text-sm uppercase tracking-[0.24em] text-skybrand">Under Review</div>
                <h3 className="mt-4 font-heading text-3xl font-semibold">End-To-End OCR and Blockchain-Based Framework for Tamper-Proof Land Records</h3>
              </motion.div>
            </div>
            <div className="p-8">
              <p className="text-lg leading-9 text-slate-600">
                Research focused on OCR-based digitization and blockchain-backed integrity verification for secure land record management. The work explores document extraction, structured record handling, and tamper-resistant verification in public land systems.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {["OCR", "Blockchain Basics", "Land Records", "Integrity Verification", "Secure Storage"].map((item) => (
                  <motion.span whileHover={{ y: -3, scale: 1.04 }} key={item} className="rounded-full border border-sky-200/70 bg-white/80 px-4 py-2 text-sm text-slate-600">
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <SectionBeam side="right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Certifications" title="Proof of continuous professional learning." text="Certificates are linked directly from the project folder and mapped to the most relevant credential names." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <motion.a variants={fadeUp} whileHover={{ y: -10, rotate: 0.35, scale: 1.015 }} transition={spring} key={certificate.title} href={certificate.href} target="_blank" className="premium-card group rounded-3xl border border-sky-200/70 bg-white/80 p-6 backdrop-blur-xl transition hover:border-skybrand/35">
              <div className="flex items-start justify-between gap-4">
                <motion.div whileHover={{ rotate: 12, scale: 1.12 }} className="rounded-2xl border border-skybrand/25 bg-skybrand/10 p-3 text-skybrand">
                  <certificate.icon size={22} />
                </motion.div>
                <ExternalLink size={18} className="text-slate-500 transition group-hover:text-slate-950" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold">{certificate.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{certificate.issuer}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AchievementsAndTimeline() {
  return (
    <section className="relative py-24">
      <SectionBeam side="left" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div id="achievements">
          <SectionHeading eyebrow="Achievements" title="Signals that compound." text="A timeline of execution, competitive problem solving, research, and client delivery." />
          <div className="relative ml-3 border-l border-sky-200/80 pl-7">
            <motion.div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-skybrand via-violetbrand to-transparent" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.3 }} style={{ originY: 0 }} />
            {achievements.map((achievement, index) => (
              <motion.div key={achievement.title} initial={{ opacity: 0, x: -24, filter: "blur(8px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} whileHover={{ x: 8, scale: 1.015 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="premium-card relative mb-5 rounded-2xl border border-sky-200/70 bg-white/80 p-5 backdrop-blur-xl">
                <motion.span animate={{ boxShadow: ["0 0 0 rgba(56,189,248,0)", "0 0 28px rgba(56,189,248,.36)", "0 0 0 rgba(56,189,248,0)"] }} transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.15 }} className="absolute -left-[45px] top-5 rounded-full border border-skybrand/25 bg-white p-2 text-skybrand">
                  <achievement.icon size={18} />
                </motion.span>
                <h3 className="font-heading text-lg font-semibold">{achievement.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
        <div id="timeline">
          <SectionHeading eyebrow="Timeline" title="The build path." text="A focused progression from learning foundations to client projects, research systems, and scalable product work." />
          <div className="grid gap-4">
            {timeline.map((item, index) => (
              <motion.div key={item.year} initial={{ opacity: 0, y: 22, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} whileHover={{ y: -8, scale: 1.015 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-6 backdrop-blur-xl">
                <div className="text-sm font-semibold text-skybrand">{item.year}</div>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  return (
    <section id="profiles" className="relative py-24">
      <SectionBeam side="right" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Coding Profiles" title="Public engineering activity." text="GitHub stats, contribution activity, language usage, and LeetCode visibility through public profile cards." />
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.01 }} viewport={{ once: true }} transition={spring} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-4 backdrop-blur-xl">
            <Image src="https://github-readme-stats.vercel.app/api?username=officialankit18&show_icons=true&theme=transparent&hide_border=true&title_color=38BDF8&text_color=cbd5e1&icon_color=60A5FA" alt="GitHub stats for Ankit Yadav" width={720} height={300} className="h-auto w-full rounded-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.01 }} viewport={{ once: true }} transition={spring} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-4 backdrop-blur-xl">
            <Image src="https://github-readme-stats.vercel.app/api/top-langs/?username=officialankit18&layout=compact&theme=transparent&hide_border=true&title_color=38BDF8&text_color=cbd5e1" alt="Most used languages for Ankit Yadav" width={720} height={300} className="h-auto w-full rounded-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.006 }} viewport={{ once: true }} transition={spring} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-4 backdrop-blur-xl lg:col-span-2">
            <Image src="https://github-readme-activity-graph.vercel.app/graph?username=officialankit18&theme=github-compact&hide_border=true&bg_color=00000000&color=cbd5e1&line=38BDF8&point=A855F7" alt="GitHub contribution graph for Ankit Yadav" width={1200} height={360} className="h-auto w-full rounded-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.006 }} viewport={{ once: true }} transition={spring} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-4 backdrop-blur-xl lg:col-span-2">
            <Image src="https://leetcard.jacoblin.cool/__official_ankit_?theme=dark&font=Inter&ext=heatmap" alt="LeetCode card for Ankit Yadav" width={1200} height={420} className="mx-auto h-auto w-full max-w-4xl rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = encodeURIComponent(String(form.get("name") || ""));
    const email = encodeURIComponent(String(form.get("email") || ""));
    const message = encodeURIComponent(String(form.get("message") || ""));
    window.location.href = `mailto:${contact.email}?subject=Portfolio inquiry from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  };

  return (
    <section id="contact" className="relative py-24">
      <SectionBeam side="left" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Let's build something serious." text="Available for software engineering opportunities, freelance web development, research collaboration, and product-minded technical work." />
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -8 }} viewport={{ once: true }} transition={spring} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-7 backdrop-blur-xl">
            <h3 className="font-heading text-2xl font-semibold">Ankit Yadav</h3>
            <p className="mt-3 text-slate-600">{contact.location}</p>
            <a href={`mailto:${contact.email}`} className="mt-5 inline-flex items-center gap-2 text-skybrand">
              <Mail size={18} />
              {contact.email}
            </a>
            <div className="mt-8 grid gap-3">
              {socialLinks.map((link) => (
                <motion.a whileHover={{ x: 7 }} key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-sky-200/70 bg-white/80 px-5 py-4 text-slate-700 transition hover:border-skybrand/35">
                  <span className="inline-flex items-center gap-3">
                    <link.icon size={18} />
                    {link.label}
                  </span>
                  <ArrowUpRight size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ y: -8 }} viewport={{ once: true }} transition={spring} onSubmit={handleSubmit} className="premium-card rounded-3xl border border-sky-200/70 bg-white/80 p-7 backdrop-blur-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-600">
                Name
                <input name="name" required className="min-h-12 rounded-2xl border border-sky-200/70 bg-white/80 px-4 text-slate-950 outline-none transition focus:-translate-y-0.5 focus:border-skybrand focus:shadow-glow" />
              </label>
              <label className="grid gap-2 text-sm text-slate-600">
                Email
                <input name="email" type="email" required className="min-h-12 rounded-2xl border border-sky-200/70 bg-white/80 px-4 text-slate-950 outline-none transition focus:-translate-y-0.5 focus:border-skybrand focus:shadow-glow" />
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm text-slate-600">
              Message
              <textarea name="message" required rows={6} className="rounded-2xl border border-sky-200/70 bg-white/80 p-4 text-slate-950 outline-none transition focus:-translate-y-0.5 focus:border-skybrand focus:shadow-glow" />
            </label>
            <motion.button whileHover={{ scale: 1.045, y: -2 }} whileTap={{ scale: 0.97 }} type="submit" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-skybrand px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
              Send Message <Send size={17} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-sky-200/70 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Ankit Yadav. Built for real opportunities.</p>
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-slate-950">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function UtilityControls() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-skybrand via-bluebrand to-violetbrand" style={{ scaleX }} />
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 rounded-full border border-sky-200/80 bg-white/80 p-3 text-slate-950 shadow-glow backdrop-blur-xl transition hover:border-skybrand/40"
            aria-label="Back to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="fixed inset-0 z-[100] grid place-items-center bg-ink">
          <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border-2 border-rose-400 border-t-cyan-400 motion-safe:animate-spin" />
            <div className="font-heading text-2xl font-semibold">ANKIT YADAV</div>
            <div className="mt-2 text-sm uppercase tracking-[0.28em] text-rose-500">Portfolio</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Loader />
      <Ambient />
      <CustomCursor />
      <UtilityControls />
      <Header />
      <div className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Research />
        <Certifications />
        <AchievementsAndTimeline />
        <Profiles />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

