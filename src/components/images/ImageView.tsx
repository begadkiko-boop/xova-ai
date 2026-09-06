import { useState } from 'react';
import {
  Sparkles,
  Download,
  RotateCw,
  Trash2,
  Maximize2,
  X,
  Wand2,
} from 'lucide-react';
import { demoImages } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { ImageItem } from '@/types';

const aspectRatios = ['1:1', '16:9', '3:2', '4:3', '2:3', '9:16'];
const styles = ['Cinematic', 'Photoreal', 'Minimal', 'Abstract', '3D Render', 'Digital Art'];

export function ImageView() {
  const [prompt, setPrompt] = useState('');
  const [aspect, setAspect] = useState('1:1');
  const [style, setStyle] = useState('Cinematic');
  const [images, setImages] = useState<ImageItem[]>(demoImages);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<ImageItem | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newImage: ImageItem = {
        id: `i${Date.now()}`,
        prompt: prompt.trim(),
        src: '',
        aspect,
        style,
        createdAt: 'Just now',
      };
      setImages((prev) => [newImage, ...prev]);
      setPrompt('');
      setIsGenerating(false);
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (preview?.id === id) setPreview(null);
  };

  const handleRegenerate = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newImage: ImageItem = {
        ...img,
        id: `i${Date.now()}`,
        createdAt: 'Just now',
      };
      setImages((prev) => [newImage, ...prev.filter((i) => i.id !== id)]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Controls bar */}
      <div className="shrink-0 border-b border-white/[0.06] p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-3">
          {/* Prompt input */}
          <div className="gradient-border relative rounded-xl bg-ink-900/70 backdrop-blur-xl border border-white/[0.06]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder="Describe the image you want to create…"
              rows={2}
              className="w-full resize-none bg-transparent px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none scrollbar-thin"
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Aspect ratio */}
                <select
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value)}
                  className="rounded-lg border border-white/[0.06] bg-ink-800 px-2.5 py-1.5 text-xs text-ink-200 focus:border-xova-500/40 focus:outline-none"
                >
                  {aspectRatios.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {/* Style */}
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="rounded-lg border border-white/[0.06] bg-ink-800 px-2.5 py-1.5 text-xs text-ink-200 focus:border-xova-500/40 focus:outline-none"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="gap-1.5"
              >
                {isGenerating ? (
                  <RotateCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Wand2 className="h-3.5 w-3.5" />
                )}
                {isGenerating ? 'Generating…' : 'Generate'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
        <div className="mx-auto max-w-5xl">
          {images.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No images yet"
              description="Describe what you want to create and XOVA will generate it for you."
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  onPreview={() => setPreview(img)}
                  onDelete={() => handleDelete(img.id)}
                  onRegenerate={() => handleRegenerate(img.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview modal */}
      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        size="xl"
        title={preview?.prompt}
        description={`${preview?.aspect} · ${preview?.style} · ${preview?.createdAt}`}
      >
        {preview && (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-ink-800 to-ink-970 grid place-items-center">
              <ImagePlaceholder aspect={preview.aspect} large />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1.5"
                onClick={() => handleRegenerate(preview.id)}
              >
                <RotateCw className="h-3.5 w-3.5" /> Regenerate
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="gap-1.5"
                onClick={() => handleDelete(preview.id)}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ImageCard({
  image,
  onPreview,
  onDelete,
  onRegenerate,
}: {
  image: ImageItem;
  onPreview: () => void;
  onDelete: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/40 animate-fade-in-up">
      <div
        className="relative cursor-pointer"
        onClick={onPreview}
      >
        <ImagePlaceholder aspect={image.aspect} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-970/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink-900/80 backdrop-blur-sm text-white">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="truncate text-xs text-ink-300">{image.prompt}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[10px] text-ink-500">
            {image.aspect} · {image.style}
          </span>
          <div className="flex gap-1">
            <CardAction icon={Download} label="Download" />
            <CardAction icon={RotateCw} label="Regenerate" onClick={onRegenerate} />
            <CardAction icon={Trash2} label="Delete" onClick={onDelete} danger />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAction({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Download;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'grid h-7 w-7 place-items-center rounded-md text-ink-500 transition-colors hover:bg-white/[0.06]',
        danger ? 'hover:text-error-400' : 'hover:text-white'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function ImagePlaceholder({
  aspect,
  large,
}: {
  aspect: string;
  large?: boolean;
}) {
  const ratioMap: Record<string, string> = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]',
    '4:3': 'aspect-[4/3]',
    '2:3': 'aspect-[2/3]',
    '9:16': 'aspect-[9/16]',
  };
  return (
    <div
      className={cn(
        'w-full bg-gradient-to-br from-ink-800 via-ink-850 to-ink-970 grid place-items-center',
        ratioMap[aspect] || 'aspect-square'
      )}
    >
      <div className="text-center">
        <div
          className={cn(
            'mx-auto rounded-xl bg-gradient-to-br from-xova-500/20 to-accent-500/10 grid place-items-center',
            large ? 'h-20 w-20' : 'h-12 w-12'
          )}
        >
          <Sparkles className={cn('text-xova-400', large ? 'h-10 w-10' : 'h-6 w-6')} />
        </div>
      </div>
    </div>
  );
}
