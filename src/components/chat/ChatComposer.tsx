import { useState, useRef, type KeyboardEvent } from 'react';
import { Paperclip, ImageIcon, Mic, ArrowUp, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';

interface ChatComposerProps {
  onSend?: (text: string) => void;
  disabled?: boolean;
}

export function ChatComposer({ onSend, disabled }: ChatComposerProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend?.(text.trim());
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  return (
    <div className="px-3 pb-4 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="gradient-border relative rounded-2xl bg-ink-900/70 backdrop-blur-xl border border-white/[0.06] shadow-float transition-all focus-within:border-xova-500/30">
          {/* Text area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Ask XOVA anything…"
            rows={1}
            className="w-full resize-none bg-transparent px-4 pt-3.5 pb-1 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none scrollbar-thin"
            style={{ maxHeight: '200px' }}
          />

          {/* Toolbar */}
          <div className="flex items-center gap-1 px-2.5 pb-2.5 pt-1">
            <ComposerBtn icon={Paperclip} label="Attach file" />
            <ComposerBtn icon={ImageIcon} label="Attach image" />
            <ComposerBtn
              icon={Mic}
              label="Voice input"
              active={isRecording}
              onClick={() => setIsRecording((v) => !v)}
            />

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:block text-[11px] text-ink-600">
                <kbd className="rounded border border-white/10 px-1 py-0.5 text-[10px]">Enter</kbd> to send
              </span>
              <button
                onClick={handleSend}
                disabled={!text.trim() || disabled}
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-xl transition-all duration-200 focus-ring',
                  text.trim() && !disabled
                    ? 'bg-gradient-to-b from-xova-400 to-xova-600 text-white shadow-glow hover:from-xova-300 hover:to-xova-500 active:scale-95'
                    : 'bg-ink-800 text-ink-600 cursor-not-allowed'
                )}
                aria-label="Send message"
              >
                {disabled ? (
                  <Square className="h-4 w-4 fill-current" />
                ) : (
                  <ArrowUp className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-600">
          XOVA AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

function ComposerBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Paperclip;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Tooltip label={label} side="top">
      <button
        onClick={onClick}
        className={cn(
          'grid h-9 w-9 place-items-center rounded-lg transition-colors focus-ring',
          active
            ? 'bg-error-500/15 text-error-400'
            : 'text-ink-400 hover:bg-white/[0.06] hover:text-white'
        )}
        aria-label={label}
      >
        <Icon className="h-4.5 w-4.5" />
      </button>
    </Tooltip>
  );
}
