"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'cottage' },
  { path: '/adventure', label: 'Adventure', icon: 'architecture' },
  { path: '/badges', label: 'Badges', icon: 'military_tech' },
  { path: '/leaderboard', label: 'Leaderboard', icon: 'trophy' },
];

interface MobileHeaderProps {
  title: string;
}

export function MobileHeader({ title }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 border-b-2 border-forest/10 bg-card sticky top-0 z-30">
        <div className="font-bold text-xl text-foreground">{title}</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-foreground bg-primary/20 rounded-lg"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] bg-background/95 backdrop-blur z-50 p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-4 px-4 py-4 rounded-xl transition-all border-2',
                    isActive
                      ? 'bg-primary shadow-hard border-forest'
                      : 'bg-card border-forest/10 hover:bg-forest/5'
                  )}
                >
                  <span className="material-symbols-outlined text-foreground">{item.icon}</span>
                  <span
                    className={cn(
                      'text-foreground text-lg',
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
      )}
    </>
  );
}

