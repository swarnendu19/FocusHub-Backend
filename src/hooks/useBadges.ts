import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/types/adventure';

export function useBadges() {
    const { data: badges = [], isLoading } = useQuery({
        queryKey: ['badges'],
        queryFn: async () => {
            const res = await fetch('/api/badges');
            if (!res.ok) throw new Error('Failed to fetch badges');
            return res.json() as Promise<Badge[]>;
        },
    });

    return { badges, isLoading };
}
