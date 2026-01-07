import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-row bg-paper">
      <Sidebar />
      <main className="flex-1 flex flex-col max-w-full">
        {children}
      </main>
    </div>
  );
}
