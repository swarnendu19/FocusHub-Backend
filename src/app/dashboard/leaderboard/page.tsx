"use client";

import { MobileHeader } from '@/components/layout/MobileHeader';
import { useStore } from '@/store/useStore';
import { LeaderboardEntry } from '@/types/adventure';
import { toast } from 'sonner';
import Link from 'next/link';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function LeaderboardPage() {
    const user = useStore((state) => state.user);
    const { leaderboard: allEntries, isLoading } = useLeaderboard();

    const topThree = allEntries.slice(0, 3);
    const tableEntries = allEntries.slice(3);

    const copyInviteLink = () => {
        navigator.clipboard.writeText('https://adventure-tracker.app/invite/captain-alex');
        toast.success('Invite link copied to clipboard!');
    };

    return (
        <>
            <MobileHeader title="Community Leaderboard" />
            <div className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                                Hall of Fame <span className="text-4xl">🏆</span>
                            </h2>
                            <p className="text-muted-foreground text-lg font-medium">
                                Top explorers making history this week!
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <select className="bg-card border-2 border-forest/20 rounded-xl text-sm font-bold text-foreground py-2 px-4 focus:ring-primary focus:border-primary cursor-pointer shadow-sm">
                                <option>Global Ranking</option>
                                <option>Friends Only</option>
                                <option>My Team</option>
                            </select>
                            <select className="bg-card border-2 border-forest/20 rounded-xl text-sm font-bold text-foreground py-2 px-4 focus:ring-primary focus:border-primary cursor-pointer shadow-sm">
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>All Time</option>
                            </select>
                        </div>
                    </header>

                    {/* Podium Section */}
                    <section className="w-full mb-8">
                        <div className="relative w-full flex items-end justify-center gap-4 md:gap-8 pt-20 pb-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center z-10">
                                <div className="relative mb-4">
                                    <div className="absolute -top-6 -right-2 bg-brick text-card size-8 rounded-full flex items-center justify-center font-bold border-2 border-forest shadow-sm z-20 rotate-12">
                                        2
                                    </div>
                                    <div className="size-20 md:size-24 rounded-full border-4 border-forest bg-card overflow-hidden shadow-hard">
                                        <img alt="Avatar" className="w-full h-full object-cover" src={topThree[1]?.avatarUrl} />
                                    </div>
                                    <div className="absolute -bottom-2 inset-x-0 mx-auto w-fit bg-card px-3 py-1 rounded-full border border-forest text-xs font-bold text-foreground shadow-sm whitespace-nowrap">
                                        {topThree[1]?.username}
                                    </div>
                                </div>
                                <div className="w-24 md:w-32 podium-2 bg-card border-2 border-forest rounded-t-2xl shadow-hard flex flex-col items-center justify-end pb-4 relative overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-4 bg-brick/10 border-b-2 border-dashed border-forest/10" />
                                    <div className="text-3xl font-black text-foreground/20 mb-2">2</div>
                                    <div className="bg-brick/10 px-3 py-1 rounded-lg border border-brick/20">
                                        <span className="text-sm font-bold text-brick">{topThree[1]?.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center z-20 -mt-8">
                                <div className="relative mb-4">
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl drop-shadow-sm animate-bounce">👑</span>
                                    <div className="absolute -top-6 -right-2 bg-primary text-foreground size-10 rounded-full flex items-center justify-center font-bold border-2 border-forest shadow-sm z-20 rotate-12 text-xl">
                                        1
                                    </div>
                                    <div className="size-28 md:size-32 rounded-full border-4 border-forest bg-card overflow-hidden shadow-hard-lg relative">
                                        <img alt="Avatar" className="w-full h-full object-cover" src={topThree[0]?.avatarUrl} />
                                        <div className="absolute inset-0 border-4 border-primary rounded-full opacity-50" />
                                    </div>
                                    <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit bg-primary px-4 py-1.5 rounded-full border-2 border-forest text-sm font-black text-foreground shadow-sm whitespace-nowrap">
                                        {topThree[0]?.username}
                                    </div>
                                </div>
                                <div className="w-28 md:w-40 podium-1 bg-primary border-2 border-forest rounded-t-2xl shadow-hard flex flex-col items-center justify-end pb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 scribble-bar text-card/20 bg-[length:12px_12px] opacity-30" />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="text-5xl font-black text-foreground/20 mb-2">1</div>
                                        <div className="bg-card/90 px-4 py-1.5 rounded-xl border-2 border-forest/10 shadow-sm backdrop-blur-sm">
                                            <span className="text-lg font-black text-foreground">{topThree[0]?.time}</span>
                                        </div>
                                        <div className="mt-2 text-xs font-bold text-foreground/60">{topThree[0]?.xp} XP</div>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center z-10">
                                <div className="relative mb-4">
                                    <div className="absolute -top-6 -right-2 bg-forest text-card size-8 rounded-full flex items-center justify-center font-bold border-2 border-forest shadow-sm z-20 -rotate-6">
                                        3
                                    </div>
                                    <div className="size-20 md:size-24 rounded-full border-4 border-forest bg-card overflow-hidden shadow-hard">
                                        <img alt="Avatar" className="w-full h-full object-cover" src={topThree[2]?.avatarUrl} />
                                    </div>
                                    <div className="absolute -bottom-2 inset-x-0 mx-auto w-fit bg-card px-3 py-1 rounded-full border border-forest text-xs font-bold text-foreground shadow-sm whitespace-nowrap">
                                        {topThree[2]?.username}
                                    </div>
                                </div>
                                <div className="w-24 md:w-32 podium-3 bg-card border-2 border-forest rounded-t-2xl shadow-hard flex flex-col items-center justify-end pb-4 relative overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-4 bg-forest/5 border-b-2 border-dashed border-forest/10" />
                                    <div className="text-3xl font-black text-foreground/20 mb-2">3</div>
                                    <div className="bg-forest/5 px-3 py-1 rounded-lg border border-forest/10">
                                        <span className="text-sm font-bold text-foreground">{topThree[2]?.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Table and Side Cards */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Leaderboard Table */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <div className="bg-card rounded-[2rem] border-2 border-forest shadow-hard p-1 md:p-2 overflow-hidden">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-forest/10">
                                                <th className="p-4 pl-6 text-sm font-bold text-foreground/50 uppercase tracking-wide w-16">Rank</th>
                                                <th className="p-4 text-sm font-bold text-foreground/50 uppercase tracking-wide">Explorer</th>
                                                <th className="p-4 text-sm font-bold text-foreground/50 uppercase tracking-wide text-center">Lvl</th>
                                                <th className="p-4 text-sm font-bold text-foreground/50 uppercase tracking-wide text-right">Time</th>
                                                <th className="p-4 pr-6 text-sm font-bold text-foreground/50 uppercase tracking-wide text-right">XP</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-dashed divide-forest/5">
                                            {tableEntries.map((entry) => (
                                                <tr
                                                    key={entry.rank}
                                                    className={`group transition-colors ${entry.isCurrentUser
                                                        ? 'bg-primary/10 border-l-4 border-l-primary'
                                                        : 'hover:bg-primary/5'
                                                        }`}
                                                >
                                                    <td className={`p-4 pl-6 font-black text-xl ${entry.isCurrentUser ? 'text-primary' : 'text-foreground/40'
                                                        }`}>
                                                        {entry.rank}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`size-10 rounded-full border-2 bg-card overflow-hidden shrink-0 ${entry.isCurrentUser ? 'border-primary' : 'border-forest'
                                                                }`}>
                                                                <img alt="Avatar" className="w-full h-full object-cover" src={entry.avatarUrl} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-foreground">{entry.name}</span>
                                                                <span className="text-xs text-muted-foreground">{entry.role}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md border text-foreground text-xs font-bold ${entry.isCurrentUser
                                                            ? 'bg-primary/20 border-primary/20'
                                                            : 'bg-forest/5 border-forest/10'
                                                            }`}>
                                                            {entry.level}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right font-bold text-foreground">{entry.time}</td>
                                                    <td className="p-4 pr-6 text-right font-bold text-primary">{entry.xp.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 border-t-2 border-forest/10 flex justify-center">
                                    <button className="text-foreground font-bold hover:bg-forest/5 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
                                        View More Explorers
                                        <span className="material-symbols-outlined text-lg">expand_more</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Side Cards */}
                        <div className="flex flex-col gap-6">
                            {/* Your Ranking Card */}
                            <div className="bg-primary text-foreground rounded-[2rem] border-2 border-forest shadow-hard p-6 relative overflow-hidden">
                                <div className="absolute -right-12 -top-12 size-40 bg-card/20 rounded-full blur-2xl" />
                                <div className="absolute -left-12 -bottom-12 size-40 bg-card/20 rounded-full blur-2xl" />
                                <h3 className="text-xl font-bold mb-4 relative z-10">Your Ranking</h3>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold opacity-70">Current Rank</span>
                                        <span className="text-5xl font-black">#6</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold opacity-70">Top</span>
                                        <span className="text-3xl font-black">5%</span>
                                    </div>
                                </div>
                                <div className="bg-card/40 rounded-xl p-4 border border-forest/10 relative z-10 backdrop-blur-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold">Next Rank: #5</span>
                                        <span className="text-xs font-bold">1h 25m to go!</span>
                                    </div>
                                    <div className="w-full bg-card/50 rounded-full h-3 border border-forest/10 overflow-hidden">
                                        <div className="bg-forest h-full scribble-bar text-forest/50" style={{ width: '85%' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Rare Badges Card */}
                            <div className="bg-card rounded-[2rem] border-2 border-forest shadow-hard p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-foreground">Rare Badges</h3>
                                    <Link className="text-primary hover:text-primary/80" href="/dashboard/badges">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-forest/10 hover:border-forest/30 hover:bg-muted transition-all cursor-pointer group">
                                        <div className="size-12 rounded-full bg-brick/10 border-2 border-brick/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            🔥
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground">Week Streak Master</span>
                                            <span className="text-xs text-muted-foreground">Log time for 7 days straight</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-forest/10 hover:border-forest/30 hover:bg-muted transition-all cursor-pointer group">
                                        <div className="size-12 rounded-full bg-forest/10 border-2 border-forest/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            🦉
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground">Night Owl</span>
                                            <span className="text-xs text-muted-foreground">Focus session after 10 PM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-forest/10 hover:border-forest/30 hover:bg-muted transition-all cursor-pointer group">
                                        <div className="size-12 rounded-full bg-primary/20 border-2 border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            🌅
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground">Early Bird</span>
                                            <span className="text-xs text-muted-foreground">Start before 7 AM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Invite Card */}
                            <div className="bg-brick text-card rounded-[2rem] border-2 border-forest shadow-hard p-6 relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 size-24 bg-card/10 rounded-full" />
                                <h3 className="text-xl font-bold mb-2">Invite Crew Members</h3>
                                <p className="text-sm opacity-80 mb-4">
                                    Earn +100 XP for every friend who joins your adventure!
                                </p>
                                <button
                                    onClick={copyInviteLink}
                                    className="w-full bg-card text-forest font-bold py-3 rounded-xl border-2 border-forest hover:bg-card/90 transition-all"
                                >
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
