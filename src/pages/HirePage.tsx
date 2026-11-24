import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Mail, MessageSquare, Phone, Users } from 'lucide-react';
import { STUDIO_CONTACT } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { buildEmailHref, buildWhatsAppHref } from '../utils/contactLinks';
import { SmoothReveal, STUDIO_SPRING } from '../components/MotionPrimitives';

interface HirePageProps {
  onNavigate: NavigateFn;
}

export interface HireRoleOption {
  id: string;
  index: string;
  title: string;
  availability: string;
  rateLabel: string;
  summary: string;
  capabilities: string[];
  engagementModes: string[];
  isLeadFounder?: boolean;
}

export const HIRE_ROLES: HireRoleOption[] = [
  {
    id: 'hire-sam',
    index: '01',
    title: 'Hire Samuel Essuman (Lead Software & GenAI Engineer)',
    availability: 'Available for Projects, Retainers & Mentorship',
    rateLabel: 'Project-Based (GH₵600 – GH₵15,000) · Mentorship GH₵250/hr',
    summary:
      'Direct engagement with SamTechnologies founder Samuel Essuman for end-to-end web apps, mobile products, learning academies, RAG chatbots, and AI coding agents.',
    capabilities: [
      'Full-Stack Web & Mobile Software Architecture (React, TypeScript, APIs, Databases)',
      'Production GenAI Systems, RAG Pipelines & Multi-Agent Coding Tools',
      'End-to-End Learning Platforms & Technical Mentorship',
    ],
    engagementModes: ['Fixed-Scope Delivery', 'Monthly Retainer', 'Technical Advisory'],
    isLeadFounder: true,
  },
  {
    id: 'hire-fullstack-squad',
    index: '02',
    title: 'Dedicated Full-Stack Engineering Squad',
    availability: 'Scoped Team Deployment',
    rateLabel: 'Custom Squad Scope · 14 to 45 Day Milestones',
    summary:
      'Scale faster with Sam leading a coordinated engineering pod pairing frontend, backend API, and database specialists for larger multi-module platforms.',
    capabilities: [
      'Parallel frontend, backend, and database execution',
      'Enterprise SaaS portals, marketplaces & multi-role dashboards',
      'Weekly staging releases with unified technical oversight',
    ],
    engagementModes: ['Full Product Build', 'Co-Engineering Sprint'],
  },
  {
    id: 'hire-ui-design',
    index: '03',
    title: 'Product & UI/UX Design Collaborator',
    availability: 'Available Alongside Builds or Standalone',
    rateLabel: 'Scoped Interface Systems',
    summary:
      'Bring in a vetted UI/UX design specialist to craft design systems, wireframes, and high-conversion product layouts paired cleanly with SamTechnologies engineering.',
    capabilities: [
      'Design systems, typography hierarchy & responsive prototypes',
      'User journey mapping for web apps, EdTech & mobile products',
      'Direct developer-ready handoff into React & Tailwind CSS',
    ],
    engagementModes: ['Interface Audit', 'Full Product Design'],
  },
  {
    id: 'hire-devops-qa',
    index: '04',
    title: 'Cloud Deployment, DevOps & QA Specialist',
    availability: 'Available for Launch & Scaling',
    rateLabel: 'Infrastructure & Reliability Scope',
    summary:
      'Dedicated cloud infrastructure, CI/CD automation, and end-to-end QA testing specialists to harden mission-critical deployments and high-traffic platforms.',
    capabilities: [
      'CI/CD pipelines, domain SSL, container & cloud hosting setup',
      'Cross-browser, mobile touch & security verification',
      'Performance profiling and uptime monitoring configuration',
    ],
    engagementModes: ['Launch Hardening', 'Ongoing Ops Support'],
  },
];

export function HirePage({ onNavigate }: HirePageProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(HIRE_ROLES[0].id);
  const [needSummary, setNeedSummary] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('Within 2 weeks');

  const activeRole = HIRE_ROLES.find((r) => r.id === selectedRoleId) ?? HIRE_ROLES[0];

  const prefillParams = {
    intent: `Hiring — ${activeRole.title}`,
    serviceName: activeRole.title,
    deliveryWindow: timeline,
    notes:
      needSummary.trim() ||
      `I would like to hire ${activeRole.isLeadFounder ? 'Samuel Essuman' : activeRole.title} for an upcoming build. Please share availability and next steps.`,
  };

  return (
    <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 lg:py-20">
      <div className="space-y-4 pb-10 border-b border-[#22252C]">
        <p className="text-xs font-medium text-[#60A5FA]">Hire Talent &amp; Specialists</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white max-w-3xl">
          Hire Sam directly or engage a coordinated engineering team.
        </h1>
        <p className="text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
          Select who you want to hire below and customize what you need. Tapping WhatsApp or Email
          opens your chat or inbox automatically pre-filled with your exact hiring brief.
        </p>
      </div>

      {/* Role Cards + Live Pre-Filled Quick Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
        <div className="lg:col-span-7 space-y-5">
          {HIRE_ROLES.map((role, idx) => {
            const isSelected = role.id === selectedRoleId;
            const roleWhatsApp = buildWhatsAppHref({
              intent: `Hiring — ${role.title}`,
              serviceName: role.title,
              deliveryWindow: timeline,
              notes: needSummary.trim() || `Interested in hiring for: ${role.title}.`,
            });
            const roleEmail = buildEmailHref({
              intent: `Hiring — ${role.title}`,
              serviceName: role.title,
              deliveryWindow: timeline,
              notes: needSummary.trim() || `Interested in hiring for: ${role.title}.`,
            });

            return (
              <SmoothReveal key={role.id} delay={idx * 0.04}>
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={STUDIO_SPRING}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`rounded-xl border p-7 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D111A] text-white border-[#3B82F6]'
                      : 'bg-[#121418] text-white border-[#242832] hover:border-[#60A5FA]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-[#60A5FA]">{role.index}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#9CA3AF]">{role.availability}</span>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-[#93C5FD]">
                      {role.engagementModes.join(' · ')}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold mt-3 text-white">
                    {role.title}
                  </h2>

                  <p className="text-sm leading-relaxed mt-2.5 text-[#A1A7B3]">{role.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {role.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5 text-xs text-[#E5E7EB]">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#60A5FA]" aria-hidden="true" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-[#22252C] flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs tabular-nums text-[#9CA3AF]">
                      {role.rateLabel}
                    </span>

                    <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={roleWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-white text-[#0A0B0D] hover:bg-[#93C5FD] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hire on WhatsApp</span>
                      </a>
                      <a
                        href={roleEmail}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-[#323744] text-white hover:border-white rounded-md transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              </SmoothReveal>
            );
          })}
        </div>

        {/* Sticky Pre-Filled Hiring Dispatch Composer */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-[#121418] border border-[#242832] rounded-xl p-7 sm:p-8 space-y-6">
            <div className="space-y-1.5 pb-5 border-b border-[#22252C]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#60A5FA]">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Pre-Filled Hiring Brief</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white">{activeRole.title}</h2>
              <p className="text-xs text-[#9CA3AF]">
                Customize what you need below—your message is automatically pre-filled into WhatsApp or
                Email when you tap send.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="hire-timeline" className="block text-xs font-medium text-[#E5E7EB]">
                  Target Start Window
                </label>
                <select
                  id="hire-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors"
                >
                  <option>Immediately (This Week)</option>
                  <option>Within 2 weeks</option>
                  <option>Next Month</option>
                  <option>Ongoing Monthly Retainer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="hire-notes" className="block text-xs font-medium text-[#E5E7EB]">
                  What Do You Need Built or Handled?
                </label>
                <textarea
                  id="hire-notes"
                  rows={4}
                  value={needSummary}
                  onChange={(e) => setNeedSummary(e.target.value)}
                  placeholder="Describe your product, required skills, team size, or project goals..."
                  className="w-full px-3.5 py-2.5 text-sm text-white placeholder-[#6B7280] bg-[#0A0B0D] border border-[#2A2E38] focus:border-[#3B82F6] rounded-md outline-none transition-colors resize-y"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={STUDIO_SPRING}
                href={buildWhatsAppHref(prefillParams)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#3B82F6] rounded-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Open WhatsApp Chat ({STUDIO_CONTACT.secondaryPhone})</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={STUDIO_SPRING}
                href={buildEmailHref(prefillParams, STUDIO_CONTACT.primaryEmail)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Pre-Filled Email ({STUDIO_CONTACT.primaryEmail})</span>
              </motion.a>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-mono font-medium text-white border border-[#2A2E38] hover:border-white rounded-md transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                  <span>Call {STUDIO_CONTACT.primaryPhone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'order' })}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#60A5FA] border border-[#2A2E38] hover:border-[#60A5FA] rounded-md transition-colors cursor-pointer"
                >
                  <span>Order Form</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
