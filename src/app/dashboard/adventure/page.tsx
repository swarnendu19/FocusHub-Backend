"use client";

import { useState } from 'react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { Adventure } from '@/types/adventure';
import { useAdventures } from '@/hooks/useAdventures';
import { toast } from 'sonner';

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    Development: { bg: 'bg-forest/10', text: 'text-forest', border: 'border-forest/5' },
    Design: { bg: 'bg-brick/10', text: 'text-brick', border: 'border-brick/5' },
    Product: { bg: 'bg-forest/10', text: 'text-forest', border: 'border-forest/5' },
    Art: { bg: 'bg-primary/20', text: 'text-foreground', border: 'border-primary/20' },
    Marketing: { bg: 'bg-brick/10', text: 'text-brick', border: 'border-brick/5' },
    Other: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-muted' },
};

export default function AdventurePage() {
    const { adventures, isLoading, createAdventure, deleteAdventure } = useAdventures();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAdventure, setNewAdventure] = useState({
        name: '',
        description: '',
        category: 'Development' as Adventure['category'],
        priority: 'Medium' as Adventure['priority'],
        targetTime: 600,
    });

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins}m`;
        return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    };

    const filteredAdventures = adventures.filter((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateAdventure = () => {
        const icons: Record<string, string> = {
            Development: 'rocket_launch',
            Design: 'palette',
            Product: 'menu_book',
            Art: 'brush',
            Marketing: 'campaign',
            Other: 'star',
        };

        createAdventure.mutate({
            name: newAdventure.name,
            description: newAdventure.description,
            category: newAdventure.category,
            priority: newAdventure.priority,
            targetTime: newAdventure.targetTime,
            icon: icons[newAdventure.category],
        }, {
            onSuccess: () => {
                toast.success('New adventure started!', {
                    description: 'Time to make some magic happen.',
                });
                setIsModalOpen(false);
                setNewAdventure({
                    name: '',
                    description: '',
                    category: 'Development',
                    priority: 'Medium',
                    targetTime: 600,
                });
            },
            onError: () => {
                toast.error('Failed to create adventure', {
                    description: 'Please try again later.',
                });
            }
        });
    };

    const handleDelete = (id: string) => {
        deleteAdventure.mutate(id, {
            onSuccess: () => {
                toast.success('Adventure deleted');
            },
            onError: () => {
                toast.error('Failed to delete adventure');
            }
        });
    };

    return (
        <>
            <MobileHeader title="Adventures" />
            <div className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight relative w-fit">
                                Adventure Blueprints
                                <svg className="absolute -bottom-2 -right-4 w-12 text-primary" fill="currentColor" viewBox="0 0 100 20">
                                    <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="8" />
                                </svg>
                            </h2>
                            <p className="text-muted-foreground text-lg font-medium">
                                Manage your quests, side-missions, and big ideas.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Find adventure..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-3 rounded-xl border-2 border-forest/10 bg-card focus:border-forest focus:ring-0 placeholder:text-foreground/40 text-foreground font-bold w-full md:w-64 shadow-sm hover:shadow-md transition-shadow"
                                />
                            </div>
                            <button className="p-3 bg-card border-2 border-forest/10 rounded-xl hover:border-forest hover:shadow-hard-sm transition-all text-foreground">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </header>

                    {/* Adventure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {isLoading ? (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                Loading adventures...
                            </div>
                        ) : (
                            filteredAdventures.map((adventure) => {
                                const catColors = categoryColors[adventure.category];
                                return (
                                    <div
                                        key={adventure.id}
                                        className="group bg-card rounded-[2rem] border-2 border-forest shadow-hard p-6 flex flex-col gap-5 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-hard-lg"
                                    >
                                        <div className={`absolute -right-6 -top-6 size-24 rounded-full transition-colors ${adventure.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' :
                                            adventure.color === 'brick' ? 'bg-brick/10 group-hover:bg-brick/20' :
                                                'bg-forest/5 group-hover:bg-forest/10'
                                            }`} />

                                        <div className="flex justify-between items-start relative z-10">
                                            <div className={`size-14 rounded-full border-2 border-forest/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${adventure.color === 'primary' ? 'bg-primary/20' :
                                                adventure.color === 'brick' ? 'bg-brick/10' :
                                                    'bg-forest/10'
                                                }`}>
                                                <span className={`material-symbols-outlined text-3xl ${adventure.color === 'brick' ? 'text-brick' : 'text-foreground'
                                                    }`}>{adventure.icon}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(adventure.id)}
                                                className="size-8 flex items-center justify-center rounded-full hover:bg-forest/5 text-foreground/40 hover:text-brick transition-colors"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className={`${catColors.bg} ${catColors.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${catColors.border}`}>
                                                    {adventure.category}
                                                </span>
                                                {adventure.priority === 'High' && (
                                                    <span className="bg-brick/10 text-brick text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-brick/10">
                                                        High Priority
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className={`text-2xl font-bold text-foreground transition-colors ${adventure.color === 'brick' ? 'group-hover:text-brick' :
                                                adventure.color === 'primary' ? 'group-hover:text-primary' :
                                                    'group-hover:text-foreground/80'
                                                }`}>
                                                {adventure.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                                {adventure.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-col gap-3">
                                            <div className="flex justify-between text-xs font-bold text-foreground/70">
                                                <span>Progress</span>
                                                <span>{adventure.progress}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3 border-2 border-forest/10 overflow-hidden">
                                                <div
                                                    className={`h-full scribble-bar relative border-r-2 border-forest/10 ${adventure.color === 'primary' ? 'bg-primary text-primary/50' :
                                                        adventure.color === 'brick' ? 'bg-brick text-brick/50' :
                                                            'bg-forest text-forest/50'
                                                        }`}
                                                    style={{ width: `${adventure.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t-2 border-forest/5">
                                                <div className="flex -space-x-2">
                                                    <div className="size-8 rounded-full border-2 border-card bg-muted" />
                                                </div>
                                                <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                                                    <span className="material-symbols-outlined text-sm">timer</span>
                                                    {formatTime(adventure.timeSpent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {/* Add New Adventure Card */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group bg-[hsl(48,20%,98%)] rounded-[2rem] border-2 border-dashed border-forest/30 p-6 flex flex-col items-center justify-center gap-4 hover:bg-card hover:border-forest hover:shadow-hard transition-all duration-200 min-h-[280px]"
                        >
                            <div className="size-20 rounded-full bg-primary/20 border-2 border-forest/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-forest transition-all duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-foreground">add</span>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-foreground">New Adventure</h3>
                                <p className="text-muted-foreground font-medium mt-1">Start a fresh project</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Adventure Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-[2rem] border-2 border-forest shadow-hard-lg p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Create New Adventure</h3>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Adventure Name</label>
                                <input
                                    type="text"
                                    value={newAdventure.name}
                                    onChange={(e) => setNewAdventure({ ...newAdventure, name: e.target.value })}
                                    placeholder="Enter adventure name..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-forest/20 bg-card focus:border-forest focus:ring-0 text-foreground font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Description</label>
                                <textarea
                                    value={newAdventure.description}
                                    onChange={(e) => setNewAdventure({ ...newAdventure, description: e.target.value })}
                                    placeholder="What's this adventure about?"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-forest/20 bg-card focus:border-forest focus:ring-0 text-foreground font-medium resize-none h-24"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-2">Category</label>
                                    <select
                                        value={newAdventure.category}
                                        onChange={(e) => setNewAdventure({ ...newAdventure, category: e.target.value as Adventure['category'] })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/20 bg-card focus:border-forest focus:ring-0 text-foreground font-bold"
                                    >
                                        <option>Development</option>
                                        <option>Design</option>
                                        <option>Product</option>
                                        <option>Art</option>
                                        <option>Marketing</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-2">Priority</label>
                                    <select
                                        value={newAdventure.priority}
                                        onChange={(e) => setNewAdventure({ ...newAdventure, priority: e.target.value as Adventure['priority'] })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-forest/20 bg-card focus:border-forest focus:ring-0 text-foreground font-bold"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">
                                    Target Time: {Math.floor(newAdventure.targetTime / 60)}h
                                </label>
                                <input
                                    type="range"
                                    min="60"
                                    max="3600"
                                    step="60"
                                    value={newAdventure.targetTime}
                                    onChange={(e) => setNewAdventure({ ...newAdventure, targetTime: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 px-6 rounded-xl border-2 border-forest text-foreground font-bold hover:bg-forest/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateAdventure}
                                disabled={!newAdventure.name}
                                className="flex-1 py-3 px-6 rounded-xl bg-primary border-2 border-forest text-foreground font-bold shadow-hard hover:shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile FAB */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 lg:hidden size-14 rounded-full bg-primary text-foreground border-2 border-forest shadow-hard flex items-center justify-center z-40"
            >
                <span className="material-symbols-outlined">add</span>
            </button>
        </>
    );
}
