import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/adventure';

export function useStats() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await fetch('/api/stats');
            if (!res.ok) throw new Error('Failed to fetch stats');
            return res.json() as Promise<User>;
        },
    });

    return { user, isLoading };
}
