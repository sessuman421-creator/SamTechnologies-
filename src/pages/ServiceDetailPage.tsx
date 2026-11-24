import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PRICING_TIERS, STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmoothReveal } from '../components/MotionPrimitives';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: NavigateFn;
}

export function ServiceDetailPage({ slug, onNavigate }: ServiceDetailPageProps) {
  const service = PRICING_TIERS.find((t) => t.slug === slug) ?? PRICING_TIERS[0];
  const refProject = service.referenceProjectSlug
    ? STUDIO_PROJECTS.find((p) => p.slug === service.referenceProjectSlug)
    : undefined;

  const otherServices = PRICING_TIERS.filter((t) => t.slug !== service.slug).slice(0, 3);

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10 lg:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={() => onNavigate({ view: 'services' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Services</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate({ view: 'pricing' })}
          className="text-xs font-semibold text-[#60A5FA] hover:underline cursor-pointer"
        >
          Compare All 9 Pricing Tiers
        </button>
      </div>

      {/* Header */}
      <div className="pb-12 border-b border-[#22252C] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <span className="font-mono tabular-nums">{service.index}</span>
            <span aria-hidden="true">·</span>
            <span>{service.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#60A5FA]">{service.deliveryWindow}</span>
          </div>

          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-[#A1A7B3] leading-relaxed max-w-2xl">
            {service.overview}
          </p>
        </div>

        <div className="lg:col-span-4 bg-[#121418] border border-[#242832] rounded-xl p-6 space-y-2">
          <p className="text-xs text-[#9CA3AF]">Best Suited For</p>
          <p className="text-sm font-medium text-white leading-relaxed">{service.idealFor}</p>
        </div>
      </div>

      {/* Side-by-Side Scope Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-14 border-b border-[#22252C]">
        {/* Entry Scope Card */}
        <SmoothReveal className="bg-[#121418] border border-[#242832] rounded-xl p-8 flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-[#22252C]">
              <div>
                <p className="text-xs text-[#9CA3AF]">Entry Package</p>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {service.entryLabel}
                </h2>
              </div>
              <div className="text-right">
                <p className="font-mono text-2xl font-bold text-white tabular-nums">
                  GH₵{service.entryGhs.toLocaleString()}
                </p>
                <p className="font-mono text-sm text-[#9CA3AF] tabular-nums">
                  ${service.entryUsd.toLocaleString()} USD{service.isRecurring ? ' / hour' : ''}
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {service.entryScopeItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#E5E7EB]">
                  <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onNavigate({ view: 'order', serviceSlug: service.slug, tierScope: 'entry' })}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
          >
            <span>Order {service.entryLabel}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </SmoothReveal>

        {/* Full System Scope Card */}
        <SmoothReveal delay={0.06} className="bg-[#0D111A] border border-[#3B82F6]/45 text-white rounded-xl p-8 flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-[#222B3E]">
              <div>
                <p className="text-xs text-[#93C5FD]">Complete Package</p>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {service.fullLabel}
                </h2>
              </div>
              <div className="text-right">
                <p className="font-mono text-2xl font-bold text-white tabular-nums">
                  GH₵{service.fullGhs.toLocaleString()}
                </p>
                <p className="font-mono text-sm text-[#93C5FD] tabular-nums">
                  ${service.fullUsd.toLocaleString()} USD{service.isRecurring ? ' / month' : ''}
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {service.fullScopeItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#E5E7EB]">
                  <Check className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onNavigate({ view: 'order', serviceSlug: service.slug, tierScope: 'full' })}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors cursor-pointer"
          >
            <span>Order {service.fullLabel}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </SmoothReveal>
      </div>

      {/* Live Proof Reference */}
      {refProject && (
        <SmoothReveal className="py-12 border-b border-[#22252C]">
          <div className="bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-[#60A5FA]">Live Proof System</p>
              <h3 className="font-display text-2xl font-bold text-white">{refProject.title}</h3>
              <p className="text-sm text-[#A1A7B3] leading-relaxed">{refProject.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate({ view: 'project', slug: refProject.slug })}
                className="px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
              >
                Read Case Study
              </button>
              <a
                href={refProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors"
              >
                <span>Open Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </SmoothReveal>
      )}

      {/* Other Services */}
      <div className="pt-12">
        <h3 className="font-display text-xl font-bold text-white mb-5">Related Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherServices.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onNavigate({ view: 'service', slug: item.slug })}
              className="text-left p-6 bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl transition-colors cursor-pointer group"
            >
              <p className="text-xs text-[#9CA3AF] font-mono tabular-nums">
                {item.index} · {item.deliveryWindow}
              </p>
              <p className="font-display text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors mt-1.5">
                {item.name}
              </p>
              <p className="font-mono text-xs text-[#9CA3AF] tabular-nums mt-2">
                GH₵{item.entryGhs.toLocaleString()} – GH₵{item.fullGhs.toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
