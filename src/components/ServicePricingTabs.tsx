import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Clock } from 'lucide-react';
import { PRICING_TIERS, STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { STUDIO_EASE } from './MotionPrimitives';

interface ServicePricingTabsProps {
  onNavigate: NavigateFn;
  currencyMode?: 'both' | 'ghs' | 'usd';
}

export function ServicePricingTabs({
  onNavigate,
  currencyMode = 'both',
}: ServicePricingTabsProps) {
  const [activeSlug, setActiveSlug] = useState<string>(PRICING_TIERS[0].slug);

  const activeTier = PRICING_TIERS.find((t) => t.slug === activeSlug) ?? PRICING_TIERS[0];
  const refProject = activeTier.referenceProjectSlug
    ? STUDIO_PROJECTS.find((p) => p.slug === activeTier.referenceProjectSlug)
    : undefined;

  const formatPrice = (ghs: number, usd: number) => {
    if (currencyMode === 'ghs') return `GH₵${ghs.toLocaleString()}`;
    if (currencyMode === 'usd') return `$${usd.toLocaleString()}`;
    return `GH₵${ghs.toLocaleString()} / $${usd.toLocaleString()}`;
  };

  return (
    <div className="bg-[#121418] border border-[#242832] rounded-xl overflow-hidden">
      {/* Horizontal 9-Service Interactive Tab Bar */}
      <div
        role="tablist"
        aria-label="Service Categories"
        className="flex items-center gap-1.5 p-2.5 bg-[#0D0F12] border-b border-[#242832] overflow-x-auto"
      >
        {PRICING_TIERS.map((tier) => {
          const isActive = tier.slug === activeSlug;
          return (
            <button
              key={tier.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlug(tier.slug)}
              className={`relative px-3.5 py-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
                isActive ? 'text-white' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-category-active-tab"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 bg-[#2563EB] rounded-md"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="font-mono text-[11px] opacity-80 tabular-nums">{tier.index}</span>
                <span>{tier.name}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Tab Panel */}
      <div className="p-6 sm:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.slug}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: STUDIO_EASE }}
            className="space-y-8"
          >
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#242832]">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                  <span className="font-mono tabular-nums">{activeTier.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTier.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[#60A5FA] tabular-nums">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    Delivery: {activeTier.deliveryWindow}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {activeTier.name}
                </h3>

                <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed">
                  {activeTier.overview}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'service', slug: activeTier.slug })}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Open {activeTier.name} Page</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Two Tiers Comparison inside the Selected Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entry Tier */}
              <div className="p-6 sm:p-7 rounded-xl border border-[#272B35] bg-[#16191F] flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[#272B35]">
                    <div>
                      <p className="text-xs text-[#9CA3AF]">Starting Tier</p>
                      <h4 className="font-display text-xl font-bold text-white mt-0.5">
                        {activeTier.entryLabel}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {formatPrice(activeTier.entryGhs, activeTier.entryUsd)}
                        {activeTier.isRecurring ? ' / hr' : ''}
                      </p>
                      <p className="font-mono text-xs text-[#9CA3AF] tabular-nums mt-0.5">
                        {activeTier.deliveryWindow}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {activeTier.entryScopeItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#E5E7EB]">
                        <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({
                        view: 'order',
                        serviceSlug: activeTier.slug,
                        tierScope: 'entry',
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Order {activeTier.entryLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'service', slug: activeTier.slug })}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-transparent border border-[#353A46] hover:border-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Full Specs
                  </button>
                </div>
              </div>

              {/* Complete System Tier */}
              <div className="p-6 sm:p-7 rounded-xl border border-[#3B82F6]/45 bg-[#0D111A] text-white flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[#222B3E]">
                    <div>
                      <p className="text-xs text-[#93C5FD]">Complete System Tier</p>
                      <h4 className="font-display text-xl font-bold text-white mt-0.5">
                        {activeTier.fullLabel}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {formatPrice(activeTier.fullGhs, activeTier.fullUsd)}
                        {activeTier.isRecurring ? ' / mo' : ''}
                      </p>
                      <p className="font-mono text-xs text-[#93C5FD] tabular-nums mt-0.5">
                        {activeTier.deliveryWindow}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {activeTier.fullScopeItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#E5E7EB]">
                        <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({
                        view: 'order',
                        serviceSlug: activeTier.slug,
                        tierScope: 'full',
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Order {activeTier.fullLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'service', slug: activeTier.slug })}
                    className="px-4 py-2.5 text-xs font-semibold text-white border border-[#2C374F] hover:border-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Full Specs
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Metadata Row inside Tab */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9CA3AF]">
              <p>
                Ideal for: <span className="text-white font-medium">{activeTier.idealFor}</span>
              </p>

              {refProject && (
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'project', slug: refProject.slug })}
                    className="font-semibold text-[#60A5FA] hover:underline cursor-pointer"
                  >
                    See Reference Build: {refProject.title}
                  </button>
                  <a
                    href={refProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${refProject.title} live website`}
                    className="text-[#9CA3AF] hover:text-white"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
