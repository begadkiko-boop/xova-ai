import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { ViewId } from '@/types';

interface WorkspaceState {
  view: ViewId;
  setView: (v: ViewId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

const WorkspaceContext = createContext<WorkspaceState | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewId>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <WorkspaceContext.Provider
      value={{
        view,
        setView,
        sidebarOpen,
        setSidebarOpen,
        mobileNavOpen,
        setMobileNavOpen,
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx)
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}
