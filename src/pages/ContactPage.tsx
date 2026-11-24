import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Copy, Mail, MessageSquare, Phone } from 'lucide-react';
import { STUDIO_CONTACT } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { buildEmailHref, buildWhatsAppHref } from '../utils/contactLinks';
import { SmoothReveal, STUDIO_EASE } from '../components/MotionPrimitives';

interface ContactPageProps {
  onNavigate: NavigateFn;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Software / GenAI Project Inquiry');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!name.trim()) {
      setFormError('Please enter your name or organization.');
      return;
    }
    if (!emailValid) {
      setFormError('Please enter a valid email address so we can reply.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setFormError('Please include a brief summary of what you want to build (at least 10 characters).');
      return;
    }

    setFormError('');
    setSubmitted(true);
  };

  const inquiryParams = {
    intent: subject,
    clientName: name.trim() || undefined,
    clientEmail: email.trim() || undefined,
    clientPhone: phone.trim() || undefined,
    notes: message.trim() || undefined,
  };

  const mailtoHref = buildEmailHref(inquiryParams, STUDIO_CONTACT.primaryEmail);
  const whatsappHref = buildWhatsAppHref(inquiryParams);

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      <div className="space-y-4 pb-10 border-b border-[#22252C]">
        <p className="text-xs font-medium text-[#60A5FA]">Direct Contact</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white max-w-3xl">
          Reach Samuel Essuman at SamTechnologies.
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Call directly for immediate project discussions, send a pre-filled WhatsApp message or email,
          or compose a structured inquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12">
        {/* Direct Phone & Email Channels */}
        <div className="lg:col-span-5 space-y-6">
          <SmoothReveal>
            <div className="bg-[#121418] border border-[#242832] rounded-xl p-7 space-y-6">
              <div>
                <p className="text-xs font-medium text-[#9CA3AF]">Phone &amp; WhatsApp</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 p-4 bg-[#0D0F12] border border-[#242832] rounded-lg">
                    <a
                      href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                      className="flex items-center gap-3 text-base font-mono font-semibold text-white hover:text-[#60A5FA] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                      <span>{STUDIO_CONTACT.primaryPhone}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#9CA3AF]">Phone (Call)</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('p1', STUDIO_CONTACT.primaryPhone)}
                        aria-label="Copy primary phone number"
                        className="p-1.5 text-[#9CA3AF] hover:text-white rounded transition-colors cursor-pointer"
                      >
                        {copiedKey === 'p1' ? (
                          <Check className="w-4 h-4 text-[#60A5FA]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-4 bg-[#0D0F12] border border-[#242832] rounded-lg">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-base font-mono font-semibold text-white hover:text-[#60A5FA] transition-colors tabular-nums"
                    >
                      <MessageSquare className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                      <span>{STUDIO_CONTACT.secondaryPhone}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#9CA3AF]">WhatsApp (Pre-filled)</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('p2', STUDIO_CONTACT.secondaryPhone)}
                        aria-label="Copy WhatsApp number"
                        className="p-1.5 text-[#9CA3AF] hover:text-white rounded transition-colors cursor-pointer"
                      >
                        {copiedKey === 'p2' ? (
                          <Check className="w-4 h-4 text-[#60A5FA]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#22252C]">
                <p className="text-xs font-medium text-[#9CA3AF]">Email Addresses</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 p-4 bg-[#0D0F12] border border-[#242832] rounded-lg">
                    <a
                      href={buildEmailHref(inquiryParams, STUDIO_CONTACT.primaryEmail)}
                      className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#60A5FA] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                      <span>{STUDIO_CONTACT.primaryEmail}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('e1', STUDIO_CONTACT.primaryEmail)}
                      aria-label="Copy primary email"
                      className="p-1.5 text-[#9CA3AF] hover:text-white rounded transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedKey === 'e1' ? (
                        <Check className="w-4 h-4 text-[#60A5FA]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-4 bg-[#0D0F12] border border-[#242832] rounded-lg">
                    <a
                      href={buildEmailHref(inquiryParams, STUDIO_CONTACT.secondaryEmail)}
                      className="flex items-center gap-3 text-sm font-medium text-white hover:text-[#60A5FA] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                      <span>{STUDIO_CONTACT.secondaryEmail}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('e2', STUDIO_CONTACT.secondaryEmail)}
                      aria-label="Copy secondary email"
                      className="p-1.5 text-[#9CA3AF] hover:text-white rounded transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedKey === 'e2' ? (
                        <Check className="w-4 h-4 text-[#60A5FA]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#22252C] flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Looking for itemized pricing?</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Configure a formal order brief
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'pricing' })}
                  className="px-4 py-2 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Pricing
                </button>
              </div>
            </div>
          </SmoothReveal>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <SmoothReveal delay={0.05}>
            <div className="bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl font-bold text-white">
                      Send a Direct Inquiry
                    </h2>
                    <p className="text-sm text-[#9CA3AF]">
                      Describe your timeline, goals, or technical questions.
                    </p>
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="p-3.5 text-xs font-medium text-[#FCA5A5] bg-[#450A0A]/60 border border-[#991B1B] rounded-md"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#E5E7EB]">
                        Full Name or Organization
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Kwame Mensah / Studio Co."
                        className="w-full px-4 py-3 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#E5E7EB]">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[#E5E7EB]">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="050..."
                        className="w-full px-4 py-3 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="block text-xs font-medium text-[#E5E7EB]">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 text-sm text-white bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                      >
                        <option>Software / GenAI Project Inquiry</option>
                        <option>Learning Platform (Like LearnTech Academy)</option>
                        <option>AI Coding Agent / RAG System</option>
                        <option>Tutoring &amp; Mentorship Classes</option>
                        <option>General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[#E5E7EB]">
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share what you are building, desired launch timeline, and preferred currency (GH₵ or USD)..."
                      className="w-full px-4 py-3 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors resize-y"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
                  >
                    <span>Prepare Message</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: STUDIO_EASE }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#60A5FA]">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Inquiry Formatted &amp; Ready to Send</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-white">
                    Choose how to dispatch your message to Samuel Essuman
                  </h2>

                  <div className="p-5 bg-[#0D0F12] border border-[#242832] rounded-lg text-sm text-[#E5E7EB] space-y-1.5">
                    <p>
                      <span className="text-[#9CA3AF]">From:</span> {name} ({email})
                    </p>
                    <p>
                      <span className="text-[#9CA3AF]">Topic:</span> {subject}
                    </p>
                    <p className="pt-2 text-[#A1A7B3] whitespace-pre-line">{message}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>Send via WhatsApp ({STUDIO_CONTACT.secondaryPhone})</span>
                    </a>

                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Open in Email App ({STUDIO_CONTACT.primaryEmail})</span>
                    </a>

                    <a
                      href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white border border-[#323744] hover:border-white rounded-md transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Call {STUDIO_CONTACT.primaryPhone}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-3 text-xs font-medium text-[#9CA3AF] hover:text-white cursor-pointer"
                    >
                      Edit Message
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </SmoothReveal>
        </div>
      </div>
    </div>
  );
}
