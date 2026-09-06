import {
  Plus,
  MessageSquare,
  Search,
  FolderKanban,
  Image,
  FileText,
  Settings,
  HelpCircle,
  Pin,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Tooltip } from '@/components/ui/Tooltip';
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
];

const bottomItems: { id: ViewId; label: string; icon: typeof Settings }[] = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export function Sidebar() {
  const {
    view,
    setView,
    sidebarOpen,
    setSidebarOpen,
    setActiveChatId,
  } = useWorkspace();
  const [search, setSearch] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);

  const filtered = chatHistory.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filtered.filter((c) => c.pinned);
  const recent = filtered.filter((c) => !c.pinned);

  const handleNav = (id: ViewId) => {
    setView(id);
    if (id === 'chat') setActiveChatId(null);
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-white/[0.06] bg-ink-960/80 backdrop-blur-xl transition-[width] duration-300 ease-out',
        sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'
      )}
    >
      <div className="flex w-72 flex-col h-full">
        {/* Brand */}
        <div className="flex items-center justify-between px-4 h-16 shrink-0">
          <Logo size="md" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-white/[0.06] hover:text-white transition-colors focus-ring"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* New Chat button */}
        <div className="px-3 pt-2 pb-3">
          <button
            onClick={() => handleNav('chat')}
            className={cn(
              'group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-ring',
              view === 'chat'
                ? 'bg-xova-500/15 text-xova-300'
                : 'text-ink-200 hover:bg-white/[0.06] hover:text-white'
            )}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow">
              <Plus className="h-4 w-4 text-white" />
            </span>
            New Chat
            <Sparkles className="ml-auto h-3.5 w-3.5 text-xova-400/60" />
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
              className="w-full rounded-lg border border-white/[0.06] bg-ink-900/60 py-2 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 transition-colors focus:border-xova-500/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
          <div className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            {pinned.length > 0 && 'Pinned'}
          </div>
          {pinned.map((chat) => (
            <ChatHistoryItem key={chat.id} chat={chat} />
          ))}

          <div className="mt-3 mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            Recent
          </div>
          {recent.map((chat) => (
            <ChatHistoryItem key={chat.id} chat={chat} />
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-4 text-sm text-ink-500">No chats found.</p>
          )}
        </div>

        {/* Nav items */}
        <div className="shrink-0 border-t border-white/[0.06] px-3 py-3 space-y-0.5">
          {navItems.slice(1).map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={view === item.id}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </div>

        {/* Bottom items */}
        <div className="shrink-0 border-t border-white/[0.06] px-3 py-3 space-y-0.5">
          {bottomItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={view === item.id}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </div>

        {/* User profile */}
        <div className="relative shrink-0 border-t border-white/[0.06] p-3">
          {accountOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 glass-strong rounded-xl shadow-float p-1.5 animate-fade-in-up">
              <AccountMenuItem icon={User} label="Profile" />
              <AccountMenuItem icon={Settings} label="Account settings" onClick={() => { setView('settings'); setAccountOpen(false); }} />
              <div className="my-1 h-px bg-white/[0.06]" />
              <AccountMenuItem icon={LogOut} label="Log out" danger />
            </div>
          )}
          <button
            onClick={() => setAccountOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/[0.04] focus-ring"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-xova-500 to-accent-500 text-sm font-bold text-white">
              BG
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Begad</p>
              <p className="truncate text-xs text-ink-500">Free plan</p>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-ink-500 transition-transform',
                accountOpen && 'rotate-180'
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function ChatHistoryItem({ chat }: { chat: (typeof chatHistory)[0] }) {
  const { setActiveChatId, setView, activeChatId } = useWorkspace();
  return (
    <button
      onClick={() => {
        setActiveChatId(chat.id);
        setView('chat');
      }}
      className={cn(
        'group flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
        activeChatId === chat.id
          ? 'bg-white/[0.06]'
          : 'hover:bg-white/[0.04]'
      )}
    >
      <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-500" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {chat.pinned && <Pin className="h-3 w-3 text-xova-400" />}
          <p className="truncate text-sm font-medium text-ink-200 group-hover:text-white transition-colors">
            {chat.title}
          </p>
        </div>
        <p className="truncate text-xs text-ink-500 mt-0.5">{chat.timestamp}</p>
      </div>
    </button>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { id: ViewId; label: string; icon: typeof MessageSquare };
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus-ring',
        active
          ? 'bg-white/[0.06] text-white'
          : 'text-ink-300 hover:bg-white/[0.04] hover:text-white'
      )}
    >
      <Icon className={cn('h-4.5 w-4.5', active ? 'text-xova-400' : 'text-ink-400')} />
      {item.label}
    </button>
  );
}

function AccountMenuItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof User;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-white/[0.06]',
        danger ? 'text-error-400' : 'text-ink-200 hover:text-white'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export function SidebarToggle() {
  const { sidebarOpen, setSidebarOpen } = useWorkspace();
  if (sidebarOpen) return null;
  return (
    <Tooltip label="Open sidebar" side="right">
      <button
        onClick={() => setSidebarOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-white/[0.06] hover:text-white transition-colors focus-ring"
        aria-label="Open sidebar"
      >
        <PanelLeft className="h-5 w-5" />
      </button>
    </Tooltip>
  );
}
