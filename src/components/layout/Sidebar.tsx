"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'cottage' },
  { path: '/dashboard/adventure', label: 'Adventure', icon: 'architecture' },
  { path: '/dashboard/badges', label: 'Badges', icon: 'military_tech' },
  { path: '/dashboard/leaderboard', label: 'Leaderboard', icon: 'trophy' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r-2 border-forest/10 bg-[hsl(48,20%,98%)] sticky top-0 h-screen overflow-y-auto z-20">
      <div className="flex flex-col h-full justify-between p-6">
        <div className="flex flex-col gap-6">
          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="relative size-12 shrink-0">
                <div className="absolute inset-0 bg-primary rounded-full translate-x-1 translate-y-1 border-2 border-forest"></div>
                {user.image ? (
                  <div
                    className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-forest bg-card"
                    style={{ backgroundImage: `url("${user.image}")` }}
                  />
                ) : (
                  <div className="relative flex items-center justify-center rounded-full size-12 border-2 border-forest bg-card text-forest font-bold text-xl">
                    {user.name?.[0] || "U"}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-foreground text-lg font-bold leading-tight">{user.name}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brick/10 border border-brick/20 text-brick text-xs font-bold">
                  Lvl 1 Explorer
                </span>
              </div>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-3 p-2 rounded-xl border-2 border-dashed border-forest/20 hover:border-forest hover:bg-forest/5 transition-all">
              <div className="size-10 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-forest">login</span>
              </div>
              <div className="font-bold text-forest">Login to Account</div>
            </Link>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-3 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'group flex items-center gap-4 px-4 py-3 rounded-xl transition-all border-2',
                    isActive
                      ? 'bg-primary shadow-hard border-forest hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-hard-sm'
                      : 'border-transparent hover:bg-forest/5 hover:border-forest/10'
                  )}
                >
                  <span className="material-symbols-outlined text-foreground">{item.icon}</span>
                  <span
                    className={cn(
                      'text-foreground text-base',
                      isActive ? 'font-bold' : 'font-medium'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          {/* New Adventure Button */}
          <Link
            href="/dashboard/adventure"
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-14 bg-card border-2 border-forest border-dashed text-foreground hover:bg-forest/5 hover:border-solid transition-all shadow-sm"
          >
            <span className="material-symbols-outlined mr-2">add_circle</span>
            <span className="font-bold">New Adventure</span>
          </Link>

          {user && (
            <button
              onClick={() => signOut()}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl h-10 text-brick hover:bg-brick/10 transition-all font-bold text-sm"
            >
              <span className="material-symbols-outlined mr-2 text-lg">logout</span>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

