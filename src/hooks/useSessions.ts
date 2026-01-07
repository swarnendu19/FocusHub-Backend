import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSessions() {
    const queryClient = useQueryClient();

    const createSession = useMutation({
        mutationFn: async (data: { adventureId: string; duration: number; completed: boolean }) => {
            const res = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create session');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['adventures'] });
            queryClient.invalidateQueries({ queryKey: ['badges'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        },
    });

    return { createSession };
}
