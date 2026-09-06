import type {
  ChatMessage,
  ChatSession,
  FileItem,
  ImageItem,
  ProjectItem,
  SuggestionCard,
} from '@/types';

export const suggestionCards: SuggestionCard[] = [
  {
    id: '1',
    title: 'Build a website',
    description: 'Design and scaffold a modern landing page',
    icon: 'LayoutTemplate',
    accent: 'xova',
  },
  {
    id: '2',
    title: 'Analyze an image',
    description: 'Upload a photo and get detailed insights',
    icon: 'ScanEye',
    accent: 'xova',
  },
  {
    id: '3',
    title: 'Write something',
    description: 'Draft copy, emails, or creative content',
    icon: 'PenLine',
    accent: 'accent',
  },
  {
    id: '4',
    title: 'Help me code',
    description: 'Debug, refactor, or generate functions',
    icon: 'Code2',
    accent: 'xova',
  },
  {
    id: '5',
    title: 'Research a topic',
    description: 'Gather and synthesize information fast',
    icon: 'Telescope',
    accent: 'accent',
  },
  {
    id: '6',
    title: 'Create an image',
    description: 'Generate visuals from a text prompt',
    icon: 'Sparkles',
    accent: 'xova',
  },
];

export const chatHistory: ChatSession[] = [
  { id: 'c1', title: 'SaaS pricing page copy', preview: 'Draft three variations of the hero headline…', timestamp: '2m ago', pinned: true },
  { id: 'c2', title: 'React component architecture', preview: 'How should I structure a reusable modal system?', timestamp: '1h ago' },
  { id: 'c3', title: 'Market research — fintech', preview: 'Summarize the top 5 trends in embedded finance…', timestamp: '3h ago' },
  { id: 'c4', title: 'Image prompt: aurora over fjord', preview: 'Generate a cinematic landscape with northern lights…', timestamp: 'Yesterday' },
  { id: 'c5', title: 'Python data pipeline', preview: 'Help me write a script to clean CSV exports…', timestamp: 'Yesterday' },
  { id: 'c6', title: 'Brand voice guidelines', preview: 'Define tone, vocabulary, and do/don’t list…', timestamp: '2d ago' },
  { id: 'c7', title: 'SQL query optimization', preview: 'Why is this join slow and how do I index it?', timestamp: '3d ago' },
  { id: 'c8', title: 'Logo concept feedback', preview: 'Review these three mark directions for XOVA…', timestamp: '5d ago' },
];

export const demoMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'Can you design a pricing page for a SaaS product with three tiers — Starter, Pro, and Enterprise?',
    timestamp: '10:24 AM',
    status: 'sent',
  },
  {
    id: 'm2',
    role: 'assistant',
    content: `Here's a structured approach for your three-tier pricing page:

**1. Layout** — Use a centered three-column grid. Highlight the "Pro" tier with a subtle gradient border and a "Most Popular" badge. Keep equal heights with flexbox so the CTA buttons align at the bottom.

**2. Visual hierarchy**
- Tier name in semibold
- Price large, with billing period muted below
- Feature list with check icons (green for included, muted dash for excluded)

**3. Example component structure**

\`\`\`tsx
<PricingCard
  name="Pro"
  price="$29"
  period="/month"
  features={['10 projects', 'Priority support', 'Advanced analytics']}
  highlighted
/>
\`\`\`

**4. Interactions** — Add a monthly/annual toggle that animates the price with a crossfade, and a hover lift on each card (translateY -4px + shadow).

Would you like me to scaffold the full component?`,
    timestamp: '10:24 AM',
    status: 'sent',
    liked: null,
  },
];

export const demoProjects: ProjectItem[] = [
  {
    id: 'p1',
    name: 'XOVA Marketing Site',
    description: 'Landing page, pricing, and docs for the public launch.',
    updatedAt: '2 hours ago',
    conversations: 14,
    files: 8,
    images: 5,
    color: 'xova',
  },
  {
    id: 'p2',
    name: 'Q4 Brand Refresh',
    description: 'New visual identity, typography, and component library.',
    updatedAt: 'Yesterday',
    conversations: 9,
    files: 22,
    images: 18,
    color: 'accent',
  },
  {
    id: 'p3',
    name: 'Onboarding Flow',
    description: 'Email sequence, in-app guide, and activation metrics.',
    updatedAt: '3 days ago',
    conversations: 6,
    files: 4,
    images: 2,
    color: 'xova',
  },
  {
    id: 'p4',
    name: 'API Documentation',
    description: 'Reference docs, quickstarts, and SDK code samples.',
    updatedAt: '1 week ago',
    conversations: 11,
    files: 31,
    images: 0,
    color: 'xova',
  },
];

export const demoFiles: FileItem[] = [
  { id: 'f1', name: 'brand-guidelines-v3.pdf', size: '4.2 MB', type: 'pdf', uploadedAt: '2m ago', status: 'uploaded' },
  { id: 'f2', name: 'hero-mockup.png', size: '8.1 MB', type: 'image', uploadedAt: '1h ago', status: 'uploaded' },
  { id: 'f3', name: 'quarterly-report.xlsx', size: '2.4 MB', type: 'sheet', uploadedAt: '3h ago', status: 'uploaded' },
  { id: 'f4', name: 'api-spec.yaml', size: '156 KB', type: 'code', uploadedAt: 'Yesterday', status: 'uploaded' },
  { id: 'f5', name: 'voiceover-intro.mp3', size: '12.7 MB', type: 'audio', uploadedAt: 'Yesterday', status: 'uploaded' },
  { id: 'f6', name: 'demo-video.mp4', size: '48.3 MB', type: 'video', uploadedAt: '2d ago', status: 'uploaded' },
  { id: 'f7', name: 'assets.zip', size: '22.0 MB', type: 'archive', uploadedAt: '3d ago', status: 'uploaded' },
  { id: 'f8', name: 'meeting-notes.txt', size: '18 KB', type: 'text', uploadedAt: '5d ago', status: 'uploaded' },
  { id: 'f9', name: 'proposal-draft.docx', size: '1.1 MB', type: 'doc', uploadedAt: '1w ago', status: 'uploaded' },
];

export const demoImages: ImageItem[] = [
  { id: 'i1', prompt: 'A futuristic city skyline at dusk, neon reflections, cinematic', src: '', aspect: '16:9', style: 'Cinematic', createdAt: '2m ago' },
  { id: 'i2', prompt: 'Minimalist product render on a marble pedestal, soft shadows', src: '', aspect: '1:1', style: 'Minimal', createdAt: '1h ago' },
  { id: 'i3', prompt: 'Abstract liquid metal flowing in zero gravity, iridescent', src: '', aspect: '3:2', style: 'Abstract', createdAt: '3h ago' },
  { id: 'i4', prompt: 'Lush forest path with morning fog, golden light through trees', src: '', aspect: '4:3', style: 'Photoreal', createdAt: 'Yesterday' },
  { id: 'i5', prompt: 'Isometric 3D illustration of a data pipeline, clean vectors', src: '', aspect: '1:1', style: '3D Render', createdAt: 'Yesterday' },
  { id: 'i6', prompt: 'Portrait of an astronaut helmet reflecting a nebula', src: '', aspect: '2:3', style: 'Cinematic', createdAt: '2d ago' },
];

export const faqData = [
  {
    category: 'Getting Started',
    items: [
      { q: 'What is XOVA AI?', a: 'XOVA AI is a single intelligent workspace that brings together chat, image creation, file analysis, and project organization — designed for individuals and teams who want one polished place to think, create, and ship.' },
      { q: 'How do I start my first conversation?', a: 'Click "New Chat" in the sidebar, then type a question or pick a suggestion card on the chat screen. Your conversation appears in the history list automatically.' },
      { q: 'What can XOVA help me with?', a: 'Writing, coding, research, brainstorming, image creation, and analyzing files. Each capability lives in its own section accessible from the sidebar.' },
    ],
  },
  {
    category: 'Workspace',
    items: [
      { q: 'How do projects work?', a: 'Projects let you group related conversations, files, and images together. Create a project from the Projects page, then move resources into it as you work.' },
      { q: 'Where are my files stored?', a: 'Uploaded files appear in the Files section with type, size, and status indicators. File storage and persistence will be connected in a later phase.' },
      { q: 'Can I organize my chat history?', a: 'Yes — chats are listed in the sidebar. You can search, pin, and reopen any past conversation from the history list.' },
    ],
  },
  {
    category: 'Account & Privacy',
    items: [
      { q: 'Is my data private?', a: 'XOVA is designed with privacy in mind. You can review and adjust privacy controls in Settings. Authentication and data persistence arrive in a later update.' },
      { q: 'How do I change the appearance?', a: 'Open Settings → Appearance to adjust the theme, density, and other visual preferences. Changes apply instantly across the workspace.' },
      { q: 'How do I get support?', a: 'Use the Contact section on this page to reach the XOVA team. We typically respond within one business day.' },
    ],
  },
];
