import { useStats } from '@/hooks/useStats';

export function WeeklyChart() {
  const { user } = useStats();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const weekData = days.map((day, index) => {
    // Calculate date for this day of the week (assuming current week)
    // Actually, let's just show last 7 days ending today? 
    // Or fixed Mon-Sun? The UI shows Mon-Sun.
    // Let's stick to Mon-Sun for simplicity, assuming "This Week".

    // Simple logic: aggregate sessions by day of week
    const totalMinutes = user?.sessions?.reduce((acc, session) => {
      const sessionDate = new Date(session.date);
      if (sessionDate.getDay() === index) { // 0 is Sun, 1 is Mon
        return acc + session.duration;
      }
      return acc;
    }, 0) || 0;

    // Normalize height (max 120 mins = 100%?)
    const height = Math.min(100, (totalMinutes / 120) * 100);

    return {
      day,
      height: height || 5, // Min height for visibility
      active: height > 0,
      minutes: totalMinutes
    };
  });

  // Reorder to start from Mon
  const orderedData = [...weekData.slice(1), weekData[0]];
  return (
    <div className="lg:col-span-2 bg-card rounded-[1.5rem] border-2 border-forest p-6 shadow-hard flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Weekly Creativity Flow</h3>
          <p className="text-sm text-muted-foreground font-medium">You're on fire this week! 🔥</p>
        </div>
        <select className="bg-muted border-2 border-forest/20 rounded-xl text-sm font-bold text-foreground py-2 px-3 focus:ring-primary focus:border-primary cursor-pointer">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div className="flex-1 min-h-[240px] flex items-end gap-3 md:gap-6 px-2">
        {orderedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
            <div
              className={`w-full rounded-t-lg relative border-x-2 border-t-2 transition-all ${item.active
                ? index === 1
                  ? 'bg-primary border-forest shadow-hard-sm'
                  : 'bg-brick border-forest shadow-hard-sm'
                : 'bg-primary/20 border-forest group-hover:bg-primary/30'
                } ${item.height < 25 ? 'border-dashed border-forest/30' : ''}`}
              style={{ height: `${item.height}%` }}
            >
              <div className={`absolute inset-0 rounded-t-lg scribble-bar ${item.active ? 'text-white/20' : 'text-primary opacity-50'
                } bg-[length:6px_6px]`}></div>
            </div>
            <span className={`text-xs font-bold ${item.active ? 'text-foreground' : 'text-foreground/70'
              }`}>{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
