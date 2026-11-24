import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { ProjectCard } from '../components/ProjectCard';
import { STUDIO_EASE } from '../components/MotionPrimitives';

interface WorkPageProps {
  initialCategory?: string;
  onNavigate: NavigateFn;
}

const CATEGORIES = ['All Systems', 'EdTech & Learning', 'GenAI & Agents', 'FinTech & Web Apps'] as const;

export function WorkPage({ initialCategory, onNavigate }: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All Systems');

  const filteredProjects =
    selectedCategory === 'All Systems'
      ? STUDIO_PROJECTS
      : STUDIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      <div className="space-y-4 pb-10 border-b border-[#22252C]">
        <p className="text-xs font-medium text-[#60A5FA]">Portfolio Archive</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white max-w-3xl">
          Seven live software and generative AI systems.
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Each system below has its own dedicated case study elaborating on key features, technologies
          used, and engineering contributions. Tap any card to explore it in depth.
        </p>

        {/* Animated Category Tabs */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'text-white'
                    : 'bg-[#121418] text-[#9CA3AF] border border-[#242832] hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-[#2563EB] rounded-md"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visually Distinct Project Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: STUDIO_EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-12"
        >
          {filteredProjects.map((project, idx) => (
            <div key={project.slug} className={idx === 0 && selectedCategory === 'All Systems' ? 'md:col-span-2' : ''}>
              <ProjectCard
                project={project}
                onNavigate={onNavigate}
                featured={idx === 0 && selectedCategory === 'All Systems'}
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Commission Strip */}
      <div className="mt-16 p-8 sm:p-10 bg-[#121418] border border-[#242832] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Need a similar platform engineered for your organization?
          </h3>
          <p className="text-sm text-[#9CA3AF]">
            Review exact GH₵ and USD pricing across all 9 engineering tiers or start an itemized brief.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate({ view: 'pricing' })}
            className="px-5 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View Pricing &amp; Orders
          </button>
          <button
            type="button"
            onClick={() => onNavigate({ view: 'contact' })}
            className="px-5 py-3 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact Studio
          </button>
        </div>
      </div>
    </div>
  );
}
