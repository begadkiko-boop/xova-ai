import { useState, useRef, useEffect } from 'react';
import { ChatEmptyState } from '@/components/chat/ChatEmptyState';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { demoMessages } from '@/data/demoData';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { ChatMessage as ChatMessageType } from '@/types';

export function ChatView() {
  const { activeChatId } = useWorkspace();
  const [messages, setMessages] = useState<ChatMessageType[]>(demoMessages);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasConversation = activeChatId !== null || messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSend = (text: string) => {
    const userMsg: ChatMessageType = {
      id: `m${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      status: 'sent',
    };
    setMessages((prev) => [...prev, userMsg]);

    // Thinking state
    const thinkingId = `thinking-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        role: 'assistant',
        content: '',
        timestamp: '',
        status: 'thinking',
      },
    ]);
    setIsGenerating(true);

    // Simulate response
    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== thinkingId)
          .concat({
            id: `a${Date.now()}`,
            role: 'assistant',
            content:
              "Here's a response based on your request. This is a demo of the XOVA AI interface — the actual AI model will be connected in a later phase.\n\n**Key points:**\n- Your message was received\n- The interface supports rich formatting\n- Code blocks render with syntax highlighting\n\n```tsx\nconst greeting = 'Hello from XOVA';\nconsole.log(greeting);\n```",
            timestamp: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            }),
            status: 'sent',
            liked: null,
          })
      );
      setIsGenerating(false);
    }, 1800);
  };

  const handleRegenerate = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: 'thinking', content: '' }
          : m
      )
    );
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                status: 'sent',
                content:
                  'Here is a regenerated response. This demo shows the regenerate flow — the real model will produce fresh output when connected.',
                timestamp: new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                }),
              }
            : m
        )
      );
    }, 1500);
  };

  const handleLike = (id: string, liked: boolean) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, liked: m.liked === liked ? null : liked } : m
      )
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
        {!hasConversation ? (
          <ChatEmptyState onSuggestionClick={(title) => handleSend(title)} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onRegenerate={() => handleRegenerate(msg.id)}
                onLike={(liked) => handleLike(msg.id, liked)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <ChatComposer onSend={handleSend} disabled={isGenerating} />
    </div>
  );
}
