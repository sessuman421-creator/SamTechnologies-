import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Phone, Mail, Check, MessageSquare } from 'lucide-react';
import {
  PRICING_TIERS,
  PROCESS_STAGES,
  STUDIO_CONTACT,
  STUDIO_IMAGES,
  STUDIO_PROJECTS,
} from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { buildEmailHref, buildWhatsAppHref } from '../utils/contactLinks';
import { HIRE_ROLES } from './HirePage';
import { SmartImage } from '../components/SmartImage';
import { ProjectCard } from '../components/ProjectCard';
import { ServicePricingTabs } from '../components/ServicePricingTabs';
import { SmoothReveal, STUDIO_EASE, STUDIO_SPRING } from '../components/MotionPrimitives';

interface HomePageProps {
  onNavigate: NavigateFn;
}

const ABOUT_TABS = [
  {
    id: 'background',
    label: 'Background',
    heading: 'Software Developer & GenAI Engineer building from Accra for teams worldwide.',
    body: 'I am Samuel Essuman, founder of SamTechnologies. My work sits at the intersection of production software architecture and applied generative AI—turning complex technical ideas into fast, dependable web platforms, mobile apps, learning academies, and coding agents.',
    highlights: [
      'Architect and ship end-to-end applications across React, TypeScript, backend APIs, and databases',
      'Design custom EdTech ecosystems modeled after LearnTech Academy and CampusStudy',
      'Mentor aspiring developers and engineering teams through structured weekly cohorts',
    ],
  },
  {
    id: 'skills',
    label: 'Skills & Stack',
    heading: 'Full-stack systems engineering paired with modern LLM & agent orchestration.',
    body: 'Rather than treating AI as a superficial wrapper, I engineer grounded retrieval pipelines, structured prompt systems, and multi-agent developer tools on top of clean, maintainable TypeScript software.',
    highlights: [
      'Frontend & Mobile: React, TypeScript, Tailwind CSS, responsive touch architecture, smooth motion',
      'Backend & Data: REST APIs, relational modeling, auth/RBAC, server proxies, production deployment',
      'GenAI & Agents: RAG systems, prompt engineering, tool calling, coding agents (DevAI & CodeGPT)',
    ],
  },
  {
    id: 'passion',
    label: 'Passion & Craft',
    heading: 'Focused on practical utility, clarity, and software that feels human-crafted.',
    body: 'I believe great software respects the user’s time—clean typography, crisp hierarchy, deterministic AI behavior, and zero bloated gimmicks. Every system I deliver is built to solve real operational problems and scale cleanly.',
    highlights: [
      'Direct founder-level accountability from system blueprint to production launch',
      'Transparent dual-currency pricing in GH₵ and USD with realistic delivery schedules',
      'Built seven live production systems across education, finance, and AI developer tooling',
    ],
  },
] as const;

export function HomePage({ onNavigate }: HomePageProps) {
  const [currency, setCurrency] = useState<'both' | 'ghs' | 'usd'>('both');
  const [aboutTab, setAboutTab] = useState<(typeof ABOUT_TABS)[number]['id']>('background');

  const activeAbout = ABOUT_TABS.find((t) => t.id === aboutTab) ?? ABOUT_TABS[0];

  const marqueeItems = [
    'LearnTech Academy',
    'Cramly Assist',
    'CampusStudy',
    'CryptoTrade',
    'OmniGPT AI',
    'DevAI',
    'CodeGPT',
    'Full-Stack Systems',
    'RAG & Coding Agents',
  ];

  const featuredCapabilities = [
    {
      slug: 'full-stack-web-app',
      index: '01',
      title: 'Full-Stack Web & Mobile Systems',
      summary:
        'Production web applications, multi-role SaaS dashboards, backend APIs, and cross-platform mobile apps engineered for speed and long-term maintainability.',
      priceRange: 'GH₵1,200 – GH₵15,000 / $100 – $1,200',
      span: 'lg:col-span-7',
    },
    {
      slug: 'genai-engineer',
      index: '02',
      title: 'GenAI & RAG Engineering',
      summary:
        'Grounded retrieval architectures, conversational assistants, and tool-using AI systems engineered for deterministic accuracy.',
      priceRange: 'GH₵4,000 – GH₵10,000 / $320 – $800',
      span: 'lg:col-span-5',
    },
    {
      slug: 'ai-coding-agent-engineering',
      index: '03',
      title: 'AI Coding Agent Engineering',
      summary:
        'Single and multi-agent developer workflows for planning, artifact extraction, code generation, and verification—modeled after DevAI & CodeGPT.',
      priceRange: 'GH₵5,000 – GH₵13,000 / $400 – $1,000',
      span: 'lg:col-span-5',
    },
    {
      slug: 'building-learning-platforms',
      index: '04',
      title: 'Learning Platforms & Mentorship',
      summary:
        'Complete digital academies like LearnTech Academy alongside weekly 1-on-1 developer and GenAI mentorship cohorts.',
      priceRange: 'GH₵250/hr · GH₵5,500 – GH₵14,000',
      span: 'lg:col-span-7',
    },
  ];

  const heroPrimaryProject = STUDIO_PROJECTS[0];
  const remainingProjects = STUDIO_PROJECTS.slice(1);

  return (
    <div>
      {/* 1. Architectural Hero Split */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: STUDIO_EASE }}
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div className="space-y-6">
              <p className="text-xs sm:text-sm font-medium text-[#9CA3AF] tracking-tight">
                {STUDIO_CONTACT.founder} · {STUDIO_CONTACT.title} · {STUDIO_CONTACT.location}
              </p>

              <h1 className="font-display text-[clamp(2.35rem,4.4vw,4.15rem)] font-bold tracking-tight leading-[1.04] text-white">
                Software systems and generative AI engineered for production.
              </h1>

              <p className="text-base sm:text-lg text-[#A1A7B3] leading-relaxed max-w-2xl">
                SamTechnologies builds full-stack web applications, mobile products, custom learning academies,
                and multi-agent AI software. Inspect seven live deployed platforms below, review transparent
                GH₵ and USD order rates, or commission a tailored build.
              </p>
            </div>

            <div className="pt-8 lg:pt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate({ view: 'pricing' })}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
              >
                <span>View Pricing &amp; Orders</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ view: 'work' })}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#121418] border border-[#2D323E] hover:border-white rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore All 7 Projects</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: STUDIO_EASE }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[300px] lg:min-h-[430px] rounded-xl overflow-hidden border border-[#242832] bg-[#14171D]">
              <SmartImage
                src={STUDIO_IMAGES.heroStudio}
                alt="SamTechnologies architectural software engineering workstation in natural daylight"
                fallbackTitle="SamTechnologies Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-white/80 font-medium">Call &amp; WhatsApp</p>
                  <p className="font-mono text-sm text-white tabular-nums mt-0.5">
                    {STUDIO_CONTACT.primaryPhone} · {STUDIO_CONTACT.secondaryPhone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'contact' })}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Contact Studio
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Ledger Metrics Strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-[#242832] bg-[#121418] rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-[#242832]">
          <button
            type="button"
            onClick={() => onNavigate({ view: 'work' })}
            className="p-6 text-left hover:bg-[#171A21] transition-colors cursor-pointer group"
          >
            <p className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums group-hover:text-[#60A5FA] transition-colors">
              07
            </p>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5">Live Deployed Platforms</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate({ view: 'pricing' })}
            className="p-6 text-left hover:bg-[#171A21] transition-colors cursor-pointer group"
          >
            <p className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums group-hover:text-[#60A5FA] transition-colors">
              09
            </p>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5">Engineering &amp; GenAI Service Tiers</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate({ view: 'process' })}
            className="p-6 text-left hover:bg-[#171A21] transition-colors cursor-pointer group"
          >
            <p className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums group-hover:text-[#60A5FA] transition-colors">
              2–45 Days
            </p>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5">Scoped Delivery Windows</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate({ view: 'order' })}
            className="p-6 text-left hover:bg-[#171A21] transition-colors cursor-pointer group"
          >
            <p className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums group-hover:text-[#60A5FA] transition-colors">
              GH₵ / USD
            </p>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5">Transparent Order Configuration</p>
          </button>
        </div>
      </section>

      {/* 2. Subtle Kinetic Marquee Ribbon */}
      <div className="border-y border-[#22252C] bg-[#0D0F12] overflow-hidden py-3.5">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-medium text-[#9CA3AF] whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={`${item}-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span aria-hidden="true" className="text-[#4B5563]">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Dynamic About Me Section (Sam · Software Developer & GenAI Engineer) */}
      <section id="about" className="max-w-[1360px] mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <SmoothReveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="rounded-xl overflow-hidden border border-[#242832] bg-[#14171D] aspect-[4/3]">
              <SmartImage
                src={STUDIO_IMAGES.founderWorkspace}
                alt="Samuel Essuman engineering workspace with technical notebook and dual displays"
                fallbackTitle="Samuel Essuman"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-[#121418] border border-[#242832] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-[#22252C] pb-4">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Principal Engineer</p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">
                    {STUDIO_CONTACT.founder} (Sam)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'contact' })}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Message Sam
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                  className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#60A5FA] transition-colors font-mono tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span>Phone: {STUDIO_CONTACT.primaryPhone}</span>
                </a>
                <a
                  href={buildWhatsAppHref({
                    intent: 'Hiring / Project Inquiry for Samuel Essuman',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#60A5FA] transition-colors font-mono tabular-nums"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {STUDIO_CONTACT.secondaryPhone}</span>
                </a>
                <a
                  href={buildEmailHref(
                    { intent: 'Hiring / Project Inquiry for Samuel Essuman' },
                    STUDIO_CONTACT.primaryEmail
                  )}
                  className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#60A5FA] transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span className="truncate">{STUDIO_CONTACT.primaryEmail}</span>
                </a>
                <a
                  href={buildEmailHref(
                    { intent: 'Hiring / Project Inquiry for Samuel Essuman' },
                    STUDIO_CONTACT.secondaryEmail
                  )}
                  className="flex items-center gap-2 text-[#E5E7EB] hover:text-[#60A5FA] transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span className="truncate">{STUDIO_CONTACT.secondaryEmail}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#22252C]">
                <div>
                  <p className="text-xs font-medium text-[#60A5FA]">About Me</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                    Meet Sam — Software Developer &amp; GenAI Engineer
                  </h2>
                </div>
              </div>

              {/* Interactive Animated Sub-Tabs */}
              <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#0D0F12] border border-[#242832] rounded-lg">
                {ABOUT_TABS.map((tab) => {
                  const active = aboutTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAboutTab(tab.id)}
                      className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="about-tab-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="absolute inset-0 bg-[#2563EB] rounded-md"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAbout.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: STUDIO_EASE }}
                  className="space-y-5"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                    {activeAbout.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed">
                    {activeAbout.body}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {activeAbout.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#E5E7EB]">
                        <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-[#22252C] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#9CA3AF]">
                Available for custom software builds, GenAI systems, and mentorship cohorts.
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'services' })}
                  className="text-xs font-semibold text-white hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  View Capabilities
                </button>
                <span aria-hidden="true" className="text-[#4B5563]">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'order' })}
                  className="text-xs font-semibold text-[#60A5FA] hover:underline cursor-pointer"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        </SmoothReveal>
      </section>

      {/* 4. Asymmetric Capabilities Bento Grid */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 pb-20 lg:pb-24">
        <SmoothReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#22252C]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#60A5FA]">Core Disciplines</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              From clean frontend interfaces to autonomous multi-agent systems.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ view: 'services' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>All 9 Service Specifications</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </SmoothReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-10">
          {featuredCapabilities.map((cap, idx) => (
            <SmoothReveal key={cap.slug} delay={idx * 0.05} className={cap.span}>
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18, ease: STUDIO_EASE }}
                onClick={() => onNavigate({ view: 'service', slug: cap.slug })}
                className="w-full h-full text-left bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl p-7 sm:p-8 flex flex-col justify-between gap-8 transition-colors cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#9CA3AF] tabular-nums">{cap.index}.</span>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#60A5FA] transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed">{cap.summary}</p>
                </div>

                <div className="pt-5 border-t border-[#22252C] flex items-center justify-between gap-4">
                  <span className="font-mono text-xs sm:text-sm font-medium text-white tabular-nums">
                    {cap.priceRange}
                  </span>
                  <span className="text-xs font-semibold text-[#60A5FA] group-hover:underline">
                    Inspect Scope
                  </span>
                </div>
              </motion.button>
            </SmoothReveal>
          ))}
        </div>
      </section>

      {/* 5. Dynamic Portfolio Section — Visually Distinct Cards for All 7 Projects */}
      <section className="bg-[#07080A] border-y border-[#1E2128] py-20 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <SmoothReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#22252C]">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#60A5FA]">Dynamic Portfolio</p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Seven live software and GenAI systems in production.
              </h2>
              <p className="text-sm text-[#9CA3AF]">
                Tap any project card to open its dedicated case study page covering features, tech stack
                badges, and specific engineering contributions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ view: 'work' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Filter Portfolio Archive</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </SmoothReveal>

          {/* Featured Flagship Card: LearnTech Academy */}
          <SmoothReveal className="pt-10">
            <ProjectCard project={heroPrimaryProject} onNavigate={onNavigate} featured />
          </SmoothReveal>

          {/* Visually Distinct Cards for Projects 02–07 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {remainingProjects.map((project, idx) => (
              <SmoothReveal key={project.slug} delay={idx * 0.04}>
                <ProjectCard project={project} onNavigate={onNavigate} />
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Services & Pricing Tabbed Explorer + Ledger */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <SmoothReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#22252C]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#60A5FA]">Order Rate Schedule</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Clear pricing in Ghana Cedis and US Dollars.
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              Switch between all 9 service tabs below or select any row to configure an order directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center p-1 bg-[#121418] border border-[#242832] rounded-lg">
              {(['both', 'ghs', 'usd'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCurrency(mode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currency === mode
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {mode === 'both' ? 'GH₵ & USD' : mode === 'ghs' ? 'GH₵ Only' : 'USD Only'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate({ view: 'pricing' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Open Pricing &amp; Orders Tab</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </SmoothReveal>

        <div className="mt-8">
          <ServicePricingTabs onNavigate={onNavigate} currencyMode={currency} />
        </div>

        <div className="mt-8 bg-[#121418] border border-[#242832] rounded-xl overflow-hidden divide-y divide-[#22252C]">
          {PRICING_TIERS.map((tier) => {
            const entryText =
              currency === 'ghs'
                ? `GH₵${tier.entryGhs.toLocaleString()}`
                : currency === 'usd'
                ? `$${tier.entryUsd.toLocaleString()}`
                : `GH₵${tier.entryGhs.toLocaleString()} / $${tier.entryUsd.toLocaleString()}`;

            const fullText =
              currency === 'ghs'
                ? `GH₵${tier.fullGhs.toLocaleString()}`
                : currency === 'usd'
                ? `$${tier.fullUsd.toLocaleString()}`
                : `GH₵${tier.fullGhs.toLocaleString()} / $${tier.fullUsd.toLocaleString()}`;

            return (
              <div
                key={tier.slug}
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#171A21] transition-colors"
              >
                <div className="space-y-1 lg:w-[34%]">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <span className="font-mono tabular-nums">{tier.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{tier.category}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{tier.name}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-[48%] text-sm">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">{tier.entryLabel}</p>
                    <p className="font-mono font-medium text-white tabular-nums mt-0.5">
                      {entryText}
                      {tier.isRecurring ? ' / hr' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">{tier.fullLabel}</p>
                    <p className="font-mono font-medium text-white tabular-nums mt-0.5">
                      {fullText}
                      {tier.isRecurring ? ' / mo' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Delivery</p>
                    <p className="font-mono text-[#E5E7EB] tabular-nums mt-0.5">{tier.deliveryWindow}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:w-[18%] lg:justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'service', slug: tier.slug })}
                    className="px-3.5 py-2 text-xs font-medium text-white border border-[#323744] hover:border-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'order', serviceSlug: tier.slug, tierScope: 'entry' })}
                    className="px-3.5 py-2 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Engineering Method Band */}
      <section className="border-y border-[#22252C] bg-[#0D0F12] py-20 lg:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <SmoothReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#22252C]">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#60A5FA]">Engineering Cadence</p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Predictable four-stage delivery from blueprint to launch.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ view: 'process' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inspect Full Process</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </SmoothReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
            {PROCESS_STAGES.map((stage, idx) => (
              <SmoothReveal key={stage.index} delay={idx * 0.06}>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'process' })}
                  className="w-full h-full text-left flex flex-col justify-between gap-5 p-6 rounded-xl border border-[#242832] hover:border-[#60A5FA] bg-[#121418] transition-colors cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span className="font-mono tabular-nums">{stage.index}.</span>
                      <span className="font-mono tabular-nums">{stage.window}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-[#A1A7B3] leading-relaxed">{stage.summary}</p>
                  </div>
                  <p className="text-xs font-medium text-[#E5E7EB] pt-4 border-t border-[#22252C]">
                    {stage.artifact}
                  </p>
                </button>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Hire Sam & Specialist Collaborators Section */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-20 lg:pt-24">
        <SmoothReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#22252C]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#60A5FA]">Hire Talent &amp; Collaborators</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Hire Sam directly—or bring on a full specialist team.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A7B3]">
              Engage Samuel Essuman for solo builds and GenAI systems, or add UI/UX, DevOps, and
              full-stack specialists for multi-track product delivery.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ view: 'hire' })}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Hiring Center</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </SmoothReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {HIRE_ROLES.map((role, idx) => {
            const roleWa = buildWhatsAppHref({
              intent: `Hiring — ${role.title}`,
              serviceName: role.title,
              notes: `Hello Samuel, I want to hire ${role.isLeadFounder ? 'you' : role.title} for an upcoming project.`,
            });
            const roleEmail = buildEmailHref({
              intent: `Hiring — ${role.title}`,
              serviceName: role.title,
              notes: `Hello Samuel, I want to hire ${role.isLeadFounder ? 'you' : role.title} for an upcoming project.`,
            });

            return (
              <SmoothReveal key={role.id} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={STUDIO_SPRING}
                  className={`h-full rounded-xl border p-7 flex flex-col justify-between gap-6 transition-colors ${
                    role.isLeadFounder
                      ? 'bg-[#0D111A] border-[#3B82F6]/50'
                      : 'bg-[#121418] border-[#242832] hover:border-[#60A5FA]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
                      <span className="font-mono tabular-nums text-[#60A5FA]">{role.index}</span>
                      <span>{role.availability}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{role.title}</h3>
                    <p className="text-sm leading-relaxed text-[#A1A7B3]">{role.summary}</p>
                  </div>

                  <div className="pt-5 border-t border-[#22252C] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={roleWa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-white text-[#0A0B0D] hover:bg-[#93C5FD] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hire on WhatsApp</span>
                      </a>
                      <a
                        href={roleEmail}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-[#323744] text-white hover:border-white rounded-md transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Email</span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate({ view: 'hire' })}
                      className="text-xs font-semibold text-[#60A5FA] hover:underline cursor-pointer"
                    >
                      Customize Brief
                    </button>
                  </div>
                </motion.div>
              </SmoothReveal>
            );
          })}
        </div>
      </section>

      {/* 9. Direct Consultation & Commission CTA */}
      <section className="max-w-[1360px] mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <SmoothReveal className="bg-[#121418] border border-[#242832] text-white rounded-2xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-medium text-[#60A5FA]">Start a Build</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to ship your website, full-stack app, or GenAI agent?
            </h2>
            <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed max-w-xl">
              Reach out directly by phone, pre-filled WhatsApp, or email, or build an itemized project
              brief in under two minutes with transparent GH₵ and USD estimates.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate({ view: 'order' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
              >
                <span>Open Order Configurator</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ view: 'contact' })}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors cursor-pointer"
              >
                <span>Contact Details</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0D0F12] border border-[#242832] rounded-xl p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs text-[#9CA3AF]">Call &amp; WhatsApp Lines</p>
              <div className="mt-2 space-y-2">
                <a
                  href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                  className="flex items-center justify-between text-sm font-mono text-white hover:text-[#60A5FA] transition-colors tabular-nums"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                    {STUDIO_CONTACT.primaryPhone}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">Call</span>
                </a>
                <a
                  href={buildWhatsAppHref({ intent: 'New Software or GenAI Project Inquiry' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm font-mono text-white hover:text-[#60A5FA] transition-colors tabular-nums"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                    {STUDIO_CONTACT.secondaryPhone}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">WhatsApp (Pre-filled)</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#22252C]">
              <p className="text-xs text-[#9CA3AF]">Studio Email</p>
              <div className="mt-2 space-y-2 text-sm">
                <a
                  href={buildEmailHref(
                    { intent: 'New Software or GenAI Project Inquiry' },
                    STUDIO_CONTACT.primaryEmail
                  )}
                  className="flex items-center gap-2 text-white hover:text-[#60A5FA] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span>{STUDIO_CONTACT.primaryEmail}</span>
                </a>
                <a
                  href={buildEmailHref(
                    { intent: 'New Software or GenAI Project Inquiry' },
                    STUDIO_CONTACT.secondaryEmail
                  )}
                  className="flex items-center gap-2 text-white hover:text-[#60A5FA] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span>{STUDIO_CONTACT.secondaryEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </SmoothReveal>
      </section>
    </div>
  );
}
