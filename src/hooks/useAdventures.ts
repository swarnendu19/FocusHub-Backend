import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Adventure } from '@/types/adventure';

export function useAdventures() {
    const queryClient = useQueryClient();

    const { data: adventures = [], isLoading } = useQuery({
        queryKey: ['adventures'],
        queryFn: async () => {
            const res = await fetch('/api/adventures');
            if (!res.ok) throw new Error('Failed to fetch adventures');
            return res.json() as Promise<Adventure[]>;
        },
    });

    const createAdventure = useMutation({
        mutationFn: async (newAdventure: Partial<Adventure>) => {
            const res = await fetch('/api/adventures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdventure),
            });
            if (!res.ok) throw new Error('Failed to create adventure');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adventures'] });
        },
    });

    const deleteAdventure = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/adventures/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete adventure');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adventures'] });
        },
    });

    return { adventures, isLoading, createAdventure, deleteAdventure };
}
