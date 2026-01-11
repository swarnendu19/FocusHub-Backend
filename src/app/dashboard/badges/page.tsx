"use client";

import { useState } from 'react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { useBadges } from '@/hooks/useBadges';

type BadgeFilter = 'All Badges' | 'Focus & Time' | 'Streaks' | 'Milestones';

export default function BadgesPage() {
    const { badges, isLoading } = useBadges();
    const [filter, setFilter] = useState<BadgeFilter>('All Badges');

    const earnedBadges = badges.filter((b) => b.earned);
    const recentBadges = earnedBadges.slice(0, 3);

    const filteredBadges = filter === 'All Badges'
        ? badges
        : badges.filter((b) => b.category === filter);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <>
            <MobileHeader title="My Collection" />
            <div className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                                    Badge Book
                                </h2>
                                <span className="text-4xl animate-bounce">🏆</span>
                            </div>
                            <p className="text-muted-foreground text-lg font-medium">
                                A scrapbook of your glorious achievements.
                            </p>
                        </div>
                        <div className="bg-card px-5 py-3 rounded-2xl border-2 border-forest shadow-hard-sm flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Earned</span>
                                <span className="text-xl font-black text-foreground">
                                    {earnedBadges.length} <span className="text-foreground/40 text-base">/ {badges.length}</span>
                                </span>
                            </div>
                            <div className="h-8 w-px bg-forest/10" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Next Reward</span>
                                <span className="text-sm font-bold text-primary">Lvl 13 Master</span>
                            </div>
                        </div>
                    </header>

                    {/* Freshly Printed Section */}
                    <section className="w-full relative">
                        <div className="absolute -top-6 -right-6 text-brick/20 rotate-12 z-0 hidden lg:block">
                            <span className="material-symbols-outlined text-[120px]">verified</span>
                        </div>
                        <div className="bg-card rounded-[2rem] border-2 border-forest shadow-hard p-8 relative z-10 overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-32 h-8 tape rotate-[-2deg] z-20" />
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-brick">new_releases</span>
                                <h3 className="text-2xl font-bold text-foreground">Freshly Printed</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recentBadges.map((badge, index) => (
                                    <div
                                        key={badge.id}
                                        className="group relative bg-muted p-6 rounded-2xl border-2 border-forest border-dashed hover:border-solid hover:bg-card hover:shadow-hard-sm transition-all duration-300 flex flex-col items-center text-center gap-4"
                                    >
                                        {index === 0 && (
                                            <div className="absolute top-3 right-3 text-brick font-bold text-xs uppercase tracking-widest rotate-6 border border-brick px-2 rounded-sm bg-brick/5">
                                                New!
                                            </div>
                                        )}
                                        <div className="relative">
                                            {index === 0 && (
                                                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                                            )}
                                            <div className={`size-20 rounded-full border-2 border-forest flex items-center justify-center relative shadow-sm group-hover:scale-110 transition-transform duration-300 ${badge.bgColor}`}>
                                                <span className={`material-symbols-outlined text-4xl ${badge.bgColor.includes('brick') || badge.bgColor.includes('9dc2ad') ? 'text-card' : 'text-foreground'
                                                    }`}>
                                                    {badge.icon}
                                                </span>
                                            </div>
                                            {index === 0 && (
                                                <div className="absolute -bottom-2 -right-2 bg-card rounded-full border-2 border-forest p-1">
                                                    <span className="material-symbols-outlined text-sm text-foreground">star</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-foreground">{badge.name}</h4>
                                            <p className="text-sm text-muted-foreground font-medium">{badge.description}</p>
                                        </div>
                                        <div className="text-xs font-bold text-foreground/40 mt-auto">
                                            Earned {badge.earnedAt ? formatDate(badge.earnedAt) : 'Recently'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {(['All Badges', 'Focus & Time', 'Streaks', 'Milestones'] as BadgeFilter[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-xl font-bold border-2 transition-all ${filter === f
                                    ? 'bg-forest text-card border-forest shadow-hard-sm hover:translate-y-0.5 hover:shadow-none'
                                    : 'bg-card text-foreground border-forest hover:bg-forest/5'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Badge Grid */}
                    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {filteredBadges.map((badge) => (
                            <div
                                key={badge.id}
                                className={`rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all cursor-pointer ${badge.earned
                                    ? 'bg-card border-forest shadow-sm hover:shadow-hard hover:-translate-y-1'
                                    : 'bg-[hsl(48,20%,98%)] border-forest/20 border-dashed opacity-90 hover:opacity-100 hover:border-forest/50 group'
                                    }`}
                            >
                                <div className={`relative size-16 rounded-full border-2 flex items-center justify-center ${badge.earned
                                    ? `${badge.bgColor} border-forest`
                                    : 'bg-muted border-forest/10 border-dashed text-foreground/30 group-hover:bg-card group-hover:border-forest/30'
                                    }`}>
                                    <span className={`material-symbols-outlined text-3xl ${badge.earned
                                        ? badge.bgColor.includes('brick') || badge.bgColor.includes('9dc2ad') ? 'text-card' : 'text-foreground'
                                        : ''
                                        }`}>
                                        {badge.icon}
                                    </span>
                                    {!badge.earned && (
                                        <div className="absolute -right-1 -bottom-1 bg-card rounded-full p-0.5 border border-forest/10">
                                            <span className="material-symbols-outlined text-sm text-foreground/40">lock</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center w-full">
                                    <span className={`block font-bold text-sm ${badge.earned ? 'text-foreground' : 'text-foreground/60'}`}>
                                        {badge.name}
                                    </span>
                                    {badge.earned ? (
                                        <span className="text-[10px] font-bold text-foreground/50 uppercase">Earned</span>
                                    ) : (
                                        <div className="mt-2 w-full">
                                            <div className="flex justify-between text-[10px] font-bold text-foreground/40 mb-1">
                                                <span>{badge.progress}/{badge.total}</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${badge.category === 'Streaks' ? 'bg-brick/50' :
                                                        badge.category === 'Milestones' ? 'bg-primary/50' :
                                                            'bg-forest/40'
                                                        }`}
                                                    style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Secret Achievements */}
                    <section className="w-full mt-4">
                        <div className="w-full bg-forest/5 rounded-xl border-2 border-forest/10 border-dashed p-6 flex items-center justify-center gap-4 text-foreground/50 hover:bg-forest/10 transition-colors cursor-help">
                            <span className="material-symbols-outlined text-2xl">visibility_off</span>
                            <span className="font-bold text-sm">3 Secret Achievements Hidden... Keep exploring to unlock!</span>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
