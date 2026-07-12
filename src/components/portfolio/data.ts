export const NAME = "Gunjit Gyawali";

export const ROLE = "Software Developer";
export const EMAIL = "hello@gunjit.dev";
export const PHONE = "+977 98-0000-0000";
export const LOCATION = "Kathmandu, Nepal";
export const SOCIALS = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  twitter: "https://twitter.com/",
  dribbble: "https://dribbble.com/",
};

export const HEADLINES = [
  "Software Developer",
  "Full-Stack Engineer",
  "UI / UX Enthusiast",
  "Problem Solver",
];

export const STATS = [
  { label: "Projects Completed", value: 84 },
  { label: "Happy Clients", value: 42 },
  { label: "Years Experience", value: 5 },
  { label: "Awards", value: 9 },
];

export const SKILLS_FRONTEND = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Tailwind CSS", level: 96 },
  { name: "Framer Motion", level: 85 },
];
export const SKILLS_BACKEND = [
  { name: "Node.js / Express", level: 90 },
  { name: "PostgreSQL", level: 84 },
  { name: "Python / FastAPI", level: 80 },
  { name: "GraphQL / REST APIs", level: 88 },
];

export const PROJECTS = [
  {
    title: "Nova Analytics",
    category: "Web App",
    description: "Realtime analytics dashboard with beautiful data viz and role-based access.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    demo: "#",
    github: "#",
    gradient: "from-purple-500/40 via-blue-500/30 to-cyan-400/40",
  },
  {
    title: "Pulse Commerce",
    category: "E-commerce",
    description: "Headless commerce storefront with lightning-fast checkout and CMS.",
    tech: ["React", "Stripe", "Node.js"],
    demo: "#",
    github: "#",
    gradient: "from-cyan-400/40 via-blue-500/30 to-purple-500/40",
  },
  {
    title: "Orbit Chat",
    category: "Mobile",
    description: "End-to-end encrypted messaging app with voice, video, and reactions.",
    tech: ["React Native", "WebRTC", "Rust"],
    demo: "#",
    github: "#",
    gradient: "from-blue-500/40 via-purple-500/30 to-pink-500/30",
  },
  {
    title: "Lumen CMS",
    category: "Web App",
    description: "Block-based content platform for teams with realtime collaboration.",
    tech: ["Next.js", "tRPC", "Prisma"],
    demo: "#",
    github: "#",
    gradient: "from-emerald-400/30 via-cyan-400/40 to-blue-500/40",
  },
  {
    title: "Finlay Wallet",
    category: "Mobile",
    description: "Personal finance tracker with AI-powered spending insights and budgets.",
    tech: ["React Native", "Supabase", "OpenAI"],
    demo: "#",
    github: "#",
    gradient: "from-fuchsia-500/40 via-purple-500/30 to-blue-500/40",
  },
  {
    title: "Atlas Docs",
    category: "E-commerce",
    description: "Documentation platform with instant search and versioned releases.",
    tech: ["Astro", "Algolia", "MDX"],
    demo: "#",
    github: "#",
    gradient: "from-amber-400/30 via-pink-500/30 to-purple-500/40",
  },
];

export const PROJECT_CATEGORIES = ["All", "Web App", "E-commerce", "Mobile"];

export const EXPERIENCE = [
  {
    company: "Northwind Studio",
    position: "Senior Software Developer",
    duration: "2023 — Present",
    points: [
      "Lead architecture for a multi-tenant SaaS serving 40k+ monthly users.",
      "Mentored a team of 6 engineers and shipped a design-system overhaul.",
      "Reduced core web vitals LCP by 62% via edge rendering and asset strategy.",
    ],
  },
  {
    company: "Kestrel Labs",
    position: "Full-Stack Engineer",
    duration: "2021 — 2023",
    points: [
      "Built payment and subscription infrastructure processing $2M+ ARR.",
      "Owned realtime collaboration features with CRDT-backed sync.",
      "Introduced end-to-end typing across the stack with tRPC + Zod.",
    ],
  },
  {
    company: "Freelance",
    position: "Frontend Developer",
    duration: "2019 — 2021",
    points: [
      "Delivered 20+ marketing and product sites for early-stage startups.",
      "Established motion and interaction guidelines used across brands.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    school: "Tribhuvan University",
    year: "2016 — 2020",
  },
  {
    degree: "AWS Certified Solutions Architect",
    school: "Amazon Web Services",
    year: "2023",
  },
  {
    degree: "Google UX Design Professional",
    school: "Google / Coursera",
    year: "2022",
  },
];

export const SERVICES = [
  { title: "Web Development", desc: "Modern, performant web apps built with React, Next.js and TypeScript.", price: "$1,200", unit: "/ project" },
  { title: "UI / UX Design", desc: "Human-centered interfaces with strong visual hierarchy and craft.", price: "$800", unit: "/ project" },
  { title: "API Development", desc: "Robust REST and GraphQL APIs with observability baked in.", price: "$1,000", unit: "/ project" },
  { title: "Mobile Responsive Design", desc: "Fluid layouts that shine on every device, from phone to 4K.", price: "$600", unit: "/ project" },
  { title: "Consulting", desc: "Architecture reviews, tech due-diligence and team enablement.", price: "$80", unit: "/ hour" },
  { title: "Performance Audits", desc: "Lighthouse-driven optimisation for speed, SEO and accessibility.", price: "$450", unit: "/ audit" },
];

export const HIRE_PACKAGES = [
  {
    name: "Starter",
    price: "$499",
    duration: "1 week delivery",
    description: "Perfect for landing pages and small marketing sites.",
    features: [
      "1 responsive landing page",
      "Custom design + animations",
      "SEO & performance optimized",
      "2 rounds of revisions",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$1,499",
    duration: "2–3 weeks delivery",
    description: "Full websites and web apps for growing businesses.",
    features: [
      "Up to 6 custom pages",
      "CMS or database integration",
      "Auth & user accounts",
      "Advanced animations & UX",
      "Priority support (2 months)",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "Flexible timeline",
    description: "End-to-end products with backend, mobile, and integrations.",
    features: [
      "Full-stack architecture",
      "Mobile + web platforms",
      "Third-party integrations",
      "Dedicated project manager",
      "Ongoing maintenance",
    ],
    highlighted: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Anika Rana",
    role: "Product Lead, Northwind",
    rating: 5,
    quote:
      "Gunjit combines rare taste with sharp engineering. Every project he touches ships polished and on time.",
  },
  {
    name: "Marcus Feld",
    role: "Founder, Pulse Commerce",
    rating: 5,
    quote:
      "Our storefront rebuild lifted conversion by 34%. Gunjit is the developer I recommend to every founder.",
  },
  {
    name: "Priya Shah",
    role: "CTO, Kestrel Labs",
    rating: 5,
    quote:
      "Deep systems thinking paired with a designer's eye. He raised the bar for our entire engineering team.",
  },
  {
    name: "Leo Martins",
    role: "Design Director, Atlas",
    rating: 5,
    quote:
      "Motion, micro-interactions, accessibility — nothing is an afterthought. Truly a craftsman.",
  },
];

export const POSTS = [
  {
    title: "Designing With Motion, Not Just For It",
    excerpt: "How to use motion as a first-class design tool without hurting performance.",
    date: "Mar 2026",
    tag: "Design",
  },
  {
    title: "The Case for Edge-First React Apps",
    excerpt: "Practical patterns for shipping React at the edge with sub-second LCP.",
    date: "Feb 2026",
    tag: "Engineering",
  },
  {
    title: "Type-Safe APIs Without the Boilerplate",
    excerpt: "A pragmatic guide to tRPC, Zod and shared validation across the stack.",
    date: "Jan 2026",
    tag: "TypeScript",
  },
];

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "hire", label: "Hire" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
