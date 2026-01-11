"use client";

import { MobileHeader } from '@/components/layout/MobileHeader';
import { TimerCard } from '@/components/dashboard/TimerCard';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { WeeklyChart } from '@/components/dashboard/WeeklyChart';
import { ActiveProjects } from '@/components/dashboard/ActiveProjects';
import { useStats } from '@/hooks/useStats';

export default function Dashboard() {
    const { user, isLoading } = useStats();

    return (
        <>
            <MobileHeader title="Explorer's Log" />
            <div className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                                Hello, Explorer! <span className="text-4xl">👋</span>
                            </h2>
                            <p className="text-muted-foreground text-lg font-medium">
                                Ready to create some magic today?
                            </p>
                        </div>
                        <div className="hidden md:flex">
                            <span className="text-sm font-bold bg-card px-4 py-2 rounded-full border border-forest/10 shadow-sm text-muted-foreground">
                                <span className="material-symbols-outlined align-middle text-lg mr-1">calendar_today</span>
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </header>

                    {/* Timer Section */}
                    <TimerCard />

                    {/* Stats Cards */}
                    <StatsCards />

                    {/* Activity Heatmap */}
                    <ActivityHeatmap />

                    {/* Weekly Chart & Active Projects */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <WeeklyChart />
                        <ActiveProjects />
                    </div>
                </div>
            </div>

            {/* Mobile FAB */}
            <button className="fixed bottom-6 right-6 lg:hidden size-14 rounded-full bg-primary text-foreground border-2 border-forest shadow-hard flex items-center justify-center z-50">
                <span className="material-symbols-outlined">add</span>
            </button>
        </>
    );
}
