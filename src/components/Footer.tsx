import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { STUDIO_CONTACT, STUDIO_PROJECTS } from '../data/studioData';
import type { NavigateFn } from '../types/navigation';
import { buildEmailHref, buildWhatsAppHref } from '../utils/contactLinks';

interface FooterProps {
  onNavigate: NavigateFn;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#07080A] text-[#F3F4F6] border-t border-[#22252C]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#22252C]">
          {/* Column 1: Studio Identity */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate({ view: 'home' })}
              className="font-display text-2xl font-bold tracking-tight text-white hover:text-[#93C5FD] transition-colors cursor-pointer"
            >
              {STUDIO_CONTACT.brand}
            </button>
            <p className="text-sm text-[#A1A5AE] leading-relaxed max-w-sm">
              Independent software development and generative AI engineering practice led by{' '}
              <span className="text-white font-medium">{STUDIO_CONTACT.founder}</span>. Designing and shipping
              full-stack web software, mobile apps, learning academies, and autonomous AI agent systems.
            </p>
            <p className="text-xs text-[#7D828C]">{STUDIO_CONTACT.location}</p>
          </div>

          {/* Column 2: Studio Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-medium text-[#7D828C] tracking-wide">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'home' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'work' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'services' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Engineering Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'pricing' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Pricing &amp; Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'hire' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Hire Sam &amp; Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'process' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Delivery Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'contact' })}
                  className="text-[#D4D7DD] hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Shipped Live Systems */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-medium text-[#7D828C] tracking-wide">Shipped Systems</h3>
            <ul className="space-y-2.5 text-sm">
              {STUDIO_PROJECTS.map((project) => (
                <li key={project.slug} className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate({ view: 'project', slug: project.slug })}
                    className="text-[#D4D7DD] hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {project.title}
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live website`}
                    className="text-[#7D828C] hover:text-[#93C5FD] transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-medium text-[#7D828C] tracking-wide">Direct Channels</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${STUDIO_CONTACT.primaryPhone}`}
                className="flex items-center gap-2.5 text-[#D4D7DD] hover:text-white transition-colors font-mono tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>Call: {STUDIO_CONTACT.primaryPhone}</span>
              </a>
              <a
                href={buildWhatsAppHref({ intent: 'General Software / GenAI Project Discussion' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#D4D7DD] hover:text-white transition-colors font-mono tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>WhatsApp: {STUDIO_CONTACT.secondaryPhone}</span>
              </a>
              <a
                href={buildEmailHref(
                  { intent: 'General Software / GenAI Project Discussion' },
                  STUDIO_CONTACT.primaryEmail
                )}
                className="flex items-center gap-2.5 text-[#D4D7DD] hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>{STUDIO_CONTACT.primaryEmail}</span>
              </a>
              <a
                href={buildEmailHref(
                  { intent: 'General Software / GenAI Project Discussion' },
                  STUDIO_CONTACT.secondaryEmail
                )}
                className="flex items-center gap-2.5 text-[#D4D7DD] hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
                <span>{STUDIO_CONTACT.secondaryEmail}</span>
              </a>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate({ view: 'order' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#141518] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
              >
                <span>Configure an Order</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7D828C]">
          <p>© {new Date().getFullYear()} {STUDIO_CONTACT.brand}. Engineered by {STUDIO_CONTACT.founder}.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate({ view: 'pricing' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Rate Schedule
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ view: 'contact' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
