import { useState, useRef } from 'react';
import {
  Upload,
  Search,
  FileText,
  Image,
  FileSpreadsheet,
  Code2,
  Music,
  Video,
  Archive,
  FileType,
  File,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';
import { demoFiles } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { FileItem } from '@/types';

const typeIcons: Record<FileItem['type'], typeof File> = {
  pdf: FileText,
  image: Image,
  doc: FileType,
  sheet: FileSpreadsheet,
  code: Code2,
  audio: Music,
  video: Video,
  archive: Archive,
  text: File,
};

const typeColors: Record<FileItem['type'], string> = {
  pdf: 'text-error-400 bg-error-500/10',
  image: 'text-xova-400 bg-xova-500/10',
  doc: 'text-blue-400 bg-blue-500/10',
  sheet: 'text-success-400 bg-success-500/10',
  code: 'text-accent-400 bg-accent-500/10',
  audio: 'text-purple-400 bg-purple-500/10',
  video: 'text-pink-400 bg-pink-500/10',
  archive: 'text-ink-400 bg-ink-700',
  text: 'text-ink-300 bg-ink-700',
};

export function FileView() {
  const [files, setFiles] = useState<FileItem[]>(demoFiles);
  const [search, setSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const additions: FileItem[] = Array.from(newFiles).map((file, i) => ({
      id: `f${Date.now()}-${i}`,
      name: file.name,
      size: formatSize(file.size),
      type: getTypeFromName(file.name),
      uploadedAt: 'Just now',
      status: 'uploaded' as const,
    }));
    setFiles((prev) => [...additions, ...prev]);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Upload area + search */}
      <div className="shrink-0 border-b border-white/[0.06] p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleAddFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed py-8 px-4 text-center transition-all duration-200',
              isDragging
                ? 'border-xova-500/50 bg-xova-500/5'
                : 'border-white/[0.08] bg-ink-900/40 hover:border-white/15 hover:bg-ink-900/60'
            )}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleAddFiles(e.target.files)}
            />
            <div
              className={cn(
                'mb-3 grid h-14 w-14 place-items-center rounded-2xl transition-transform',
                isDragging
                  ? 'bg-xova-500/20 scale-110'
                  : 'bg-ink-800/60'
              )}
            >
              <UploadCloud
                className={cn(
                  'h-7 w-7 transition-colors',
                  isDragging ? 'text-xova-400' : 'text-ink-400'
                )}
              />
            </div>
            <p className="text-sm font-medium text-ink-200">
              {isDragging ? 'Drop to upload' : 'Drag and drop files here'}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              or click to browse — PDF, images, docs, code, and more
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files…"
              className="w-full rounded-xl border border-white/[0.06] bg-ink-900/60 py-2.5 pl-10 pr-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
        <div className="mx-auto max-w-4xl">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No files found"
              description="Upload files to see them listed here. Drag and drop or click the upload area."
            />
          ) : (
            <div className="space-y-2">
              {filtered.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  onDelete={() => handleDelete(file.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FileRow({
  file,
  onDelete,
}: {
  file: FileItem;
  onDelete: () => void;
}) {
  const Icon = typeIcons[file.type];
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-900/40 p-3 transition-all hover:border-white/12 hover:bg-ink-900/60 animate-fade-in-up">
      {/* Icon */}
      <div
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
          typeColors[file.type]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-100">{file.name}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-500">
          <span>{file.size}</span>
          <span className="h-1 w-1 rounded-full bg-ink-700" />
          <span>{file.uploadedAt}</span>
          {file.status === 'uploading' && (
            <>
              <span className="h-1 w-1 rounded-full bg-ink-700" />
              <span className="text-xova-400">Uploading {file.progress}%</span>
            </>
          )}
        </div>
      </div>

      {/* Status */}
      {file.status === 'uploaded' && (
        <CheckCircle2 className="h-4 w-4 text-success-500 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
      {file.status === 'failed' && (
        <AlertCircle className="h-4 w-4 text-error-400" />
      )}
      {file.status === 'uploading' && (
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-800">
          <div
            className="h-full rounded-full bg-xova-500 transition-all"
            style={{ width: `${file.progress || 0}%` }}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" /> Open
        </Button>
        <button
          onClick={onDelete}
          aria-label="Delete file"
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-error-500/10 hover:text-error-400 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 / 1024)).toFixed(1)} MB`;
}

function getTypeFromName(name: string): FileItem['type'] {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, FileItem['type']> = {
    pdf: 'pdf',
    png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', webp: 'image', svg: 'image',
    doc: 'doc', docx: 'doc',
    xls: 'sheet', xlsx: 'sheet', csv: 'sheet',
    js: 'code', ts: 'code', tsx: 'code', jsx: 'code', py: 'code', json: 'code', yaml: 'code', yml: 'code', html: 'code', css: 'code',
    mp3: 'audio', wav: 'audio', flac: 'audio',
    mp4: 'video', mov: 'video', avi: 'video',
    zip: 'archive', rar: 'archive', '7z': 'archive', tar: 'archive', gz: 'archive',
    txt: 'text', md: 'text',
  };
  return map[ext] || 'text';
}
