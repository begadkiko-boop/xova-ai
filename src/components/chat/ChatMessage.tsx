import { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Brain,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types';

interface Props {
  message: ChatMessageType;
  onRegenerate?: () => void;
  onLike?: (liked: boolean) => void;
}

export function ChatMessage({ message, onRegenerate, onLike }: Props) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group flex gap-3 sm:gap-4 animate-fade-in-up',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'grid h-8 w-8 shrink-0 place-items-center rounded-lg',
          isUser
            ? 'bg-gradient-to-br from-accent-500 to-accent-600'
            : 'bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none">
            <path
              d="M8 8L16 16L24 8M8 24L16 16L24 24"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className={cn('min-w-0 flex-1', isUser && 'flex flex-col items-end')}>
        <div
          className={cn(
            'inline-block max-w-full rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-xova-500/10 border border-xova-500/20 text-ink-100 rounded-tr-sm'
              : 'glass-card text-ink-100 rounded-tl-sm'
          )}
        >
          {message.status === 'thinking' ? (
            <ThinkingIndicator />
          ) : message.status === 'error' ? (
            <ErrorMessage />
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>

        {/* Timestamp + actions */}
        {message.status !== 'thinking' && (
          <div
            className={cn(
              'mt-1.5 flex items-center gap-1 px-1',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <span className="text-[11px] text-ink-500">{message.timestamp}</span>
            {!isUser && message.status !== 'error' && (
              <>
                <ActionBtn icon={copied ? Check : Copy} label="Copy" onClick={handleCopy} active={copied} />
                <ActionBtn icon={RotateCw} label="Regenerate" onClick={onRegenerate} />
                <ActionBtn
                  icon={ThumbsUp}
                  label="Good response"
                  onClick={() => onLike?.(true)}
                  active={message.liked === true}
                />
                <ActionBtn
                  icon={ThumbsDown}
                  label="Bad response"
                  onClick={() => onLike?.(false)}
                  active={message.liked === false}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: typeof Copy;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'grid h-7 w-7 place-items-center rounded-md text-ink-500 transition-colors hover:bg-white/[0.06] hover:text-white',
        active && 'text-xova-400'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <Brain className="h-4 w-4 text-xova-400 animate-pulse-soft" />
      <span className="text-sm text-ink-400">XOVA is thinking</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-xova-400 animate-bounce-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <AlertCircle className="h-4 w-4 text-error-400" />
      <span className="text-sm text-error-400">
        Something went wrong. Please try again.
      </span>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const lines = part.replace(/```\w*\n?/, '').replace(/```$/, '');
          const lang = part.match(/```(\w+)/)?.[1] || '';
          return <CodeBlock key={i} code={lines} lang={lang} />;
        }
        return <FormattedText key={i} text={part} />;
      })}
    </div>
  );
}

function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="font-semibold text-white">
              {line.slice(2, -2)}
            </p>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-xova-400" />
              <span>{line.slice(2)}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          return (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-medium text-xova-400">
                {line.match(/^\d+/)?.[0]}.
              </span>
              <span>{line.replace(/^\d+\.\s/, '')}</span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        return <p key={i}>{line}</p>
      })}
    </div>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-white/[0.08] bg-ink-970">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-1.5">
        <span className="text-xs font-medium text-ink-400">{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-ink-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono text-ink-200">{code}</code>
      </pre>
    </div>
  );
}
