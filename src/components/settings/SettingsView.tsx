import { useState } from 'react';
import {
  Settings2,
  Palette,
  Bell,
  Globe,
  Shield,
  Lock,
  User,
  Moon,
  Sun,
  Monitor,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { cn } from '@/lib/utils';

type SettingsSection =
  | 'general'
  | 'appearance'
  | 'notifications'
  | 'language'
  | 'privacy'
  | 'security'
  | 'account';

const sections: { id: SettingsSection; label: string; icon: typeof Settings2; description: string }[] = [
  { id: 'general', label: 'General', icon: Settings2, description: 'Workspace preferences' },
  { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme and display' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts and updates' },
  { id: 'language', label: 'Language', icon: Globe, description: 'Region and locale' },
  { id: 'privacy', label: 'Privacy', icon: Shield, description: 'Data and visibility' },
  { id: 'security', label: 'Security', icon: Lock, description: 'Access and protection' },
  { id: 'account', label: 'Account', icon: User, description: 'Profile and billing' },
];

export function SettingsView() {
  const [active, setActive] = useState<SettingsSection>('general');

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Section list */}
      <div className="shrink-0 border-b border-white/[0.06] lg:border-b-0 lg:border-r lg:w-72 lg:max-h-full">
        <div className="p-4 lg:p-5">
          <h2 className="mb-3 px-2 text-sm font-semibold text-white">Settings</h2>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible scrollbar-thin">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    active === s.id
                      ? 'bg-white/[0.06] text-white'
                      : 'text-ink-300 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4.5 w-4.5',
                      active === s.id ? 'text-xova-400' : 'text-ink-400'
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="hidden lg:block text-xs text-ink-500 truncate">
                      {s.description}
                    </p>
                  </div>
                  <ChevronRight className="hidden lg:block ml-auto h-4 w-4 text-ink-600" />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl animate-fade-in" key={active}>
          {active === 'general' && <GeneralSettings />}
          {active === 'appearance' && <AppearanceSettings />}
          {active === 'notifications' && <NotificationSettings />}
          {active === 'language' && <LanguageSettings />}
          {active === 'privacy' && <PrivacySettings />}
          {active === 'security' && <SecuritySettings />}
          {active === 'account' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-500">
        {title}
      </h3>
      <div className="glass-card divide-y divide-white/[0.04]">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-100">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-ink-500">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function GeneralSettings() {
  const [sendOnEnter, setSendOnEnter] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">General</h2>
      <p className="text-sm text-ink-400 mb-6">Workspace and behavior preferences.</p>

      <SettingsGroup title="Chat behavior">
        <SettingRow label="Send on Enter" description="Press Enter to send, Shift+Enter for newline">
          <Toggle checked={sendOnEnter} onChange={setSendOnEnter} />
        </SettingRow>
        <SettingRow label="Auto-save conversations" description="Automatically save your chats">
          <Toggle checked={autoSave} onChange={setAutoSave} />
        </SettingRow>
        <SettingRow label="Compact mode" description="Reduce spacing for denser layout">
          <Toggle checked={compact} onChange={setCompact} />
        </SettingRow>
      </SettingsGroup>

      <SettingsGroup title="Workspace">
        <SettingRow label="Default model" description="Model used for new conversations">
          <select className="rounded-lg border border-white/[0.06] bg-ink-800 px-3 py-1.5 text-sm text-ink-100 focus:border-xova-500/40 focus:outline-none">
            <option>XOVA Standard</option>
            <option>XOVA Pro</option>
            <option>XOVA Lite</option>
          </select>
        </SettingRow>
      </SettingsGroup>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [accent, setAccent] = useState('xova');
  const [fontSize, setFontSize] = useState('medium');

  const themes = [
    { id: 'dark' as const, label: 'Dark', icon: Moon },
    { id: 'light' as const, label: 'Light', icon: Sun },
    { id: 'system' as const, label: 'System', icon: Monitor },
  ];

  const accents = [
    { id: 'xova', color: 'bg-xova-500' },
    { id: 'accent', color: 'bg-accent-500' },
    { id: 'emerald', color: 'bg-emerald-500' },
    { id: 'rose', color: 'bg-rose-500' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Appearance</h2>
      <p className="text-sm text-ink-400 mb-6">Customize how XOVA looks.</p>

      <SettingsGroup title="Theme">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                    theme === t.id
                      ? 'border-xova-500/40 bg-xova-500/10'
                      : 'border-white/[0.06] bg-ink-900/40 hover:border-white/12'
                  )}
                >
                  <Icon className={cn('h-5 w-5', theme === t.id ? 'text-xova-400' : 'text-ink-400')} />
                  <span className={cn('text-sm font-medium', theme === t.id ? 'text-white' : 'text-ink-300')}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </SettingsGroup>

      <SettingsGroup title="Accent color">
        <div className="p-4">
          <div className="flex gap-3">
            {accents.map((a) => (
              <button
                key={a.id}
                onClick={() => setAccent(a.id)}
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-xl transition-transform hover:scale-110',
                  a.color,
                  accent === a.id && 'ring-2 ring-white/40 ring-offset-2 ring-offset-ink-900'
                )}
              >
                {accent === a.id && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
      </SettingsGroup>

      <SettingsGroup title="Typography">
        <SettingRow label="Font size" description="Adjust text size across the interface">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="rounded-lg border border-white/[0.06] bg-ink-800 px-3 py-1.5 text-sm text-ink-100 focus:border-xova-500/40 focus:outline-none"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </SettingRow>
      </SettingsGroup>
    </div>
  );
}

function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const [sound, setSound] = useState(false);
  const [mentions, setMentions] = useState(true);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
      <p className="text-sm text-ink-400 mb-6">Control how and when you get alerts.</p>

      <SettingsGroup title="Channels">
        <SettingRow label="Email notifications" description="Receive updates via email">
          <Toggle checked={email} onChange={setEmail} />
        </SettingRow>
        <SettingRow label="Desktop notifications" description="Browser push notifications">
          <Toggle checked={desktop} onChange={setDesktop} />
        </SettingRow>
        <SettingRow label="Sound" description="Play a sound on new messages">
          <Toggle checked={sound} onChange={setSound} />
        </SettingRow>
      </SettingsGroup>

      <SettingsGroup title="Activity">
        <SettingRow label="Mentions and replies" description="When someone mentions you">
          <Toggle checked={mentions} onChange={setMentions} />
        </SettingRow>
      </SettingsGroup>
    </div>
  );
}

function LanguageSettings() {
  const [lang, setLang] = useState('en');

  const languages = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'es', label: 'Español', flag: 'ES' },
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'de', label: 'Deutsch', flag: 'DE' },
    { code: 'ar', label: 'العربية', flag: 'AR' },
    { code: 'ja', label: '日本語', flag: 'JA' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Language</h2>
      <p className="text-sm text-ink-400 mb-6">Set your interface language and region.</p>

      <SettingsGroup title="Interface language">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 transition-all',
                lang === l.code
                  ? 'border-xova-500/40 bg-xova-500/10'
                  : 'border-white/[0.06] bg-ink-900/40 hover:border-white/12'
              )}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-800 text-xs font-bold text-ink-300">
                {l.flag}
              </span>
              <span className={cn('text-sm font-medium', lang === l.code ? 'text-white' : 'text-ink-300')}>
                {l.label}
              </span>
              {lang === l.code && <Check className="ml-auto h-4 w-4 text-xova-400" />}
            </button>
          ))}
        </div>
      </SettingsGroup>
    </div>
  );
}

function PrivacySettings() {
  const [history, setHistory] = useState(true);
  const [training, setTraining] = useState(false);
  const [share, setShare] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Privacy</h2>
      <p className="text-sm text-ink-400 mb-6">Control your data and visibility.</p>

      <SettingsGroup title="Data">
        <SettingRow label="Save chat history" description="Store conversations for future reference">
          <Toggle checked={history} onChange={setHistory} />
        </SettingRow>
        <SettingRow label="Allow training on my data" description="Help improve XOVA models">
          <Toggle checked={training} onChange={setTraining} />
        </SettingRow>
        <SettingRow label="Share usage analytics" description="Anonymous product improvement data">
          <Toggle checked={share} onChange={setShare} />
        </SettingRow>
      </SettingsGroup>

      <SettingsGroup title="Actions">
        <div className="p-4 space-y-2">
          <button className="w-full rounded-xl border border-white/[0.06] bg-ink-900/40 px-4 py-3 text-sm font-medium text-ink-200 hover:bg-ink-900/60 transition-colors text-left">
            Export my data
          </button>
          <button className="w-full rounded-xl border border-error-500/20 bg-error-500/10 px-4 py-3 text-sm font-medium text-error-400 hover:bg-error-500/20 transition-colors text-left">
            Delete all chat history
          </button>
        </div>
      </SettingsGroup>
    </div>
  );
}

function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);
  const [sessions, setSessions] = useState(true);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Security</h2>
      <p className="text-sm text-ink-400 mb-6">Protect your account and access.</p>

      <SettingsGroup title="Authentication">
        <SettingRow label="Two-factor authentication" description="Require a code at sign-in">
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </SettingRow>
        <SettingRow label="Active sessions" description="Show currently signed-in devices">
          <Toggle checked={sessions} onChange={setSessions} />
        </SettingRow>
      </SettingsGroup>

      <SettingsGroup title="Password">
        <div className="p-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-200">Current password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-2.5 text-sm text-ink-100 placeholder:text-ink-600 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-200">New password</label>
            <input
              type="password"
              placeholder="•••••••••"
              className="w-full rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-2.5 text-sm text-ink-100 placeholder:text-ink-600 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
          <button className="rounded-xl bg-ink-800 px-4 py-2.5 text-sm font-medium text-ink-300 hover:bg-ink-700 transition-colors">
            Update password
          </button>
        </div>
      </SettingsGroup>
    </div>
  );
}

function AccountSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Account</h2>
      <p className="text-sm text-ink-400 mb-6">Manage your profile and plan.</p>

      <SettingsGroup title="Profile">
        <div className="p-4 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-xova-500 to-accent-500 text-xl font-bold text-white">
            BG
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-white">Begad</p>
            <p className="text-sm text-ink-400">begad@xova.ai</p>
          </div>
          <button className="rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-2 text-sm font-medium text-ink-200 hover:bg-ink-800 transition-colors">
            Edit
          </button>
        </div>
      </SettingsGroup>

      <SettingsGroup title="Plan">
        <div className="p-4">
          <div className="rounded-xl border border-xova-500/20 bg-xova-500/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Free Plan</p>
                <p className="mt-0.5 text-xs text-ink-400">Limited daily messages and basic features</p>
              </div>
              <span className="rounded-full bg-xova-500/15 px-3 py-1 text-xs font-medium text-xova-300">
                Current
              </span>
            </div>
          </div>
          <button className="mt-3 w-full rounded-xl bg-gradient-to-b from-xova-400 to-xova-600 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:from-xova-300 hover:to-xova-500 transition-all">
            Upgrade to Pro
          </button>
        </div>
      </SettingsGroup>

      <SettingsGroup title="Danger zone">
        <div className="p-4">
          <button className="w-full rounded-xl border border-error-500/20 bg-error-500/10 px-4 py-3 text-sm font-medium text-error-400 hover:bg-error-500/20 transition-colors text-left">
            Delete account permanently
          </button>
        </div>
      </SettingsGroup>
    </div>
  );
}
