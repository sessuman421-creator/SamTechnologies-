import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import type { PageRoute } from './types/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransitionShell } from './components/MotionPrimitives';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PricingOrdersPage } from './pages/PricingOrdersPage';
import { ProcessPage } from './pages/ProcessPage';
import { HirePage } from './pages/HirePage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';

function routeToHash(route: PageRoute): string {
  switch (route.view) {
    case 'home':
      return '#/';
    case 'work':
      return route.category ? `#/work?category=${encodeURIComponent(route.category)}` : '#/work';
    case 'project':
      return `#/project/${route.slug}`;
    case 'services':
      return '#/services';
    case 'service':
      return `#/service/${route.slug}`;
    case 'pricing':
      return '#/pricing';
    case 'hire':
      return '#/hire';
    case 'process':
      return '#/process';
    case 'contact':
      return '#/contact';
    case 'order': {
      const params = new URLSearchParams();
      if (route.serviceSlug) params.set('service', route.serviceSlug);
      if (route.tierScope) params.set('scope', route.tierScope);
      const query = params.toString();
      return query ? `#/order?${query}` : '#/order';
    }
  }
}

function hashToRoute(hash: string): PageRoute {
  const cleaned = hash.replace(/^#/, '');
  const [pathPart, queryPart] = cleaned.split('?');
  const params = new URLSearchParams(queryPart || '');

  if (!pathPart || pathPart === '/') return { view: 'home' };
  if (pathPart === '/work') {
    const category = params.get('category') || undefined;
    return { view: 'work', category };
  }
  if (pathPart.startsWith('/project/')) {
    const slug = pathPart.replace('/project/', '');
    return slug ? { view: 'project', slug } : { view: 'work' };
  }
  if (pathPart === '/services') return { view: 'services' };
  if (pathPart.startsWith('/service/')) {
    const slug = pathPart.replace('/service/', '');
    return slug ? { view: 'service', slug } : { view: 'services' };
  }
  if (pathPart === '/pricing') return { view: 'pricing' };
  if (pathPart === '/hire') return { view: 'hire' };
  if (pathPart === '/process') return { view: 'process' };
  if (pathPart === '/contact') return { view: 'contact' };
  if (pathPart === '/order') {
    const serviceSlug = params.get('service') || undefined;
    const scopeParam = params.get('scope');
    const tierScope = scopeParam === 'full' ? 'full' : scopeParam === 'entry' ? 'entry' : undefined;
    return { view: 'order', serviceSlug, tierScope };
  }
  return { view: 'home' };
}

function getRouteKey(route: PageRoute): string {
  switch (route.view) {
    case 'project':
      return `project-${route.slug}`;
    case 'service':
      return `service-${route.slug}`;
    case 'order':
      return `order-${route.serviceSlug || 'default'}-${route.tierScope || 'entry'}`;
    default:
      return route.view;
  }
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() => hashToRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(hashToRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute: PageRoute) => {
    const nextHash = routeToHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (route.view) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'work':
        return <WorkPage initialCategory={route.category} onNavigate={navigate} />;
      case 'project':
        return <ProjectDetailPage slug={route.slug} onNavigate={navigate} />;
      case 'services':
        return <ServicesPage onNavigate={navigate} />;
      case 'service':
        return <ServiceDetailPage slug={route.slug} onNavigate={navigate} />;
      case 'pricing':
        return <PricingOrdersPage onNavigate={navigate} />;
      case 'hire':
        return <HirePage onNavigate={navigate} />;
      case 'process':
        return <ProcessPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'order':
        return (
          <OrderPage
            initialServiceSlug={route.serviceSlug}
            initialScope={route.tierScope}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0A0B0D] text-[#F3F4F6]">
        <Header currentRoute={route} onNavigate={navigate} />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransitionShell key={getRouteKey(route)}>{renderPage()}</PageTransitionShell>
          </AnimatePresence>
        </div>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
