import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { PRICING_TIERS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { SmoothReveal, STUDIO_EASE } from '../components/MotionPrimitives';
import { ServicePricingTabs } from '../components/ServicePricingTabs';

interface PricingOrdersPageProps {
  onNavigate: NavigateFn;
}

const PRICING_CATEGORIES = [
  'All Orders',
  'Software Engineering',
  'GenAI & Agents',
  'Education & Advisory',
] as const;

export function PricingOrdersPage({ onNavigate }: PricingOrdersPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All Orders');
  const [currencyMode, setCurrencyMode] = useState<'both' | 'ghs' | 'usd'>('both');
  const [selectedScopes, setSelectedScopes] = useState<Record<string, 'entry' | 'full'>>({});

  const visibleTiers =
    categoryFilter === 'All Orders'
      ? PRICING_TIERS
      : PRICING_TIERS.filter((t) => t.category === categoryFilter);

  const getScope = (slug: string): 'entry' | 'full' => selectedScopes[slug] || 'entry';

  const formatAmount = (ghs: number, usd: number) => {
    if (currencyMode === 'ghs') return `GH₵${ghs.toLocaleString()}`;
    if (currencyMode === 'usd') return `$${usd.toLocaleString()}`;
    return `GH₵${ghs.toLocaleString()} / $${usd.toLocaleString()}`;
  };

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      {/* Page Header */}
      <div className="space-y-4 pb-10 border-b border-[#22252C]">
        <p className="text-xs font-medium text-[#60A5FA]">Pricing &amp; Orders</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white max-w-3xl">
          Transparent engineering rates and order packages.
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Every project category has clear entry and full-system pricing in Ghana Cedis (GH₵) and
          US Dollars ($), along with fixed delivery windows. Toggle between Entry and Full packages on
          any card, then click Order to open its dedicated order brief page.
        </p>

        {/* Interactive Toolbar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {PRICING_CATEGORIES.map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'text-white'
                      : 'bg-[#121418] text-[#9CA3AF] border border-[#242832] hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-cat-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 bg-[#2563EB] rounded-md"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center p-1 bg-[#121418] border border-[#242832] rounded-lg self-start sm:self-auto">
            {(['both', 'ghs', 'usd'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCurrencyMode(mode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currencyMode === mode
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {mode === 'both' ? 'GH₵ / USD' : mode === 'ghs' ? 'GH₵' : 'USD'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 9-Service Tabbed Explorer */}
      <div className="pt-10">
        <ServicePricingTabs onNavigate={onNavigate} currencyMode={currencyMode} />
      </div>

      {/* Complete 9-Tier Order Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {visibleTiers.map((tier, idx) => {
          const scope = getScope(tier.slug);
          const activePrice =
            scope === 'entry'
              ? formatAmount(tier.entryGhs, tier.entryUsd)
              : formatAmount(tier.fullGhs, tier.fullUsd);
          const activeItems = scope === 'entry' ? tier.entryScopeItems : tier.fullScopeItems;
          const activeLabel = scope === 'entry' ? tier.entryLabel : tier.fullLabel;

          return (
            <SmoothReveal key={tier.slug} delay={idx * 0.035}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18, ease: STUDIO_EASE }}
                className="h-full bg-[#121418] border border-[#242832] hover:border-[#60A5FA] rounded-xl p-7 flex flex-col justify-between gap-6 transition-colors"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
                    <span className="font-mono tabular-nums">{tier.index}</span>
                    <span>{tier.category}</span>
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-bold text-white">{tier.name}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mt-1.5 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                      <span>Delivery: {tier.deliveryWindow}</span>
                    </div>
                  </div>

                  {/* Interactive Entry vs Full Package Selector */}
                  <div className="grid grid-cols-2 gap-1 p-1 bg-[#0D0F12] border border-[#242832] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setSelectedScopes((prev) => ({ ...prev, [tier.slug]: 'entry' }))}
                      className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors truncate cursor-pointer ${
                        scope === 'entry'
                          ? 'bg-[#2563EB] text-white'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                      title={tier.entryLabel}
                    >
                      {tier.entryLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedScopes((prev) => ({ ...prev, [tier.slug]: 'full' }))}
                      className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors truncate cursor-pointer ${
                        scope === 'full'
                          ? 'bg-[#2563EB] text-white'
                          : 'text-[#9CA3AF] hover:text-white'
                      }`}
                      title={tier.fullLabel}
                    >
                      {tier.fullLabel}
                    </button>
                  </div>

                  {/* Active Price Display */}
                  <div className="py-4 border-y border-[#22252C]">
                    <p className="text-xs text-[#9CA3AF]">{activeLabel}</p>
                    <p className="font-mono text-2xl font-bold text-white tabular-nums mt-1">
                      {activePrice}
                      {tier.isRecurring ? (scope === 'entry' ? ' / hr' : ' / mo') : ''}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1.5 font-mono tabular-nums">
                      Range: {formatAmount(tier.entryGhs, tier.entryUsd)} →{' '}
                      {formatAmount(tier.fullGhs, tier.fullUsd)}
                    </p>
                  </div>

                  {/* Included Deliverables */}
                  <ul className="space-y-2.5">
                    {activeItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#E5E7EB] leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#22252C] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ view: 'order', serviceSlug: tier.slug, tierScope: scope })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Place Order</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'service', slug: tier.slug })}
                    className="px-3.5 py-2.5 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Full Info
                  </button>
                </div>
              </motion.article>
            </SmoothReveal>
          );
        })}
      </div>

      {/* Full Tabular Rate Reference Matrix */}
      <SmoothReveal className="mt-16">
        <div className="space-y-2 mb-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Complete Rate Schedule Summary
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Click any row to configure an order for that service.
          </p>
        </div>

        <div className="bg-[#121418] border border-[#242832] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#242832] bg-[#0D0F12] text-xs font-medium text-[#9CA3AF]">
                <th className="py-3.5 px-5">Service</th>
                <th className="py-3.5 px-5">Entry Scope</th>
                <th className="py-3.5 px-5">Full Scope</th>
                <th className="py-3.5 px-5">Delivery Time</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22252C] text-sm">
              {PRICING_TIERS.map((tier) => (
                <tr key={tier.slug} className="hover:bg-[#171A21] transition-colors">
                  <td className="py-4 px-5 font-medium text-white">
                    <span className="font-mono text-xs text-[#9CA3AF] mr-2 tabular-nums">
                      {tier.index}
                    </span>
                    {tier.name}
                  </td>
                  <td className="py-4 px-5 font-mono text-xs text-[#E5E7EB] tabular-nums">
                    {formatAmount(tier.entryGhs, tier.entryUsd)}
                    {tier.isRecurring ? ' / hr' : ''} ({tier.entryLabel})
                  </td>
                  <td className="py-4 px-5 font-mono text-xs text-[#E5E7EB] tabular-nums">
                    {formatAmount(tier.fullGhs, tier.fullUsd)}
                    {tier.isRecurring ? ' / mo' : ''} ({tier.fullLabel})
                  </td>
                  <td className="py-4 px-5 font-mono text-xs text-[#9CA3AF] tabular-nums">
                    {tier.deliveryWindow}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ view: 'order', serviceSlug: tier.slug, tierScope: 'entry' })
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA] hover:underline cursor-pointer"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SmoothReveal>
    </div>
  );
}
