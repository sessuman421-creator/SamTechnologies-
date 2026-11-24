export interface StudioProject {
  slug: string;
  index: string;
  title: string;
  domainLabel: string;
  category: 'EdTech & Learning' | 'GenAI & Agents' | 'FinTech & Web Apps';
  url: string;
  image: string;
  imageAlt: string;
  year: string;
  role: string;
  cardVariant: 'obsidian' | 'alabaster' | 'cobalt' | 'slate' | 'warmstone' | 'graphite' | 'ink';
  summary: string;
  challenge: string;
  architecture: string;
  features: string[];
  contributions: string[];
  deliverables: string[];
  stack: string[];
  relatedServiceSlug: string;
  benchmarkMetric: string;
}

export interface ServicePricingTier {
  slug: string;
  index: string;
  name: string;
  category: 'Software Engineering' | 'GenAI & Agents' | 'Education & Advisory';
  entryLabel: string;
  entryGhs: number;
  entryUsd: number;
  fullLabel: string;
  fullGhs: number;
  fullUsd: number;
  isRecurring?: boolean;
  deliveryWindow: string;
  minDays: number;
  maxDays: number;
  headline: string;
  overview: string;
  entryScopeItems: string[];
  fullScopeItems: string[];
  idealFor: string;
  referenceProjectSlug?: string;
}

export interface ProcessStage {
  index: string;
  title: string;
  window: string;
  summary: string;
  activities: string[];
  artifact: string;
}

export const STUDIO_CONTACT = {
  brand: 'SamTechnologies',
  founder: 'Samuel Essuman',
  title: 'Software Developer & GenAI Engineer',
  location: 'Accra, Ghana · Remote Worldwide',
  primaryEmail: 'sessuman421@gmail.com',
  secondaryEmail: 'samuelessuman444@gmail.com',
  primaryPhone: '0500717586',
  secondaryPhone: '0204704510',
};

export const STUDIO_IMAGES = {
  heroStudio: '/src/assets/images/hero_engineering_studio_1795541290052.jpg',
  edtechLibrary: '/src/assets/images/showcase_learntech_edtech_1795541290054.jpg',
  genaiCompute: '/src/assets/images/showcase_genai_systems_1795541291198.jpg',
  fintechGrid: '/src/assets/images/showcase_fintech_trading_1795541290810.jpg',
  founderWorkspace: '/src/assets/images/founder_studio_workspace_1795541291269.jpg',
};

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    slug: 'learntech-academy',
    index: '01',
    title: 'LearnTech Academy',
    domainLabel: 'learntech-academy-1.ai.studio',
    category: 'EdTech & Learning',
    url: 'https://learntech-academy-1.ai.studio/',
    image: STUDIO_IMAGES.edtechLibrary,
    imageAlt: 'Modern architectural academic library representing LearnTech Academy digital learning platform',
    year: '2026',
    role: 'Lead Architect · Full-Stack & GenAI Learning System',
    cardVariant: 'obsidian',
    summary:
      'A full-scale digital academy engineered for structured technical courses, cohort progression, interactive practice modules, and automated student guidance.',
    challenge:
      'Traditional learning portals fragment video lessons, quizzes, and coding practice across disconnected tools, causing high learner drop-off.',
    architecture:
      'Unified course syllabus engine with modular curriculum sequencing, progress state tracking, interactive exercises, and structured assessment flows built on a responsive full-stack architecture.',
    features: [
      'Structured multi-track technical curriculum with lesson sequencing',
      'Interactive learner progress tracking and module completion state',
      'Guided knowledge checks and applied coding exercises',
      'Responsive desktop and mobile academic reading workspace',
    ],
    contributions: [
      'Architected the complete academy data model, course taxonomy, and frontend system',
      'Designed and built the interactive lesson flow and assessment feedback loop',
      'Integrated GenAI-assisted study support directly inside the learning journey',
      'Deployed and tuned production performance for seamless low-bandwidth access',
    ],
    deliverables: [
      'Modular curriculum & lesson progression architecture',
      'Interactive learner workspace and knowledge checks',
      'Instructor content management & cohort organization',
      'Responsive desktop and mobile reading layout',
    ],
    stack: ['TypeScript', 'React', 'Full-Stack API', 'GenAI Tutoring Workflows', 'Tailwind CSS'],
    relatedServiceSlug: 'building-learning-platforms',
    benchmarkMetric: 'End-to-End Academy Blueprint · 21–35 Day Build Standard',
  },
  {
    slug: 'cramly-assist',
    index: '02',
    title: 'Cramly Assist',
    domainLabel: 'cramly-assist.ai.studio',
    category: 'EdTech & Learning',
    url: 'https://cramly-assist.ai.studio/',
    image: STUDIO_IMAGES.founderWorkspace,
    imageAlt: 'Software engineer workspace with technical notes representing Cramly Assist',
    year: '2026',
    role: 'GenAI Engineer · Product Designer',
    cardVariant: 'alabaster',
    summary:
      'Focused AI study and exam preparation assistant that converts dense lecture notes and course syllabi into structured recall drills, summaries, and targeted practice.',
    challenge:
      'Students preparing under tight exam windows waste hours summarizing raw PDFs without knowing which concepts carry high exam weight.',
    architecture:
      'Structured prompt orchestration pipeline paired with context-grounded synthesis, generating active-recall flashcards, step-by-step explanations, and adaptive revision sessions.',
    features: [
      'Instant conversion of raw study notes into structured revision summaries',
      'Active-recall flashcard and practice question generation',
      'Step-by-step concept breakdowns tailored to exam difficulty',
      'Distraction-free revision interface built for long study sessions',
    ],
    contributions: [
      'Engineered the prompt orchestration pipeline for accurate, non-generic study synthesis',
      'Designed the active-recall UX so learners test comprehension before reviewing answers',
      'Built clean TypeScript streaming state management for responsive AI output',
      'Calibrated output formatting rules to preserve mathematical and technical clarity',
    ],
    deliverables: [
      'Document ingestion and syllabus parsing pipeline',
      'Structured prompt engineering for zero-fluff explanations',
      'Active-recall revision workflows and self-testing views',
      'Low-latency streaming response interface',
    ],
    stack: ['GenAI Models', 'Prompt Systems', 'React', 'TypeScript', 'Streaming UI'],
    relatedServiceSlug: 'genai-engineer',
    benchmarkMetric: 'Structured Revision Engine · Context-Grounded Output',
  },
  {
    slug: 'campusstudy',
    index: '03',
    title: 'CampusStudy',
    domainLabel: 'campusstudy-5ubnhnka.manus.space',
    category: 'EdTech & Learning',
    url: 'https://campusstudy-5ubnhnka.manus.space',
    image: STUDIO_IMAGES.edtechLibrary,
    imageAlt: 'Collaborative university study studio representing CampusStudy platform',
    year: '2025',
    role: 'Full-Stack Developer',
    cardVariant: 'cobalt',
    summary:
      'Academic productivity and study coordination platform tailored for university students managing coursework, timetables, and shared study resources.',
    challenge:
      'Campus learners rely on scattered chat threads and static spreadsheets to coordinate assignments, study sessions, and semester materials.',
    architecture:
      'Centralized academic workspace organizing course modules, study planners, resource collections, and peer workflows behind a fast, clean web interface.',
    features: [
      'Semester course organizer and module tracking dashboard',
      'Assignment deadline planner and priority study scheduling',
      'Shared academic notes and resource library per subject',
      'Mobile-ready campus workspace accessible across devices',
    ],
    contributions: [
      'Built the full-stack React + TypeScript application architecture from scratch',
      'Designed normalized course, task, and study-session data structures',
      'Implemented intuitive filtering, timetable views, and quick-capture study actions',
      'Shipped responsive layouts verified across desktop and mobile browsers',
    ],
    deliverables: [
      'Semester & course module organization dashboard',
      'Study scheduling and task prioritization tools',
      'Structured academic resource repository',
      'Mobile-friendly campus browser experience',
    ],
    stack: ['React', 'TypeScript', 'Backend API', 'Database Persistence', 'Tailwind CSS'],
    relatedServiceSlug: 'full-stack-web-app',
    benchmarkMetric: 'Multi-Course Academic Workspace · Production Deployment',
  },
  {
    slug: 'cryptotrade',
    index: '04',
    title: 'CryptoTrade',
    domainLabel: 'cryptotrade-hl2aur6v.manus.space',
    category: 'FinTech & Web Apps',
    url: 'https://cryptotrade-hl2aur6v.manus.space',
    image: STUDIO_IMAGES.fintechGrid,
    imageAlt: 'Brushed titanium precision instruments on glass grid representing CryptoTrade analytics',
    year: '2025',
    role: 'Frontend & Systems Engineer',
    cardVariant: 'slate',
    summary:
      'High-clarity digital asset trading and market analytics interface designed for rapid price inspection, order simulation, and portfolio state tracking.',
    challenge:
      'Crypto interfaces often overwhelm operators with visual noise and sluggish chart re-renders during volatile market swings.',
    architecture:
      'Tabular-numeral market ledger, responsive asset watchlists, structured order entry panels, and real-time portfolio allocation breakdowns.',
    features: [
      'Real-time asset market watchlist with tabular-numeral price alignment',
      'Interactive buy/sell order ticket and position sizing workflow',
      'Portfolio allocation summary and profit/loss tracking',
      'High-contrast interface tuned for rapid financial data scanning',
    ],
    contributions: [
      'Architected the precision frontend trading desk and order state engine',
      'Enforced strict tabular numeral alignment and zero-jitter state updates',
      'Built responsive market tables, asset filters, and portfolio breakdowns',
      'Optimized rendering performance for smooth interactions across live feeds',
    ],
    deliverables: [
      'Real-time market ticker & tabular price ledger',
      'Order execution & position tracking workflows',
      'Portfolio valuation and asset breakdown views',
      'High-contrast interface engineered for long sessions',
    ],
    stack: ['TypeScript', 'React', 'Market Data Feeds', 'Tabular UI', 'Motion'],
    relatedServiceSlug: 'frontend-development',
    benchmarkMetric: 'Precision Order Interface · Sub-200ms UI Transitions',
  },
  {
    slug: 'omnigpt-ai',
    index: '05',
    title: 'OmniGPT AI',
    domainLabel: 'omnigpt-ai.netlify.app',
    category: 'GenAI & Agents',
    url: 'https://omnigpt-ai.netlify.app/',
    image: STUDIO_IMAGES.genaiCompute,
    imageAlt: 'Anodized compute hardware and silicon lattice representing OmniGPT AI workspace',
    year: '2025',
    role: 'GenAI Systems Architect',
    cardVariant: 'warmstone',
    summary:
      'Unified multi-capability generative AI workspace delivering structured conversations, specialized prompt workflows, and fast response streaming in one clean console.',
    challenge:
      'Switching between disconnected AI tools breaks context and forces teams to rewrite system instructions repeatedly.',
    architecture:
      'Modular prompt-routing layer with reusable instruction templates, streaming token renderer, conversation history management, and clean keyboard-first ergonomics.',
    features: [
      'Unified multi-task GenAI conversation and prompt execution console',
      'Reusable system prompt templates for writing, analysis, and ideation',
      'Clean streaming markdown and formatted output blocks',
      'Persistent session history and fast context switching',
    ],
    contributions: [
      'Designed and engineered the multi-workflow GenAI client and routing layer',
      'Built structured markdown and code block parsing for clean response legibility',
      'Created curated system instruction presets to eliminate repetitive prompting',
      'Configured edge-optimized production deployment on Netlify',
    ],
    deliverables: [
      'Unified GenAI conversation & prompt workspace',
      'Role-specific system prompt architecture',
      'Streaming markdown & structured code output rendering',
      'Production Netlify edge deployment',
    ],
    stack: ['GenAI APIs', 'Prompt Engineering', 'TypeScript', 'React', 'Netlify Edge'],
    relatedServiceSlug: 'genai-engineer',
    benchmarkMetric: 'Multi-Workflow GenAI Workspace · Live Production App',
  },
  {
    slug: 'devai',
    index: '06',
    title: 'DevAI',
    domainLabel: 'devai-vcaan3lz.manus.space',
    category: 'GenAI & Agents',
    url: 'https://devai-vcaan3lz.manus.space/',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Minimalist software engineering workstation representing DevAI developer assistant',
    year: '2026',
    role: 'AI Coding Agent Engineer',
    cardVariant: 'graphite',
    summary:
      'Developer-focused AI engineering assistant built to accelerate architecture planning, debugging, refactoring, and production code synthesis.',
    challenge:
      'Generic chat assistants produce disconnected snippets that ignore project boundaries, typing constraints, and architectural intent.',
    architecture:
      'Developer-tuned agent workflow enforcing structured technical specifications, clean TypeScript patterns, contextual code reasoning, and iterative refinement.',
    features: [
      'Architecture-first reasoning for backend, frontend, and database tasks',
      'Guided debugging and stack-trace root-cause analysis',
      'Clean code refactoring with TypeScript safety preservation',
      'Developer-centric workspace optimized for technical specification input',
    ],
    contributions: [
      'Engineered the developer-specialized AI coding agent instruction pipeline',
      'Designed task-specific prompt stages separating planning from implementation',
      'Built the interactive engineering console with copy-ready structured outputs',
      'Tuned agent guardrails to avoid hallucinated APIs and incomplete stubs',
    ],
    deliverables: [
      'Code reasoning & debugging assistant pipeline',
      'Structured prompt engineering for software architecture',
      'Interactive developer workspace & output viewer',
      'Context-aware refactoring recommendations',
    ],
    stack: ['AI Coding Agents', 'Prompt Systems', 'TypeScript', 'React', 'Full-Stack Web'],
    relatedServiceSlug: 'ai-coding-agent-engineering',
    benchmarkMetric: 'Developer Agent Pipeline · Architecture-First Synthesis',
  },
  {
    slug: 'codegpt',
    index: '07',
    title: 'CodeGPT',
    domainLabel: 'codegpt-artif.netlify.app',
    category: 'GenAI & Agents',
    url: 'https://codegpt-artif.netlify.app/',
    image: STUDIO_IMAGES.genaiCompute,
    imageAlt: 'Precision hardware silicon lattice representing CodeGPT artifact generation',
    year: '2026',
    role: 'AI Coding Agent & Frontend Architect',
    cardVariant: 'ink',
    summary:
      'Artifact-centric AI code generation environment that turns natural-language engineering specifications into inspectable, structured software outputs.',
    challenge:
      'Engineers need immediate side-by-side separation between conversational reasoning and clean, copy-ready or previewable code artifacts.',
    architecture:
      'Dual-pane generation architecture separating dialogue orchestration from structured artifact extraction, syntax presentation, and rapid iteration.',
    features: [
      'Dual-pane interface separating engineering dialogue from code artifacts',
      'Automated extraction and syntax-highlighted display of generated files',
      'Iterative artifact refinement without losing structural context',
      'One-click artifact copy and clean file organization',
    ],
    contributions: [
      'Architected the artifact extraction engine and dual-pane developer UI',
      'Engineered multi-step code generation prompts for complete, runnable modules',
      'Implemented smooth panel transitions and responsive split-view ergonomics',
      'Shipped production deployment on Netlify with instant cold-start loading',
    ],
    deliverables: [
      'Artifact extraction and structured code presentation engine',
      'Multi-step coding prompt orchestration',
      'Clean dual-pane developer interface',
      'Fast static & edge production hosting',
    ],
    stack: ['AI Agents', 'Artifact Engine', 'React', 'TypeScript', 'Netlify'],
    relatedServiceSlug: 'ai-coding-agent-engineering',
    benchmarkMetric: 'Artifact-Driven Code Synthesis · Zero-Clutter Workspace',
  },
];

export const PRICING_TIERS: ServicePricingTier[] = [
  {
    slug: 'frontend-development',
    index: '01',
    name: 'Frontend Development',
    category: 'Software Engineering',
    entryLabel: 'Landing Page',
    entryGhs: 1200,
    entryUsd: 100,
    fullLabel: 'Full Business Website',
    fullGhs: 3500,
    fullUsd: 280,
    deliveryWindow: '5 to 10 days',
    minDays: 5,
    maxDays: 10,
    headline: 'Responsive, high-speed web interfaces built with editorial precision.',
    overview:
      'From focused product landing pages to complete multi-page company websites, every interface is engineered in clean React and TypeScript with smooth compositor-only motion, accessible contrast, and mobile responsiveness.',
    entryScopeItems: [
      'Single-page responsive landing architecture',
      'Custom typography, layout system & smooth motion',
      'Contact or lead capture integration',
      'SEO metadata & production deployment setup',
    ],
    fullScopeItems: [
      'Multi-page business website (5–8 dedicated views)',
      'Interactive service, portfolio & inquiry flows',
      'Performance optimization & responsive breakpoints',
      'Analytics readiness & full source handover',
    ],
    idealFor: 'Founders, agencies, and businesses needing a credible, fast, non-generic web presence.',
    referenceProjectSlug: 'cryptotrade',
  },
  {
    slug: 'backend-development',
    index: '02',
    name: 'Backend Development',
    category: 'Software Engineering',
    entryLabel: 'API & Database',
    entryGhs: 2500,
    entryUsd: 200,
    fullLabel: 'Full Backend System',
    fullGhs: 6000,
    fullUsd: 480,
    deliveryWindow: '7 to 14 days',
    minDays: 7,
    maxDays: 14,
    headline: 'Structured APIs, relational schemas, authentication, and scalable server logic.',
    overview:
      'Production-hardened backend services with typed contracts, normalized database modeling, role-based access control, validation, and clean endpoint documentation.',
    entryScopeItems: [
      'REST API endpoints with strict input validation',
      'Database schema design & query optimization',
      'Environment configuration & error handling',
      'API contract documentation for frontend teams',
    ],
    fullScopeItems: [
      'Complete authentication, RBAC & session security',
      'Multi-entity relational/document persistence layer',
      'Webhook integrations, background jobs & rate limiting',
      'Deployment pipeline & monitoring readiness',
    ],
    idealFor: 'Mobile apps, SaaS platforms, and businesses migrating off fragile spreadsheets.',
    referenceProjectSlug: 'campusstudy',
  },
  {
    slug: 'full-stack-web-app',
    index: '03',
    name: 'Full-Stack Web App',
    category: 'Software Engineering',
    entryLabel: 'Small Web App',
    entryGhs: 4500,
    entryUsd: 350,
    fullLabel: 'Large Web App',
    fullGhs: 12000,
    fullUsd: 950,
    deliveryWindow: '14 to 30 days',
    minDays: 14,
    maxDays: 30,
    headline: 'End-to-end web software uniting client UI, server APIs, and persistent data.',
    overview:
      'Complete web applications engineered from database schema to polished browser interaction—built for real operational workflows, dashboards, portals, and SaaS products.',
    entryScopeItems: [
      'Core user authentication & protected workspace',
      '3–5 interactive operational views with live CRUD',
      'Database persistence & clean API integration',
      'Production cloud deployment & walkthrough',
    ],
    fullScopeItems: [
      'Multi-role dashboards, admin consoles & workflows',
      'Complex state management, search, filtering & exports',
      'Third-party API / payment / notification integrations',
      'Automated validation, staging setup & documentation',
    ],
    idealFor: 'Startups launching an MVP or organizations digitizing core operations.',
    referenceProjectSlug: 'campusstudy',
  },
  {
    slug: 'app-development',
    index: '04',
    name: 'App Development',
    category: 'Software Engineering',
    entryLabel: 'Simple Mobile App',
    entryGhs: 6000,
    entryUsd: 500,
    fullLabel: 'Full App',
    fullGhs: 15000,
    fullUsd: 1200,
    deliveryWindow: '21 to 45 days',
    minDays: 21,
    maxDays: 45,
    headline: 'Cross-platform and mobile-first applications engineered for everyday touch use.',
    overview:
      'Responsive mobile applications designed around thumb-friendly navigation, offline resilience, backend synchronization, and smooth native-grade transitions.',
    entryScopeItems: [
      'Core mobile screen architecture & navigation',
      'User onboarding, profile & primary utility workflow',
      'API connection & local device persistence',
      'Store-ready build preparation',
    ],
    fullScopeItems: [
      'Complete multi-module mobile product & backend sync',
      'Push notifications, media handling & real-time updates',
      'Role-based accounts & secure token lifecycle',
      'QA testing across screen sizes & release packaging',
    ],
    idealFor: 'Consumer products, field operations, and service marketplaces.',
  },
  {
    slug: 'prompt-engineering',
    index: '05',
    name: 'Prompt Engineering',
    category: 'GenAI & Agents',
    entryLabel: 'Prompt Pack',
    entryGhs: 600,
    entryUsd: 50,
    fullLabel: 'Full Prompt System',
    fullGhs: 2000,
    fullUsd: 160,
    deliveryWindow: '2 to 5 days',
    minDays: 2,
    maxDays: 5,
    headline: 'Deterministic, repeatable instruction architectures for production LLM behavior.',
    overview:
      'Replace brittle ad-hoc prompts with structured system instructions, schema-constrained outputs, edge-case guardrails, and evaluated prompt chains.',
    entryScopeItems: [
      '10–15 tested domain-specific system & task prompts',
      'Structured output formatting (JSON / Markdown rules)',
      'Failure-mode guardrails & tone calibration',
      'Usage guide for your team or product',
    ],
    fullScopeItems: [
      'Multi-step chained prompt architecture & routing rules',
      'Test rubric & adversarial edge-case evaluation',
      'Model parameter tuning & fallback instruction sets',
      'Direct integration snippets for your codebase',
    ],
    idealFor: 'Teams getting inconsistent AI responses who need reliable, production-grade outputs.',
    referenceProjectSlug: 'cramly-assist',
  },
  {
    slug: 'tutoring-mentorship',
    index: '06',
    name: 'Tutoring and Mentorship',
    category: 'Education & Advisory',
    entryLabel: 'Per Hour Session',
    entryGhs: 250,
    entryUsd: 20,
    fullLabel: 'Monthly Weekly Classes',
    fullGhs: 900,
    fullUsd: 75,
    isRecurring: true,
    deliveryWindow: 'Hourly or Monthly',
    minDays: 1,
    maxDays: 30,
    headline: 'Practical 1-on-1 engineering mentorship in full-stack development and GenAI.',
    overview:
      'Hands-on live coaching focused on real project building—covering React, TypeScript, backend APIs, prompt engineering, RAG architectures, and AI coding workflows.',
    entryScopeItems: [
      '60-minute focused live 1-on-1 session (GH₵250 / $20 hr)',
      'Code review, architecture debugging & concept clarity',
      'Personalized action plan & practice exercises',
    ],
    fullScopeItems: [
      '4 weekly structured classes per month (GH₵900 / $75 mo)',
      'Guided real-world portfolio project construction',
      'Async code feedback & milestone check-ins',
      'Career & engineering workflow guidance',
    ],
    idealFor: 'Students, junior developers, and builders transitioning into GenAI engineering.',
    referenceProjectSlug: 'learntech-academy',
  },
  {
    slug: 'building-learning-platforms',
    index: '07',
    name: 'Building Learning Platforms',
    category: 'Education & Advisory',
    entryLabel: 'Basic Platform',
    entryGhs: 5500,
    entryUsd: 450,
    fullLabel: 'Full Academy (Like LearnTech Academy)',
    fullGhs: 14000,
    fullUsd: 1100,
    deliveryWindow: '21 to 35 days',
    minDays: 21,
    maxDays: 35,
    headline: 'Custom EdTech academies, LMS portals, and AI-assisted study platforms.',
    overview:
      'Purpose-built learning ecosystems modeled after LearnTech Academy and CampusStudy—featuring structured curricula, student progress tracking, interactive quizzes, and optional AI study companions.',
    entryScopeItems: [
      'Course catalog, structured modules & lesson reader',
      'Student accounts & lesson completion tracking',
      'Instructor upload & curriculum management panel',
      'Clean responsive academic interface',
    ],
    fullScopeItems: [
      'Full academy architecture like LearnTech Academy',
      'Interactive assessments, cohorts & AI study assistant',
      'Certificate generation & analytics reporting',
      'Enrollment workflows & full production launch',
    ],
    idealFor: 'Training institutes, educators, tech academies, and EdTech founders.',
    referenceProjectSlug: 'learntech-academy',
  },
  {
    slug: 'genai-engineer',
    index: '08',
    name: 'GenAI Engineer',
    category: 'GenAI & Agents',
    entryLabel: 'Chatbot',
    entryGhs: 4000,
    entryUsd: 320,
    fullLabel: 'RAG & AI Agent System',
    fullGhs: 10000,
    fullUsd: 800,
    deliveryWindow: '14 to 28 days',
    minDays: 14,
    maxDays: 28,
    headline: 'Production LLM applications, Retrieval-Augmented Generation, and tool-using agents.',
    overview:
      'Custom generative AI software engineered with grounded document retrieval, structured tool calling, streaming responses, and clean evaluation controls.',
    entryScopeItems: [
      'Custom domain chatbot with clean web interface',
      'System guardrails, streaming UI & session memory',
      'API proxy security (no exposed browser keys)',
      'Deployment & usage cost control guidelines',
    ],
    fullScopeItems: [
      'Vector indexing & Retrieval-Augmented Generation (RAG)',
      'Autonomous tool-calling & multi-step AI agent workflows',
      'Citation grounding & hallucination mitigation layer',
      'Admin evaluation logs & production deployment',
    ],
    idealFor: 'Businesses automating knowledge retrieval, support, research, or internal workflows.',
    referenceProjectSlug: 'omnigpt-ai',
  },
  {
    slug: 'ai-coding-agent-engineering',
    index: '09',
    name: 'AI Coding Agent Engineering',
    category: 'GenAI & Agents',
    entryLabel: 'Simple Agent',
    entryGhs: 5000,
    entryUsd: 400,
    fullLabel: 'Advanced Multi-Agent System',
    fullGhs: 13000,
    fullUsd: 1000,
    deliveryWindow: '21 to 35 days',
    minDays: 21,
    maxDays: 35,
    headline: 'Specialized coding agents and multi-agent developer orchestration systems.',
    overview:
      'Engineering of autonomous software agents capable of planning, code synthesis, artifact generation, automated verification, and multi-agent task delegation—inspired by DevAI and CodeGPT.',
    entryScopeItems: [
      'Single-purpose coding or review agent workflow',
      'Structured code output & artifact parsing',
      'Context window & repository prompt management',
      'Interactive developer interface',
    ],
    fullScopeItems: [
      'Advanced multi-agent planner, coder & reviewer system',
      'Tool execution hooks, file diffing & sandboxed loops',
      'Artifact workspace & iterative debugging memory',
      'Evaluation benchmarks & production API architecture',
    ],
    idealFor: 'DevTool startups, engineering teams, and AI-first software studios.',
    referenceProjectSlug: 'devai',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    index: '01',
    title: 'Scope, Architecture & Blueprint',
    window: 'Days 1–3',
    summary:
      'Every build begins with a clear architectural brief—mapping user flows, data entities, model boundaries, and exact GH₵ / USD milestone pricing before code is written.',
    activities: [
      'Technical requirements audit & system boundary mapping',
      'Database schema, API contract, or prompt architecture spec',
      'Fixed delivery timeline and transparent scope confirmation',
    ],
    artifact: 'Signed System Architecture & Milestone Schedule',
  },
  {
    index: '02',
    title: 'Core Engineering & Model Orchestration',
    window: 'Mid-Sprint',
    summary:
      'Iterative construction of frontend interfaces, backend endpoints, and GenAI agent pipelines with clean TypeScript modules and zero bloated dependencies.',
    activities: [
      'Responsive UI construction & compositor-smooth interaction design',
      'Backend persistence, authentication, and LLM tool integration',
      'Regular staging previews so you inspect real working builds early',
    ],
    artifact: 'Live Staging Preview & Modular Source Repository',
  },
  {
    index: '03',
    title: 'Verification, Edge-Case QA & Grounding',
    window: 'Pre-Launch',
    summary:
      'Rigorous testing across viewports, API error states, prompt edge cases, and security boundaries to ensure reliable behavior under real user traffic.',
    activities: [
      'Cross-device responsiveness, contrast, and keyboard accessibility audit',
      'GenAI hallucination checks, fallback handling, and rate safety',
      'End-to-end validation of forms, auth, and critical user paths',
    ],
    artifact: 'Verified Production Release Candidate',
  },
  {
    index: '04',
    title: 'Deployment, Handover & Continuity',
    window: 'Launch Day',
    summary:
      'Clean production deployment with environment documentation, source code ownership, walkthrough training, and optional ongoing mentorship or scaling.',
    activities: [
      'Production domain & cloud deployment setup',
      'Complete repository handover & operational walkthrough',
      'Post-launch support window and upgrade path planning',
    ],
    artifact: 'Live Production System & Full Ownership Handover',
  },
];
