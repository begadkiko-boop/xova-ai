import { Menu, PanelLeft } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { SidebarToggle } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';
import type { ViewId } from '@/types';

const viewTitles: Record<ViewId, { title: string; subtitle: string }> = {
  chat: { title: 'Chat', subtitle: 'Conversation workspace' },
  images: { title: 'Images', subtitle: 'Generate and manage visuals' },
  files: { title: 'Files', subtitle: 'Upload and organize documents' },
  projects: { title: 'Projects', subtitle: 'Organize your workspace' },
  settings: { title: 'Settings', subtitle: 'Customize your experience' },
  help: { title: 'Help', subtitle: 'Guides and support' },
};

export function Header() {
  const { view, setMobileNavOpen, sidebarOpen } = useWorkspace();
  const meta = viewTitles[view];

  return (
    <header
      className={cn(
        'flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-ink-970/60 backdrop-blur-xl px-4 lg:px-6',
        !sidebarOpen && 'lg:pl-4'
      )}
    >
      {/* Mobile menu */}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-white/[0.06] hover:text-white transition-colors lg:hidden focus-ring"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop expand */}
      <div className="hidden lg:block">
        <SidebarToggle />
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-white truncate">
          {meta.title}
        </h1>
        <p className="text-xs text-ink-500 truncate hidden sm:block">
          {meta.subtitle}
        </p>
      </div>

      {/* Status pill */}
      <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.06] bg-ink-900/60 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-success-500 animate-pulse-soft" />
        <span className="text-xs font-medium text-ink-300">All systems operational</span>
      </div>
    </header>
  );
}
