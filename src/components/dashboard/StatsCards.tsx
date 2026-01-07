import { useStats } from '@/hooks/useStats';

export function StatsCards() {
  const { user } = useStats();

  if (!user) return null;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Focus */}
      <div className="bg-card rounded-2xl p-6 border-2 border-forest shadow-hard flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 size-16 bg-primary/20 rounded-full"></div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-muted-foreground uppercase">Total Focus</span>
            <span className="text-3xl font-black text-foreground">{formatTime(user.totalFocusTime)}</span>
          </div>
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-foreground border-2 border-forest shadow-hard-sm">
            <span className="material-symbols-outlined">schedule</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-foreground/70 bg-forest/5 px-2 py-1 rounded-md w-fit">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          +10% vs yesterday
        </div>
      </div>

      {/* Tasks Crushed */}
      <div className="bg-card rounded-2xl p-6 border-2 border-forest shadow-hard flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 size-16 bg-brick/10 rounded-full"></div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-muted-foreground uppercase">Tasks Crushed</span>
            <span className="text-3xl font-black text-foreground">{user.tasksCompleted}</span>
          </div>
          <div className="size-10 rounded-full bg-brick text-card flex items-center justify-center border-2 border-forest shadow-hard-sm">
            <span className="material-symbols-outlined">verified</span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-auto border border-forest/20 overflow-hidden">
          <div
            className="bg-brick h-2 rounded-full scribble-bar text-brick/50"
            style={{ width: `${Math.min(100, user.tasksCompleted * 14)}%` }}
          ></div>
        </div>
      </div>

      {/* Current Streak */}
      <div className="bg-card rounded-2xl p-6 border-2 border-forest shadow-hard flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 size-16 bg-forest/10 rounded-full"></div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-muted-foreground uppercase">Current Streak</span>
            <span className="text-3xl font-black text-foreground">{user.currentStreak} Days</span>
          </div>
          <div className="size-10 rounded-full bg-card text-brick flex items-center justify-center border-2 border-forest shadow-hard-sm">
            <span className="material-symbols-outlined">local_fire_department</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].slice(0, 7).map((day, i) => (
            <div
              key={i}
              className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${i < user.currentStreak
                  ? 'bg-brick text-card border-forest'
                  : 'bg-muted text-muted-foreground border-dashed border-muted-foreground'
                }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
