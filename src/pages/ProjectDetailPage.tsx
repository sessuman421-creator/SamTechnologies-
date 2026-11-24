import { motion } from 'motion/react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  Server,
  Terminal,
  Wind,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { PRICING_TIERS, STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmartImage } from '../components/SmartImage';
import { SmoothReveal, STUDIO_EASE, STUDIO_SPRING } from '../components/MotionPrimitives';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: NavigateFn;
}

interface TechBadgeMeta {
  icon: LucideIcon;
  layer: string;
  note: string;
}

function getTechBadgeMeta(tech: string): TechBadgeMeta {
  const key = tech.toLowerCase();
  if (key.includes('typescript')) {
    return { icon: Code2, layer: 'Language', note: 'End-to-end strict type safety' };
  }
  if (key.includes('react')) {
    return { icon: Boxes, layer: 'UI Framework', note: 'Modular component architecture' };
  }
  if (key.includes('tailwind')) {
    return { icon: Wind, layer: 'Styling Engine', note: 'Utility-first responsive tokens' };
  }
  if (key.includes('motion')) {
    return { icon: Activity, layer: 'Animation', note: 'GPU-composited transitions' };
  }
  if (key.includes('database')) {
    return { icon: Database, layer: 'Persistence', note: 'Structured relational storage' };
  }
  if (key.includes('api') && !key.includes('genai')) {
    return { icon: Server, layer: 'Backend Layer', note: 'Typed endpoint contracts' };
  }
  if (key.includes('genai') || key.includes('llm')) {
    return { icon: BrainCircuit, layer: 'GenAI Core', note: 'Context-grounded model pipeline' };
  }
  if (key.includes('prompt')) {
    return { icon: Terminal, layer: 'Prompt System', note: 'Deterministic instruction rules' };
  }
  if (key.includes('agent')) {
    return { icon: Bot, layer: 'Agent Engine', note: 'Multi-step autonomous workflow' };
  }
  if (key.includes('artifact')) {
    return { icon: FileCode2, layer: 'Output Engine', note: 'Structured file extraction' };
  }
  if (key.includes('streaming')) {
    return { icon: Workflow, layer: 'Real-Time UI', note: 'Low-latency token streaming' };
  }
  if (key.includes('market') || key.includes('tabular')) {
    return { icon: Layers, layer: 'Data Interface', note: 'High-clarity numerical layout' };
  }
  if (key.includes('netlify')) {
    return { icon: Globe, layer: 'Edge Hosting', note: 'Global CDN & edge runtime' };
  }
  return { icon: Cpu, layer: 'System Layer', note: 'Production infrastructure' };
}

export function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const currentIndex = STUDIO_PROJECTS.findIndex((p) => p.slug === slug);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const project = STUDIO_PROJECTS[safeIndex];
  const prevProject =
    STUDIO_PROJECTS[(safeIndex - 1 + STUDIO_PROJECTS.length) % STUDIO_PROJECTS.length];
  const nextProject = STUDIO_PROJECTS[(safeIndex + 1) % STUDIO_PROJECTS.length];
  const relatedTier =
    PRICING_TIERS.find((t) => t.slug === project.relatedServiceSlug) ?? PRICING_TIERS[2];

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10 lg:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.button
          type="button"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={STUDIO_SPRING}
          onClick={() => onNavigate({ view: 'work' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Portfolio Archive</span>
        </motion.button>

        <span className="font-mono text-xs text-[#9CA3AF] tabular-nums">
          Project {project.index} / 0{STUDIO_PROJECTS.length}
        </span>
      </div>

      {/* Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#22252C] items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
              <span className="font-mono tabular-nums">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#60A5FA]">{project.domainLabel}</span>
            </div>

            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#A1A7B3] leading-relaxed">{project.summary}</p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#22252C]">
              <div>
                <p className="text-xs text-[#9CA3AF]">Engineering Role</p>
                <p className="text-sm font-medium text-white mt-1">{project.role}</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF]">Delivery Standard</p>
                <p className="text-sm font-medium text-white mt-1">{project.benchmarkMetric}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={STUDIO_SPRING}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors"
              >
                <span>Open Live Deployment</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={STUDIO_SPRING}
                onClick={() =>
                  onNavigate({
                    view: 'order',
                    serviceSlug: relatedTier.slug,
                    tierScope: 'full',
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#121418] border border-[#2D323E] hover:border-white rounded-md transition-colors cursor-pointer"
              >
                <span>Commission Similar System</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: STUDIO_EASE }}
            className="h-full min-h-[300px] lg:min-h-[380px] rounded-xl overflow-hidden border border-[#242832] bg-[#14171D]"
          >
            <SmartImage
              src={project.image}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Challenge & Architecture Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-14 border-b border-[#22252C]">
        <SmoothReveal className="lg:col-span-6 space-y-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            01. Problem &amp; Operational Context
          </h2>
          <p className="text-base text-[#A1A7B3] leading-relaxed">{project.challenge}</p>
        </SmoothReveal>

        <SmoothReveal delay={0.05} className="lg:col-span-6 space-y-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            02. System Architecture &amp; Design
          </h2>
          <p className="text-base text-[#A1A7B3] leading-relaxed">{project.architecture}</p>
        </SmoothReveal>
      </div>

      {/* Dedicated Tech Stack Visual Icon Grid Section */}
      <section className="py-14 border-b border-[#22252C]">
        <SmoothReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#60A5FA]">Languages, Frameworks &amp; AI Layers</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Tech Stack
            </h2>
          </div>
          <p className="text-sm text-[#9CA3AF] max-w-md">
            Specific languages, UI frameworks, model pipelines, and runtime infrastructure powering{' '}
            <span className="text-white font-medium">{project.title}</span>.
          </p>
        </SmoothReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {project.stack.map((tech, idx) => {
            const meta = getTechBadgeMeta(tech);
            const Icon = meta.icon;
            return (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.055, ease: STUDIO_EASE }}
                whileHover={{ y: -3 }}
                className="bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#191D24] border border-[#2A2F3A] flex items-center justify-center text-[#60A5FA]">
                    <Icon className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-medium text-[#9CA3AF]">{meta.layer}</span>
                </div>

                <div>
                  <h3 className="font-mono text-sm font-semibold text-white">{tech}</h3>
                  <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{meta.note}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Core Features + Specific Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-b border-[#22252C]">
        <SmoothReveal className="lg:col-span-6 bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-medium text-[#60A5FA]">Product Capabilities</p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Key Features Built
            </h3>
          </div>
          <ul className="space-y-3.5">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-sm text-[#E5E7EB] leading-relaxed">
                <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </SmoothReveal>

        <SmoothReveal delay={0.05} className="lg:col-span-6 bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-medium text-[#60A5FA]">Engineering Ownership</p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Specific Contributions Made
            </h3>
          </div>
          <ul className="space-y-3.5">
            {project.contributions.map((contrib) => (
              <li key={contrib} className="flex items-start gap-3 text-sm text-[#E5E7EB] leading-relaxed">
                <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{contrib}</span>
              </li>
            ))}
          </ul>
        </SmoothReveal>
      </div>

      {/* System Deliverables & Corresponding Order Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 border-b border-[#22252C]">
        <SmoothReveal className="lg:col-span-7 bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#60A5FA]">Shipped Output</p>
            <h3 className="font-display text-xl font-bold text-white">
              System Deliverables
            </h3>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 p-4 bg-[#171A20] border border-[#272B35] rounded-lg text-xs text-[#E5E7EB] leading-relaxed"
              >
                <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SmoothReveal>

        <SmoothReveal
          delay={0.06}
          className="lg:col-span-5 bg-[#0D111A] border border-[#3B82F6]/45 text-white rounded-xl p-7 sm:p-8 flex flex-col justify-between gap-6"
        >
          <div className="space-y-3">
            <p className="text-xs font-medium text-[#93C5FD]">Build This For Your Organization</p>
            <h3 className="font-display text-2xl font-bold text-white">{relatedTier.name}</h3>
            <p className="text-sm text-[#C2C6CE] leading-relaxed">{relatedTier.overview}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#222B3E]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs text-[#9CA3AF]">Price Range</span>
              <span className="font-mono text-sm font-medium text-white tabular-nums">
                GH₵{relatedTier.entryGhs.toLocaleString()} – GH₵{relatedTier.fullGhs.toLocaleString()} / $
                {relatedTier.entryUsd} – ${relatedTier.fullUsd}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs text-[#9CA3AF]">Typical Delivery</span>
              <span className="font-mono text-sm text-[#93C5FD] tabular-nums">
                {relatedTier.deliveryWindow}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={STUDIO_SPRING}
                onClick={() => onNavigate({ view: 'order', serviceSlug: relatedTier.slug, tierScope: 'full' })}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Order This Build</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
              <button
                type="button"
                onClick={() => onNavigate({ view: 'service', slug: relatedTier.slug })}
                className="px-4 py-3 text-xs font-semibold text-white border border-[#2C374F] hover:border-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Full Tier Info
              </button>
            </div>
          </div>
        </SmoothReveal>
      </div>

      {/* Sequential Next / Previous Project Navigation */}
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.99 }}
          transition={STUDIO_SPRING}
          onClick={() => onNavigate({ view: 'project', slug: prevProject.slug })}
          className="text-left p-6 bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl transition-colors cursor-pointer group"
        >
          <p className="text-xs text-[#9CA3AF] inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Previous Project</span>
          </p>
          <p className="font-display text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors mt-1.5">
            {prevProject.index}. {prevProject.title}
          </p>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.99 }}
          transition={STUDIO_SPRING}
          onClick={() => onNavigate({ view: 'project', slug: nextProject.slug })}
          className="text-left sm:text-right p-6 bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl transition-colors cursor-pointer group"
        >
          <p className="text-xs text-[#9CA3AF] inline-flex items-center sm:justify-end gap-1.5 w-full">
            <span>Next Project</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </p>
          <p className="font-display text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors mt-1.5">
            {nextProject.index}. {nextProject.title}
          </p>
        </motion.button>
      </div>
    </div>
  );
}
