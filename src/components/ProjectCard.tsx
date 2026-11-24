import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { StudioProject } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmartImage } from './SmartImage';
import { STUDIO_EASE } from './MotionPrimitives';

interface ProjectCardProps {
  project: StudioProject;
  onNavigate: NavigateFn;
  featured?: boolean;
}

const VARIANT_STYLES: Record<
  StudioProject['cardVariant'],
  {
    surface: string;
    border: string;
    title: string;
    muted: string;
    body: string;
    divider: string;
    indexAccent: string;
    primaryBtn: string;
    secondaryBtn: string;
  }
> = {
  obsidian: {
    surface: 'bg-[#121418]',
    border: 'border-[#272B35] hover:border-[#60A5FA]',
    title: 'text-white',
    muted: 'text-[#9CA3AF]',
    body: 'text-[#D1D5DB]',
    divider: 'border-[#232730]',
    indexAccent: 'text-[#60A5FA]',
    primaryBtn: 'bg-white text-[#0A0B0D] hover:bg-[#93C5FD]',
    secondaryBtn: 'border-[#333845] text-white hover:border-white',
  },
  alabaster: {
    surface: 'bg-[#161920]',
    border: 'border-[#2D323E] hover:border-[#93C5FD]',
    title: 'text-[#F9FAFB]',
    muted: 'text-[#9CA3AF]',
    body: 'text-[#D1D5DB]',
    divider: 'border-[#282D38]',
    indexAccent: 'text-[#38BDF8]',
    primaryBtn: 'bg-[#2563EB] text-white hover:bg-[#3B82F6]',
    secondaryBtn: 'border-[#383F4E] text-[#F9FAFB] hover:border-white',
  },
  cobalt: {
    surface: 'bg-[#0E1E42]',
    border: 'border-[#1E3A8A] hover:border-[#93C5FD]',
    title: 'text-white',
    muted: 'text-[#BFDBFE]',
    body: 'text-[#DBEAFE]',
    divider: 'border-[#1E3A8A]',
    indexAccent: 'text-[#93C5FD]',
    primaryBtn: 'bg-white text-[#0E1E42] hover:bg-[#DBEAFE]',
    secondaryBtn: 'border-[#3B82F6]/60 text-white hover:border-white',
  },
  slate: {
    surface: 'bg-[#151B24]',
    border: 'border-[#283140] hover:border-[#7DD3FC]',
    title: 'text-[#F8FAFC]',
    muted: 'text-[#94A3B8]',
    body: 'text-[#CBD5E1]',
    divider: 'border-[#283140]',
    indexAccent: 'text-[#38BDF8]',
    primaryBtn: 'bg-[#F8FAFC] text-[#151B24] hover:bg-[#E0F2FE]',
    secondaryBtn: 'border-[#3E495C] text-[#F8FAFC] hover:border-white',
  },
  warmstone: {
    surface: 'bg-[#1A1816]',
    border: 'border-[#332E29] hover:border-[#FBBF24]',
    title: 'text-[#FAF9F6]',
    muted: 'text-[#A8A29E]',
    body: 'text-[#D6D3D1]',
    divider: 'border-[#2E2925]',
    indexAccent: 'text-[#F59E0B]',
    primaryBtn: 'bg-[#FAF9F6] text-[#1A1816] hover:bg-[#FDE68A]',
    secondaryBtn: 'border-[#44403C] text-[#FAF9F6] hover:border-white',
  },
  graphite: {
    surface: 'bg-[#1B1D22]',
    border: 'border-[#30343D] hover:border-white',
    title: 'text-white',
    muted: 'text-[#A1A1AA]',
    body: 'text-[#E4E4E7]',
    divider: 'border-[#2D313A]',
    indexAccent: 'text-[#93C5FD]',
    primaryBtn: 'bg-white text-[#141518] hover:bg-[#DBEAFE]',
    secondaryBtn: 'border-[#4B515F] text-white hover:border-white',
  },
  ink: {
    surface: 'bg-[#10151E]',
    border: 'border-[#242F42] hover:border-[#60A5FA]',
    title: 'text-[#F9FAFB]',
    muted: 'text-[#9CA3AF]',
    body: 'text-[#D1D5DB]',
    divider: 'border-[#202A3B]',
    indexAccent: 'text-[#60A5FA]',
    primaryBtn: 'bg-[#3B82F6] text-white hover:bg-[#60A5FA] hover:text-[#0A0B0D]',
    secondaryBtn: 'border-[#31405A] text-[#F9FAFB] hover:border-white',
  },
};

export function ProjectCard({ project, onNavigate, featured = false }: ProjectCardProps) {
  const theme = VARIANT_STYLES[project.cardVariant];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: STUDIO_EASE }}
      onClick={() => onNavigate({ view: 'project', slug: project.slug })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate({ view: 'project', slug: project.slug });
        }
      }}
      className={`group rounded-xl border overflow-hidden cursor-pointer transition-colors duration-200 flex flex-col ${
        featured ? 'lg:grid lg:grid-cols-12' : 'h-full justify-between'
      } ${theme.surface} ${theme.border}`}
    >
      {/* Visual Image Container */}
      <div
        className={`relative overflow-hidden bg-[#0D0F12] ${
          featured ? 'lg:col-span-6 min-h-[260px] lg:min-h-[380px]' : 'aspect-[16/10]'
        }`}
      >
        <SmartImage
          src={project.image}
          alt={project.imageAlt}
          fallbackTitle={project.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-white/90 truncate">{project.domainLabel}</span>
          <span className="font-mono text-[11px] text-white/80 tabular-nums shrink-0">{project.year}</span>
        </div>
      </div>

      {/* Content Zone */}
      <div
        className={`p-6 sm:p-8 flex flex-col justify-between gap-6 ${
          featured ? 'lg:col-span-6 lg:p-10' : 'flex-1'
        }`}
      >
        <div className="space-y-3.5">
          <div className={`flex items-center justify-between gap-3 text-xs ${theme.muted}`}>
            <div className="flex items-center gap-2">
              <span className={`font-mono font-semibold tabular-nums ${theme.indexAccent}`}>
                {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </div>
            <span className="truncate max-w-[180px] text-right">{project.role.split('·')[0].trim()}</span>
          </div>

          <h3 className={`font-display text-2xl ${featured ? 'sm:text-3xl' : ''} font-bold tracking-tight ${theme.title}`}>
            {project.title}
          </h3>

          <p className={`text-sm ${featured ? 'sm:text-base' : ''} leading-relaxed ${theme.body}`}>
            {project.summary}
          </p>

          {/* Key Feature & Stack Summary */}
          <div className={`pt-3 border-t ${theme.divider} space-y-2`}>
            <p className={`text-xs ${theme.muted}`}>
              Key Feature: <span className={theme.title}>{project.features[0]}</span>
            </p>
            <p className={`text-xs font-mono ${theme.muted}`}>{project.stack.slice(0, 4).join(' · ')}</p>
          </div>
        </div>

        <div className={`pt-4 border-t ${theme.divider} flex flex-wrap items-center justify-between gap-3`}>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${theme.primaryBtn}`}
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border rounded-md transition-colors ${theme.secondaryBtn}`}
          >
            <span>Open Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
