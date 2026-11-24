import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Copy, Mail, MessageSquare, Phone } from 'lucide-react';
import { PRICING_TIERS, STUDIO_CONTACT } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { buildEmailHref, buildWhatsAppHref } from '../utils/contactLinks';
import { STUDIO_EASE } from '../components/MotionPrimitives';

interface OrderPageProps {
  initialServiceSlug?: string;
  initialScope?: 'entry' | 'full';
  onNavigate: NavigateFn;
}

export function OrderPage({ initialServiceSlug, initialScope, onNavigate }: OrderPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialServiceSlug && PRICING_TIERS.some((t) => t.slug === initialServiceSlug)
      ? initialServiceSlug
      : PRICING_TIERS[0].slug
  );
  const [scope, setScope] = useState<'entry' | 'full'>(initialScope || 'entry');
  const [currency, setCurrency] = useState<'ghs' | 'usd'>('ghs');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const selectedTier = PRICING_TIERS.find((t) => t.slug === selectedSlug) ?? PRICING_TIERS[0];
  const priceGhs = scope === 'entry' ? selectedTier.entryGhs : selectedTier.fullGhs;
  const priceUsd = scope === 'entry' ? selectedTier.entryUsd : selectedTier.fullUsd;
  const packageLabel = scope === 'entry' ? selectedTier.entryLabel : selectedTier.fullLabel;
  const deliverables = scope === 'entry' ? selectedTier.entryScopeItems : selectedTier.fullScopeItems;

  const summaryText = [
    `SamTechnologies Project Order Brief`,
    `Service: ${selectedTier.name} (${packageLabel})`,
    `Estimated Investment: GH₵${priceGhs.toLocaleString()} / $${priceUsd.toLocaleString()}${
      selectedTier.isRecurring ? (scope === 'entry' ? ' per hour' : ' per month') : ''
    }`,
    `Delivery Window: ${selectedTier.deliveryWindow}`,
    `Client: ${clientName} | Email: ${clientEmail} | Phone: ${clientPhone || 'N/A'}`,
    `Project Notes: ${notes || 'Standard package scope'}`,
  ].join('\n');

  const orderPrefillParams = {
    intent: 'New Service Order',
    serviceName: selectedTier.name,
    packageLabel,
    priceText: `GH₵${priceGhs.toLocaleString()} / $${priceUsd.toLocaleString()}${
      selectedTier.isRecurring ? (scope === 'entry' ? ' per hour' : ' per month') : ''
    }`,
    deliveryWindow: selectedTier.deliveryWindow,
    clientName: clientName.trim() || undefined,
    clientEmail: clientEmail.trim() || undefined,
    clientPhone: clientPhone.trim() || undefined,
    notes: notes.trim() || undefined,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setError('Please enter your name or company name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setConfirmed(true);

    const whatsappUrl = buildWhatsAppHref(orderPrefillParams);
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    navigator.clipboard?.writeText(summaryText);
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 1800);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10 lg:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={() => onNavigate({ view: 'pricing' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Pricing &amp; Orders</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate({ view: 'service', slug: selectedTier.slug })}
          className="text-xs font-semibold text-[#60A5FA] hover:underline cursor-pointer"
        >
          Inspect {selectedTier.name} Full Specification
        </button>
      </div>

      <div className="pb-10 border-b border-[#22252C] space-y-3">
        <p className="text-xs font-medium text-[#60A5FA]">Order Configuration</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight text-white">
          Commission {selectedTier.name}
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl">
          Customize your selected package below. Dispatch your pre-filled order brief directly via
          WhatsApp or Email, or call {STUDIO_CONTACT.primaryPhone} to begin immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
        {/* Left: Configuration & Client Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#121418] border border-[#242832] rounded-xl p-7 space-y-6">
            <div className="space-y-2">
              <label htmlFor="order-service" className="block text-xs font-medium text-white">
                1. Select Engineering Service
              </label>
              <select
                id="order-service"
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value);
                  setConfirmed(false);
                }}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
              >
                {PRICING_TIERS.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.index}. {t.name} (GH₵{t.entryGhs.toLocaleString()} – GH₵{t.fullGhs.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium text-white">2. Select Scope Tier</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setScope('entry');
                    setConfirmed(false);
                  }}
                  className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                    scope === 'entry'
                      ? 'border-[#3B82F6] bg-[#0D111A]'
                      : 'border-[#242832] bg-[#0D0F12] hover:border-[#4B5563]'
                  }`}
                >
                  <p className="text-xs text-[#9CA3AF]">Entry Package</p>
                  <p className="font-display text-base font-bold text-white mt-1">
                    {selectedTier.entryLabel}
                  </p>
                  <p className="font-mono text-sm font-medium text-[#60A5FA] tabular-nums mt-2">
                    GH₵{selectedTier.entryGhs.toLocaleString()} / ${selectedTier.entryUsd.toLocaleString()}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setScope('full');
                    setConfirmed(false);
                  }}
                  className={`p-4 text-left rounded-lg border transition-colors cursor-pointer ${
                    scope === 'full'
                      ? 'border-[#3B82F6] bg-[#0D111A]'
                      : 'border-[#242832] bg-[#0D0F12] hover:border-[#4B5563]'
                  }`}
                >
                  <p className="text-xs text-[#9CA3AF]">Complete Package</p>
                  <p className="font-display text-base font-bold text-white mt-1">
                    {selectedTier.fullLabel}
                  </p>
                  <p className="font-mono text-sm font-medium text-[#60A5FA] tabular-nums mt-2">
                    GH₵{selectedTier.fullGhs.toLocaleString()} / ${selectedTier.fullUsd.toLocaleString()}
                  </p>
                </button>
              </div>
            </div>

            {!confirmed ? (
              <form onSubmit={handleSubmit} className="space-y-5 pt-4 border-t border-[#22252C]" noValidate>
                <p className="text-xs font-medium text-white">3. Your Contact &amp; Project Brief</p>

                {error && (
                  <div
                    role="alert"
                    className="p-3 text-xs font-medium text-[#FCA5A5] bg-[#450A0A]/60 border border-[#991B1B] rounded-md"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="order-name" className="block text-xs text-[#9CA3AF]">
                      Your Name / Company
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="order-email" className="block text-xs text-[#9CA3AF]">
                      Email Address
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="order-phone" className="block text-xs text-[#9CA3AF]">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="050..."
                      className="w-full px-4 py-2.5 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="block text-xs text-[#9CA3AF]">Preferred Billing Currency</span>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-[#0A0B0D] border border-[#2A2E38] rounded-md">
                      <button
                        type="button"
                        onClick={() => setCurrency('ghs')}
                        className={`py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                          currency === 'ghs' ? 'bg-[#2563EB] text-white' : 'text-[#9CA3AF]'
                        }`}
                      >
                        GH₵ (Cedis)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('usd')}
                        className={`py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                          currency === 'usd' ? 'bg-[#2563EB] text-white' : 'text-[#9CA3AF]'
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="order-notes" className="block text-xs text-[#9CA3AF]">
                    Requirements &amp; Reference Notes
                  </label>
                  <textarea
                    id="order-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe key features, target users, or reference one of the live SamTechnologies projects..."
                    className="w-full px-4 py-2.5 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
                >
                  Generate Order Summary &amp; Open WhatsApp
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: STUDIO_EASE }}
                className="pt-4 border-t border-[#22252C] space-y-5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#60A5FA]">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Order Specification Ready — Redirected to WhatsApp ({STUDIO_CONTACT.secondaryPhone})</span>
                </div>

                <pre className="p-4 bg-[#0D0F12] border border-[#242832] rounded-lg text-xs font-mono text-[#E5E7EB] whitespace-pre-wrap leading-relaxed">
                  {summaryText}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppHref(orderPrefillParams)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp ({STUDIO_CONTACT.secondaryPhone})</span>
                  </a>

                  <a
                    href={buildEmailHref(orderPrefillParams, STUDIO_CONTACT.primaryEmail)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email Order to {STUDIO_CONTACT.primaryEmail}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors cursor-pointer"
                  >
                    {copiedSummary ? <Check className="w-4 h-4 text-[#60A5FA]" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSummary ? 'Copied' : 'Copy Brief'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className="px-3 py-3 text-xs font-medium text-[#9CA3AF] hover:text-white cursor-pointer"
                  >
                    Edit Details
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Live Order Ledger Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-[#0D111A] border border-[#3B82F6]/45 text-white rounded-xl p-7 sm:p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-[#93C5FD]">Selected Package</p>
              <h2 className="font-display text-2xl font-bold text-white">{selectedTier.name}</h2>
              <p className="text-sm text-[#C2C6CE]">{packageLabel}</p>
            </div>

            <div className="py-5 border-y border-[#222B3E] space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-[#9CA3AF]">Selected Estimate</span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {currency === 'ghs'
                    ? `GH₵${priceGhs.toLocaleString()}`
                    : `$${priceUsd.toLocaleString()} USD`}
                  {selectedTier.isRecurring ? (scope === 'entry' ? ' / hr' : ' / mo') : ''}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-[#9CA3AF]">Equivalent</span>
                <span className="font-mono text-xs text-[#93C5FD] tabular-nums">
                  GH₵{priceGhs.toLocaleString()} / ${priceUsd.toLocaleString()} USD
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-[#9CA3AF]">Delivery Window</span>
                <span className="font-mono text-xs text-white tabular-nums">
                  {selectedTier.deliveryWindow}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-[#9CA3AF]">Included in This Package</p>
              <ul className="space-y-2.5">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[#E5E7EB] leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#222B3E] space-y-3 text-xs text-[#C2C6CE]">
              <p className="text-[#9CA3AF]">Quick Pre-Filled Dispatch</p>
              <div className="flex flex-col gap-2">
                <a
                  href={buildWhatsAppHref(orderPrefillParams)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp This Order ({STUDIO_CONTACT.secondaryPhone})</span>
                </a>
                <a
                  href={buildEmailHref(orderPrefillParams, STUDIO_CONTACT.primaryEmail)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Email This Order</span>
                </a>
                <a
                  href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-1.5 pt-1 text-white hover:text-[#93C5FD] font-mono tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                  <span>Call: {STUDIO_CONTACT.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
