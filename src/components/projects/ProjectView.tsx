import { useState } from 'react';
import {
  Plus,
  Search,
  FolderKanban,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Trash2,
  Calendar,
} from 'lucide-react';
import { demoProjects } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { ProjectItem } from '@/types';

export function ProjectView() {
  const [projects, setProjects] = useState<ProjectItem[]>(demoProjects);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newName.trim()) return;
    const project: ProjectItem = {
      id: `p${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim() || 'No description yet.',
      updatedAt: 'Just now',
      conversations: 0,
      files: 0,
      images: 0,
      color: 'xova',
    };
    setProjects((prev) => [project, ...prev]);
    setNewName('');
    setNewDesc('');
    setCreateOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="shrink-0 border-b border-white/[0.06] p-4 sm:p-6">
        <div className="mx-auto max-w-5xl flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-white/[0.06] bg-ink-900/60 py-2.5 pl-10 pr-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
          <Button
            variant="primary"
            onClick={() => setCreateOpen(true)}
            className="gap-2 shrink-0"
          >
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
        <div className="mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Create a project to organize your conversations, files, and images in one place."
              action={
                <Button variant="primary" onClick={() => setCreateOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" /> Create your first project
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Project"
        description="Organize conversations, files, and images under a shared workspace."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate} disabled={!newName.trim()}>
              Create Project
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-200">
              Project name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Product Launch"
              autoFocus
              className="w-full rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-200">
              Description <span className="text-ink-500">(optional)</span>
            </label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none scrollbar-thin"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ProjectCard({
  project,
  onDelete,
}: {
  project: ProjectItem;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group glass-card p-5 transition-all duration-300 hover:border-white/12 hover:bg-ink-900/60 hover:shadow-float hover:-translate-y-0.5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl',
            project.color === 'accent'
              ? 'bg-accent-500/10 text-accent-400'
              : 'bg-xova-500/10 text-xova-400'
          )}
        >
          <FolderKanban className="h-5 w-5" />
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label="Project menu"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-9 z-20 w-40 glass-strong rounded-xl shadow-float p-1.5 animate-fade-in-up">
                <button
                  onClick={() => {
                    onDelete();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-error-400 hover:bg-error-500/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <h3 className="mt-3 text-base font-semibold text-white">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-ink-400 leading-relaxed line-clamp-2">
        {project.description}
      </p>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" /> {project.conversations}
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" /> {project.files}
        </span>
        <span className="flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" /> {project.images}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.04] pt-3 text-xs text-ink-500">
        <Calendar className="h-3.5 w-3.5" />
        Updated {project.updatedAt}
      </div>
    </div>
  );
}
