import { ArrowRight, Check } from 'lucide-react';
import { PROCESS_STAGES, STUDIO_IMAGES } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmartImage } from '../components/SmartImage';
import { SmoothReveal } from '../components/MotionPrimitives';

interface ProcessPageProps {
  onNavigate: NavigateFn;
}

export function ProcessPage({ onNavigate }: ProcessPageProps) {
  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#22252C] items-stretch">
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
          <p className="text-xs font-medium text-[#60A5FA]">Engineering Methodology</p>
          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white">
            How SamTechnologies takes a brief from architecture to production.
          </h1>
          <p className="text-base text-[#A1A7B3] leading-relaxed max-w-2xl">
            Every engagement—whether a 5-day landing page or a 35-day multi-agent AI coding platform—runs
            through four disciplined phases with direct founder engineering, transparent staging builds,
            and clean source ownership.
          </p>
          <div className="pt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ view: 'order' })}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
            >
              <span>Start a Project Brief</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ view: 'pricing' })}
              className="px-5 py-3 text-xs font-semibold text-white bg-[#121418] border border-[#2D323E] hover:border-white rounded-md transition-colors cursor-pointer"
            >
              Review Delivery Timelines
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-[#242832] bg-[#14171D]">
            <SmartImage
              src={STUDIO_IMAGES.founderWorkspace}
              alt="Software architect workstation and technical notebook"
              fallbackTitle="SamTechnologies Engineering"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4 Detailed Phases */}
      <div className="py-14 space-y-6">
        {PROCESS_STAGES.map((stage, idx) => (
          <SmoothReveal key={stage.index} delay={idx * 0.05}>
            <div className="bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-mono tabular-nums">
                  <span>Phase {stage.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#60A5FA] font-medium">{stage.window}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">{stage.title}</h2>
                <p className="text-xs font-medium text-[#9CA3AF] pt-2">
                  Deliverable: <span className="text-white">{stage.artifact}</span>
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <p className="text-base text-[#A1A7B3] leading-relaxed">{stage.summary}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#22252C]">
                  {stage.activities.map((act) => (
                    <li key={act} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5E7EB]">
                      <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SmoothReveal>
        ))}
      </div>

      {/* Standards Banner */}
      <SmoothReveal className="bg-[#0D111A] border border-[#3B82F6]/40 text-white rounded-xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="font-display text-lg font-bold text-white">Direct Founder Execution</h3>
          <p className="text-sm text-[#C2C6CE] leading-relaxed">
            Your system is architected and written directly by Samuel Essuman—never handed off to
            unvetted subcontractors.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-bold text-white">Clean Code Ownership</h3>
          <p className="text-sm text-[#C2C6CE] leading-relaxed">
            Every custom build ships with clean TypeScript modules, environment documentation, and full
            repository ownership upon completion.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-bold text-white">Dual-Currency Transparency</h3>
          <p className="text-sm text-[#C2C6CE] leading-relaxed">
            Fixed-range quotes in both GH₵ and USD with explicit delivery windows agreed upfront.
          </p>
        </div>
      </SmoothReveal>
    </div>
  );
}
