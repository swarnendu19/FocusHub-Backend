import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Adventure, Session, Badge, User } from '@/types/adventure';

interface AppState {
  user: User;
  adventures: Adventure[];
  sessions: Session[];
  badges: Badge[];
  selectedAdventureId: string | null;
  timerDuration: number;
  isTimerRunning: boolean;
  timerRemaining: number;

  // Actions
  setUser: (user: Partial<User>) => void;
  addAdventure: (adventure: Adventure) => void;
  updateAdventure: (id: string, updates: Partial<Adventure>) => void;
  deleteAdventure: (id: string) => void;
  selectAdventure: (id: string | null) => void;
  setTimerDuration: (minutes: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  tickTimer: () => void;
  completeSession: () => void;
  addSession: (session: Session) => void;
  updateBadges: () => void;
  earnBadge: (badgeId: string) => void;
}

const defaultUser: User = {
  name: 'Captain Alex',
  level: 12,
  xp: 4500,
  totalFocusTime: 252, // 4h 12m in minutes
  tasksCompleted: 5,
  currentStreak: 3,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xz-zXqq0bAuKsJMdt6ZUvJBbFkTHEZ0yUQURkfNCJXlR_eeQztCPXgp3bwgzxHy7k3pI3prQgNml9XkYHrQsyxFUrqtyJCQAsNzw50uZbiCs9LR0XVHSrW5cztwHcOdan7nOhd3INQHgLuIQKE43p7dt_uP3kwcl5Ukj086Er2WhMsFUP77JOPXMEKg0pog1S-C-f2XKZu6mOEJy94EPwWCjBwPM4LM5oFkktbxlTSO06NvBbWJK7AY9zUrOmMpxz79es5J_RnI',
};

const defaultAdventures: Adventure[] = [
  {
    id: '1',
    name: 'Space Website',
    description: 'Redesigning the main landing page for the Mars colony project.',
    category: 'Development',
    priority: 'High',
    progress: 65,
    timeSpent: 750, // 12h 30m
    targetTime: 1200,
    icon: 'rocket_launch',
    color: 'primary',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Brand Identity',
    description: 'Creating playful assets for the new mobile app launch.',
    category: 'Design',
    priority: 'Medium',
    progress: 30,
    timeSpent: 255, // 4h 15m
    targetTime: 900,
    icon: 'palette',
    color: 'brick',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'User Research',
    description: 'Interviews with 20 beta testers to gather feedback.',
    category: 'Product',
    priority: 'Medium',
    progress: 85,
    timeSpent: 1125, // 18h 45m
    targetTime: 1320,
    icon: 'menu_book',
    color: 'forest',
    createdAt: new Date(),
  },
];

const defaultBadges: Badge[] = [
  {
    id: '1',
    name: 'Blast Off!',
    description: 'Completed your first 5 sessions.',
    icon: 'rocket_launch',
    category: 'Focus & Time',
    earned: true,
    earnedAt: new Date('2024-10-22'),
    progress: 5,
    total: 5,
    bgColor: 'bg-primary',
  },
  {
    id: '2',
    name: 'Zen Master',
    description: '2 hours of focus without pause.',
    icon: 'self_improvement',
    category: 'Focus & Time',
    earned: true,
    earnedAt: new Date('2024-10-20'),
    progress: 120,
    total: 120,
    bgColor: 'bg-[#9dc2ad]',
  },
  {
    id: '3',
    name: 'On Fire',
    description: 'Maintained a 3-day streak.',
    icon: 'local_fire_department',
    category: 'Streaks',
    earned: true,
    earnedAt: new Date('2024-10-18'),
    progress: 3,
    total: 3,
    bgColor: 'bg-brick',
  },
  {
    id: '4',
    name: 'Time Keeper',
    description: 'Track 10 hours of focus time.',
    icon: 'timer',
    category: 'Focus & Time',
    earned: true,
    earnedAt: new Date('2024-10-15'),
    progress: 10,
    total: 10,
    bgColor: 'bg-primary',
  },
  {
    id: '5',
    name: 'Early Bird',
    description: 'Start 5 sessions before 9 AM.',
    icon: 'wb_sunny',
    category: 'Focus & Time',
    earned: true,
    earnedAt: new Date('2024-10-12'),
    progress: 5,
    total: 5,
    bgColor: 'bg-[#d9e6dc]',
  },
  {
    id: '6',
    name: 'Log Master',
    description: 'Complete 20 focus sessions.',
    icon: 'edit_note',
    category: 'Focus & Time',
    earned: true,
    earnedAt: new Date('2024-10-10'),
    progress: 20,
    total: 20,
    bgColor: 'bg-card',
  },
  {
    id: '7',
    name: 'Night Owl',
    description: 'Complete 5 sessions after 10 PM.',
    icon: 'bedtime',
    category: 'Focus & Time',
    earned: false,
    progress: 2,
    total: 5,
    bgColor: 'bg-muted',
  },
  {
    id: '8',
    name: 'Caffeine Fix',
    description: 'Take 10 breaks during sessions.',
    icon: 'local_cafe',
    category: 'Focus & Time',
    earned: false,
    progress: 8,
    total: 10,
    bgColor: 'bg-muted',
  },
  {
    id: '9',
    name: 'Month Warrior',
    description: 'Complete sessions for 30 days.',
    icon: 'calendar_month',
    category: 'Milestones',
    earned: false,
    progress: 24,
    total: 30,
    bgColor: 'bg-muted',
  },
  {
    id: '10',
    name: 'Gold Medalist',
    description: 'Complete a 100-hour project.',
    icon: 'workspace_premium',
    category: 'Milestones',
    earned: false,
    progress: 0,
    total: 1,
    bgColor: 'bg-muted',
  },
  {
    id: '11',
    name: 'High Voltage',
    description: 'Achieve a 50-day streak.',
    icon: 'bolt',
    category: 'Streaks',
    earned: false,
    progress: 0,
    total: 50,
    bgColor: 'bg-muted',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      adventures: defaultAdventures,
      sessions: [],
      badges: defaultBadges,
      selectedAdventureId: '1',
      timerDuration: 25,
      isTimerRunning: false,
      timerRemaining: 25 * 60,

      setUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),

      addAdventure: (adventure) =>
        set((state) => ({ adventures: [...state.adventures, adventure] })),

      updateAdventure: (id, updates) =>
        set((state) => ({
          adventures: state.adventures.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      deleteAdventure: (id) =>
        set((state) => ({
          adventures: state.adventures.filter((a) => a.id !== id),
        })),

      selectAdventure: (id) => set({ selectedAdventureId: id }),

      setTimerDuration: (minutes) =>
        set({ timerDuration: minutes, timerRemaining: minutes * 60 }),

      startTimer: () => set({ isTimerRunning: true }),

      stopTimer: () => set({ isTimerRunning: false }),

      tickTimer: () => {
        const { timerRemaining, isTimerRunning } = get();
        if (isTimerRunning && timerRemaining > 0) {
          set({ timerRemaining: timerRemaining - 1 });
        }
      },

      completeSession: () => {
        const { timerDuration } = get();
        set({
          isTimerRunning: false,
          timerRemaining: timerDuration * 60,
        });
      },

      addSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),

      updateBadges: () => {
        const { sessions, user } = get();
        // Simple badge unlock logic based on sessions count
        if (sessions.length >= 5) {
          get().earnBadge('1');
        }
        if (user.currentStreak >= 3) {
          get().earnBadge('3');
        }
      },

      earnBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.map((b) =>
            b.id === badgeId ? { ...b, earned: true, earnedAt: new Date() } : b
          ),
        })),
    }),
    {
      name: 'adventure-storage',
    }
  )
);
