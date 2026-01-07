import { useQuery } from '@tanstack/react-query';
import { LeaderboardEntry } from '@/types/adventure';

export function useLeaderboard() {
    const { data: leaderboard = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await fetch('/api/leaderboard');
            if (!res.ok) throw new Error('Failed to fetch leaderboard');
            return res.json() as Promise<LeaderboardEntry[]>;
        },
    });

    return { leaderboard, isLoading };
}
