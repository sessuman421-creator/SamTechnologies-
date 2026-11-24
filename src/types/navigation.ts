export type PageRoute =
  | { view: 'home' }
  | { view: 'work'; category?: string }
  | { view: 'project'; slug: string }
  | { view: 'services' }
  | { view: 'service'; slug: string }
  | { view: 'pricing' }
  | { view: 'hire' }
  | { view: 'process' }
  | { view: 'contact' }
  | { view: 'order'; serviceSlug?: string; tierScope?: 'entry' | 'full' };

export type NavigateFn = (route: PageRoute) => void;
