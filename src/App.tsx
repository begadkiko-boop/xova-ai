import { WorkspaceProvider, useWorkspace } from '@/context/WorkspaceContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Header } from '@/components/layout/Header';
import { ChatView } from '@/components/chat/ChatView';
import { ImageView } from '@/components/images/ImageView';
import { FileView } from '@/components/files/FileView';
import { ProjectView } from '@/components/projects/ProjectView';
import { SettingsView } from '@/components/settings/SettingsView';
import { HelpView } from '@/components/help/HelpView';
import { cn } from '@/lib/utils';

function Workspace() {
  const { view } = useWorkspace();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink-970 bg-noise">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div key={view} className="h-full animate-fade-in">
            {view === 'chat' && <ChatView />}
            {view === 'images' && <ImageView />}
            {view === 'files' && <FileView />}
            {view === 'projects' && <ProjectView />}
            {view === 'settings' && <SettingsView />}
            {view === 'help' && <HelpView />}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <WorkspaceProvider>
      <Workspace />
    </WorkspaceProvider>
  );
}
