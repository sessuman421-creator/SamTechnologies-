import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { NavigateFn, PageRoute } from '../types/navigation';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: NavigateFn;
}

const NAV_ITEMS: Array<{ label: string; view: PageRoute['view']; route: PageRoute }> = [
  { label: 'Work', view: 'work', route: { view: 'work' } },
  { label: 'Services', view: 'services', route: { view: 'services' } },
  { label: 'Pricing & Orders', view: 'pricing', route: { view: 'pricing' } },
  { label: 'Hire', view: 'hire', route: { view: 'hire' } },
  { label: 'Contact', view: 'contact', route: { view: 'contact' } },
];

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isNavActive = (view: PageRoute['view']) => {
    if (view === 'work' && currentRoute.view === 'project') return true;
    if (view === 'services' && currentRoute.view === 'service') return true;
    if (view === 'pricing' && currentRoute.view === 'order') return true;
    return currentRoute.view === view;
  };

  const handleNavClick = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0B0D]/92 backdrop-blur-md border-b border-[#22252C]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick({ view: 'home' })}
          className="font-display text-lg font-bold tracking-tight text-white hover:text-[#60A5FA] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
        >
          SamTechnologies
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.view);
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.route)}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] ${
                  active ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#3B82F6]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick({ view: 'order' })}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-tight text-[#0A0B0D] bg-white hover:bg-[#93C5FD] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-white hover:bg-[#181B21] rounded-md transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-[#22252C] bg-[#0A0B0D] px-5 py-5"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              <button
                type="button"
                onClick={() => handleNavClick({ view: 'home' })}
                className={`text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentRoute.view === 'home'
                    ? 'bg-[#181B21] text-white'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Home
              </button>
              {NAV_ITEMS.map((item) => {
                const active = isNavActive(item.view);
                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleNavClick(item.route)}
                    className={`text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      active ? 'bg-[#181B21] text-white' : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#22252C]">
                <button
                  type="button"
                  onClick={() => handleNavClick({ view: 'order' })}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0A0B0D] bg-white hover:bg-[#93C5FD] rounded-md transition-colors cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
