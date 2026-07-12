import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Sun,
  Moon,
  Star,
  ExternalLink,
  Code2,
  Palette,
  Server,
  Smartphone,
  Compass,
  Gauge,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageCircle,
  Check,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import profileImg from "@/assets/gunjit-profile.jpg";
import {
  NAME,
  ROLE,
  EMAIL,
  PHONE,
  LOCATION,
  SOCIALS,
  HEADLINES,
  STATS,
  SKILLS_FRONTEND,
  SKILLS_BACKEND,
  PROJECTS,
  PROJECT_CATEGORIES,
  EXPERIENCE,
  EDUCATION,
  SERVICES,
  HIRE_PACKAGES,
  TESTIMONIALS,
  POSTS,
  NAV,
} from "./data";

/* ---------- Backgrounds ---------- */
function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[oklch(0.68_0.22_300/0.35)] blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[oklch(0.66_0.2_255/0.28)] blur-[130px] animate-blob [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.82_0.15_200/0.25)] blur-[130px] animate-blob [animation-delay:-8s]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ---------- Scroll progress ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left gradient-bg"
    />
  );
}

/* ---------- Loading screen ---------- */
function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full gradient-bg blur-xl opacity-70" />
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl gradient-bg font-display text-2xl font-bold text-primary-foreground">
                G
              </div>
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Loading portfolio
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Custom cursor (desktop only) ---------- */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
    };
    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-9 w-9 rounded-full border border-primary/50 md:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-2 w-2 rounded-full gradient-bg md:block"
      />
    </>
  );
}

/* ---------- Nav ---------- */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Nav({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-4 py-3 sm:px-6 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-bg font-display text-base font-bold text-primary-foreground">
              G
            </span>
            <span className="truncate font-display text-base font-semibold">
              Gunjit<span className="gradient-text">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full gradient-bg px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] sm:inline-block"
            >
              Let's talk
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 grid gap-1 rounded-2xl glass-strong p-3 lg:hidden"
            >
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm ${
                    active === n.id
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------- Typing effect ---------- */
function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 45 : 85;
    const t = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1400);
      else if (deleting && next === "") {
        setDeleting(false);
        setI((v) => v + 1);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return (
    <span>
      <span className="gradient-text">{text}</span>
      <span className="caret ml-0.5 inline-block w-[2px] translate-y-0.5 bg-primary" style={{ height: "0.9em" }} />
    </span>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-2xl"
          >
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full gradient-bg" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
            )}
            {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm {NAME}. <br className="hidden sm:block" />
            <span className="text-muted-foreground">I'm a </span>
            <Typewriter words={HEADLINES} />
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            I design and build fast, elegant digital products — end to end. From
            pixel-perfect interfaces to resilient backends, I turn ideas into
            experiences people love.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:text-primary"
            >
              Contact Me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {[
              { icon: Github, href: SOCIALS.github, label: "GitHub" },
              { icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
              { icon: Dribbble, href: SOCIALS.dribbble, label: "Dribbble" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full glass transition-all hover:text-primary hover:-translate-y-0.5"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] gradient-bg opacity-40 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-2">
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src={profileImg}
                alt={`${NAME} portrait`}
                width={816}
                height={816}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-6 rounded-2xl glass-strong px-4 py-3 text-xs"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <div>
                <div className="font-semibold">5+ years</div>
                <div className="text-muted-foreground">Engineering</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-10 rounded-2xl glass-strong px-4 py-3 text-xs"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <div>
                <div className="font-semibold">84 projects</div>
                <div className="text-muted-foreground">Shipped worldwide</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Counter ---------- */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about" eyebrow="About me" title={<>Crafting software with <span className="gradient-text">care</span> and clarity.</>}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-base text-muted-foreground sm:text-lg">
          <p>
            I'm a software developer based in {LOCATION} with over five years of
            experience shipping products for startups and studios around the world.
            My focus is on the intersection of design and engineering — building
            interfaces that feel obvious, fast and delightful.
          </p>
          <p>
            When I'm not coding, you'll find me sketching UI ideas, exploring the
            Himalayas, or contributing to open source. I care about craft, calm
            aesthetics and shipping.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              "TypeScript",
              "React & Next.js",
              "Node.js & Postgres",
              "Design Systems",
              "Motion & Interaction",
              "DX & Tooling",
            ].map((t) => (
              <div key={t} className="rounded-xl glass px-4 py-3 text-sm text-foreground">
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl glass-strong p-6"
            >
              <div className="font-display text-4xl font-bold sm:text-5xl">
                <span className="gradient-text"><Counter to={s.value} /></span>
                <span className="gradient-text">+</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full gradient-bg opacity-20 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full rounded-full gradient-bg"
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>Tools of the <span className="gradient-text">trade</span>.</>}
      subtitle="A modern stack refined by shipping to production. I pick tools that let me move fast without cutting corners."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Frontend", icon: Palette, items: SKILLS_FRONTEND },
          { title: "Backend", icon: Server, items: SKILLS_BACKEND },
        ].map((group) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl glass-strong p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-primary-foreground">
                <group.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{group.title}</h3>
            </div>
            <div className="space-y-5">
              {group.items.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */
function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={<>Projects I'm <span className="gradient-text">proud</span> of.</>}
      subtitle="A snapshot of recent work across web, commerce and mobile."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm transition-all ${
              filter === c
                ? "gradient-bg text-primary-foreground shadow-lg shadow-primary/30"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-3xl glass-strong"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(1_0_0/0.15),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center opacity-30 transition-opacity group-hover:opacity-50">
                  <span className="font-display text-6xl font-bold text-white/70">
                    {p.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center gap-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <a
                    href={p.demo}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-slate-900"
                  >
                    <ExternalLink className="h-3 w-3" /> Live
                  </a>
                  <a
                    href={p.github}
                    className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur"
                  >
                    <Github className="h-3 w-3" /> Code
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {p.category}
                </div>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A short <span className="gradient-text">timeline</span>.</>}
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent sm:left-1/2" />
        <div className="space-y-10">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className={`relative grid gap-4 sm:grid-cols-2 ${
                i % 2 === 0 ? "" : "sm:[&>*:first-child]:col-start-2"
              }`}
            >
              <div className={`sm:${i % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                <div className="rounded-2xl glass-strong p-6">
                  <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {e.duration}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{e.position}</h3>
                  <div className="gradient-text text-sm font-medium">{e.company}</div>
                  <ul className={`mt-3 space-y-1.5 text-sm text-muted-foreground ${i % 2 === 0 ? "sm:text-right" : ""}`}>
                    {e.points.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full gradient-bg text-primary-foreground shadow-lg shadow-primary/30 sm:left-1/2">
                <Briefcase className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Education ---------- */
function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & Certifications"
      title={<>Always <span className="gradient-text">learning</span>.</>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {EDUCATION.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl glass-strong p-6"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-bg text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
            <div className="text-sm text-muted-foreground">{e.school}</div>
            <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              {e.year}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const icons = [Code2, Palette, Server, Smartphone, Compass, Gauge];
  return (
    <Section
      id="services"
      eyebrow="Services"
      title={<>What I can <span className="gradient-text">do</span> for you.</>}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass-strong p-6"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl gradient-bg text-primary-foreground transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-2xl font-bold gradient-text">{s.price}</span>
                <span className="mb-1 text-xs text-muted-foreground">{s.unit}</span>
              </div>
              <a
                href="#hire"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                Hire for this <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full gradient-bg opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Hire Me ---------- */
function HireMe() {
  const [form, setForm] = useState({ name: "", email: "", pkg: "Professional", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and project details.");
      return;
    }
    setSent(true);
    toast.success("Request received! I'll get back to you within 24 hours.");
    setForm({ name: "", email: "", pkg: "Professional", budget: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Section
      id="hire"
      eyebrow="Hire Me"
      title={<>Let's build <span className="gradient-text">something great</span>.</>}
      subtitle="Pick a package that fits your needs, then send me the brief. I'll reply within 24 hours."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {HIRE_PACKAGES.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            whileHover={{ y: -6 }}
            className={`relative flex flex-col overflow-hidden rounded-3xl p-8 ${
              p.highlighted
                ? "glass-strong ring-2 ring-primary/60 shadow-[0_20px_60px_-20px_oklch(0.68_0.22_300/0.5)]"
                : "glass"
            }`}
          >
            {p.highlighted && (
              <div className="absolute right-6 top-6 rounded-full gradient-bg px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                Most Popular
              </div>
            )}
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.duration}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-bold gradient-text">{p.price}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full gradient-bg text-primary-foreground">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, pkg: p.name }))}
              className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
                p.highlighted
                  ? "gradient-bg text-primary-foreground shadow-lg shadow-primary/30"
                  : "glass hover:text-primary"
              }`}
            >
              Choose {p.name}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 rounded-3xl glass-strong p-6 sm:p-8"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold">Send a hire request</h3>
            <p className="text-sm text-muted-foreground">Tell me about your project and I'll respond with a plan.</p>
          </div>
          <div className="rounded-full glass px-4 py-2 text-xs">
            Selected: <span className="font-semibold text-primary">{form.pkg}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl bg-input/50 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary/60"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
            className="w-full rounded-xl bg-input/50 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary/60"
          />
          <select
            value={form.pkg}
            onChange={(e) => setForm({ ...form, pkg: e.target.value })}
            className="w-full rounded-xl bg-input/50 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary/60"
          >
            {HIRE_PACKAGES.map((p) => (
              <option key={p.name} value={p.name} className="bg-background">
                {p.name} — {p.price}
              </option>
            ))}
          </select>
          <input
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            placeholder="Estimated budget (optional)"
            className="w-full rounded-xl bg-input/50 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary/60"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Project details — goals, timeline, links..."
            rows={5}
            className="sm:col-span-2 w-full rounded-xl bg-input/50 px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary/60"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Or email me directly at <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a></p>
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {sent ? "Sent ✓" : (<>Send request <Send className="h-4 w-4" /></>)}
          </button>
        </div>
      </motion.form>
    </Section>
  );
}

/* ---------- AI Assistant Widget ---------- */
type ChatMsg = { role: "user" | "assistant"; content: string };

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: `Hi! I'm ${NAME.split(" ")[0]}'s AI assistant. Ask me anything about services, pricing, or how to hire.` },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: `Sorry, something went wrong: ${(err as Error).message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = ["What services do you offer?", "How much for a landing page?", "How can I hire you?"];

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-6 z-[80] grid h-14 w-14 place-items-center rounded-full gradient-bg text-primary-foreground shadow-[0_10px_40px_-8px_oklch(0.68_0.22_300/0.6)]"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-4 z-[80] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl glass-strong shadow-2xl sm:right-6"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="relative grid h-9 w-9 place-items-center rounded-full gradient-bg text-primary-foreground">
                <Bot className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Ask Gunjit's AI</div>
                <div className="text-xs text-muted-foreground">Usually replies instantly</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "gradient-bg text-primary-foreground"
                        : "bg-secondary/60 text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-secondary/60 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              )}
              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); setTimeout(() => send(), 0); }}
                      className="rounded-full glass px-3 py-1.5 text-xs hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-border/60 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-full bg-input/60 px-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-primary/60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-bg text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, []);
  const current = TESTIMONIALS[i];
  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title={<>People I've <span className="gradient-text">worked</span> with.</>}
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: current.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed sm:text-2xl">
                "{current.quote}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full gradient-bg font-display text-lg font-semibold text-primary-foreground">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{current.name}</div>
                  <div className="text-sm text-muted-foreground">{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, j) => (
              <button
                key={j}
                onClick={() => setI(j)}
                aria-label={`Slide ${j + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  j === i ? "w-8 gradient-bg" : "w-1.5 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Blog ---------- */
function Blog() {
  return (
    <Section
      id="blog"
      eyebrow="Journal"
      title={<>Recent <span className="gradient-text">writing</span>.</>}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group overflow-hidden rounded-2xl glass-strong"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-500/30 via-blue-500/25 to-cyan-400/30">
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-5xl font-bold text-white/40">
                  {p.tag.charAt(0)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span>·<span>{p.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold group-hover:gradient-text">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2"
              >
                Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [state, setState] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (state.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = "Enter a valid email.";
    if (state.subject.trim().length < 2) e.subject = "Add a short subject.";
    if (state.message.trim().length < 10) e.message = "Message is a bit short.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    toast.success("Thanks! I'll be in touch shortly.");
    setState({ name: "", email: "", subject: "", message: "" });
  };

  const field = "w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:bg-secondary";
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={<>Let's build something <span className="gradient-text">great</span>.</>}
      subtitle="Have a project in mind or just want to say hi? Drop me a message."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
            { icon: MapPin, label: "Location", value: LOCATION },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 rounded-2xl glass-strong p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                {c.href ? (
                  <a href={c.href} className="block truncate font-medium hover:text-primary">
                    {c.value}
                  </a>
                ) : (
                  <div className="truncate font-medium">{c.value}</div>
                )}
              </div>
            </div>
          ))}
          <div className="overflow-hidden rounded-2xl glass-strong p-2">
            <iframe
              title="Location map"
              src="https://www.google.com/maps?q=Kathmandu&output=embed"
              loading="lazy"
              className="h-56 w-full rounded-xl border-0 grayscale-[0.4] contrast-90"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form onSubmit={submit} className="rounded-3xl glass-strong p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input
                className={field}
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                maxLength={80}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                className={field}
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                maxLength={120}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Subject</label>
            <input
              className={field}
              value={state.subject}
              onChange={(e) => setState({ ...state, subject: e.target.value })}
              maxLength={120}
            />
            {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              rows={5}
              className={`${field} resize-none`}
              value={state.message}
              onChange={(e) => setState({ ...state, message: e.target.value })}
              maxLength={1500}
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            disabled={sending}
            className="mt-6 inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] disabled:opacity-70"
          >
            <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </Section>
  );
}

/* ---------- Footer + Back to top ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full gradient-bg text-primary-foreground shadow-lg shadow-primary/40"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <a href="#home" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl gradient-bg font-display text-lg font-bold text-primary-foreground">
              G
            </span>
            <span className="font-display text-lg font-semibold">
              Gunjit Gyawali<span className="gradient-text">.</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Software developer building refined, human-first products.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Navigate</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {NAV.slice(0, 8).map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-primary">
                {n.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</div>
          <div className="flex gap-2">
            {[
              { icon: Github, href: SOCIALS.github, label: "GitHub" },
              { icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
              { icon: Dribbble, href: SOCIALS.dribbble, label: "Dribbble" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{EMAIL}</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} {NAME}. All rights reserved.</div>
          <div>Designed & built with care.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Main ---------- */
export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackdrop />
      <ScrollProgress />
      <LoadingScreen />
      <CustomCursor />
      <Nav theme={theme} toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <HireMe />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AIAssistant />
    </div>
  );
}
