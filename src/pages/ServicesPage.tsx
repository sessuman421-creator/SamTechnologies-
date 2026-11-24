import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { PRICING_TIERS, STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmoothReveal, STUDIO_EASE } from '../components/MotionPrimitives';

interface ServicesPageProps {
  onNavigate: NavigateFn;
}

const SERVICE_CATEGORIES = [
  'All Disciplines',
  'Software Engineering',
  'GenAI & Agents',
  'Education & Advisory',
] as const;

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Disciplines');

  const visibleServices =
    selectedCategory === 'All Disciplines'
      ? PRICING_TIERS
      : PRICING_TIERS.filter((tier) => tier.category === selectedCategory);

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      <div className="space-y-4 pb-10 border-b border-[#22252C]">
        <p className="text-xs font-medium text-[#60A5FA]">Capabilities &amp; Disciplines</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white max-w-3xl">
          Nine specialized engineering and GenAI services.
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Tap any discipline below to open its dedicated specification page with complete deliverables,
          architecture details, delivery windows, and order options.
        </p>

        {/* Animated Category Filter Tabs */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          {SERVICE_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active ? 'text-white' : 'bg-[#121418] text-[#9CA3AF] border border-[#242832] hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="services-filter-bg"
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

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {visibleServices.map((tier, idx) => {
          const refProject = tier.referenceProjectSlug
            ? STUDIO_PROJECTS.find((p) => p.slug === tier.referenceProjectSlug)
            : undefined;

          return (
            <SmoothReveal key={tier.slug} delay={idx * 0.04}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: STUDIO_EASE }}
                className="h-full bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl p-7 flex flex-col justify-between gap-7 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
                    <span className="font-mono tabular-nums">{tier.index}</span>
                    <span>{tier.category}</span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {tier.name}
                  </h2>

                  <p className="text-sm text-[#A1A7B3] leading-relaxed">{tier.headline}</p>

                  <div className="pt-3 border-t border-[#22252C] space-y-2">
                    {tier.entryScopeItems.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-[#E5E7EB]">
                        <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#22252C]">
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-[#9CA3AF]">Range</span>
                    <span className="font-mono font-medium text-white tabular-nums">
                      GH₵{tier.entryGhs.toLocaleString()} – GH₵{tier.fullGhs.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-[#9CA3AF]">Delivery</span>
                    <span className="font-mono text-white tabular-nums">{tier.deliveryWindow}</span>
                  </div>

                  {refProject && (
                    <button
                      type="button"
                      onClick={() => onNavigate({ view: 'project', slug: refProject.slug })}
                      className="text-xs font-medium text-[#60A5FA] hover:underline cursor-pointer block"
                    >
                      Reference Build: {refProject.title}
                    </button>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate({ view: 'service', slug: tier.slug })}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>View Specification</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate({ view: 'order', serviceSlug: tier.slug, tierScope: 'entry' })}
                      className="px-3.5 py-2.5 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </motion.article>
            </SmoothReveal>
          );
        })}
      </div>
    </div>
  );
}
