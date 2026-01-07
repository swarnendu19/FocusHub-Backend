export interface Adventure {
  id: string;
  name: string;
  description: string;
  category: 'Development' | 'Design' | 'Product' | 'Art' | 'Marketing' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
  timeSpent: number; // in minutes
  targetTime: number; // in minutes
  icon: string;
  color: 'primary' | 'brick' | 'forest';
  createdAt: Date;
}

export interface Session {
  id: string;
  adventureId: string;
  duration: number; // in minutes
  date: Date;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Focus & Time' | 'Streaks' | 'Milestones';
  earned: boolean;
  earnedAt?: Date;
  progress: number;
  total: number;
  bgColor: string;
}

export interface User {
  name: string;
  level: number;
  xp: number;
  totalFocusTime: number;
  tasksCompleted: number;
  currentStreak: number;
  avatarUrl: string;
  sessions?: Session[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  role: string;
  level: number;
  time: string;
  xp: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
}
