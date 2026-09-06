export type ViewId =
  | 'chat'
  | 'images'
  | 'files'
  | 'projects'
  | 'settings'
  | 'help';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status?: 'sending' | 'thinking' | 'error' | 'sent';
  liked?: boolean | null;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  pinned?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  conversations: number;
  files: number;
  images: number;
  color: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc' | 'sheet' | 'code' | 'audio' | 'video' | 'archive' | 'text';
  uploadedAt: string;
  status: 'uploaded' | 'uploading' | 'failed';
  progress?: number;
}

export interface ImageItem {
  id: string;
  prompt: string;
  src: string;
  aspect: string;
  style: string;
  createdAt: string;
}

export interface SuggestionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}
