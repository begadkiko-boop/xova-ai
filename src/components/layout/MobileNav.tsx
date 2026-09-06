import {
  Plus,
  MessageSquare,
  Image,
  FileText,
  FolderKanban,
  Settings,
  HelpCircle,
  X,
  Search,
  Pin,
  User,
  LogOut,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useWorkspace } from '@/context/WorkspaceContext';
import { chatHistory } from '@/data/demoData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { ViewId } from '@/types';

const navItems: { id: ViewId; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'New Chat', icon: MessageSquare },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'files', label: 'Files', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export function MobileNav() {
  const {
    mobileNavOpen,
    setMobileNavOpen,
    view,
    setView,
    setActiveChatId,
  } = useWorkspace();
  const [search, setSearch] = useState('');

  if (!mobileNavOpen) return null;

  const filtered = chatHistory.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleNav = (id: ViewId) => {
    setView(id);
    if (id === 'chat') setActiveChatId(null);
    setMobileNavOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-ink-970/80 backdrop-blur-sm animate-fade-in"
        onClick={() => setMobileNavOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-[85%] max-w-80 bg-ink-960 border-r border-white/[0.06] flex flex-col animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0">
          <Logo size="md" />
          <button
            onClick={() => setMobileNavOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-3 pt-2 pb-3">
          <button
            onClick={() => handleNav('chat')}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 hover:bg-white/[0.06] transition-colors"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow">
              <Plus className="h-4 w-4 text-white" />
            </span>
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats…"
              className="w-full rounded-lg border border-white/[0.06] bg-ink-900/60 py-2 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3">
          {filtered.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                setView('chat');
                setMobileNavOpen(false);
              }}
              className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-white/[0.04] transition-colors"
            >
              <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-500" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {chat.pinned && <Pin className="h-3 w-3 text-xova-400" />}
                  <p className="truncate text-sm font-medium text-ink-200">
                    {chat.title}
                  </p>
                </div>
                <p className="truncate text-xs text-ink-500 mt-0.5">
                  {chat.timestamp}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Nav */}
        <div className="shrink-0 border-t border-white/[0.06] px-3 py-3 space-y-0.5">
          {navItems.slice(1).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  view === item.id
                    ? 'bg-white/[0.06] text-white'
                    : 'text-ink-300 hover:bg-white/[0.04]'
                )}
              >
                <Icon className="h-5 w-5 text-ink-400" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* User */}
        <div className="shrink-0 border-t border-white/[0.06] p-3">
          <button className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-white/[0.04] transition-colors">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-xova-500 to-accent-500 text-sm font-bold text-white">
              BG
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-white">Begad</p>
              <p className="truncate text-xs text-ink-500">Free plan</p>
            </div>
            <LogOut className="h-4 w-4 text-ink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
