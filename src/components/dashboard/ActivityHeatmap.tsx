export function ActivityHeatmap() {
  // Generate random activity data for visualization
  const generateActivityData = () => {
    const levels = [0, 1, 2, 3, 4];
    return Array.from({ length: 7 }, () => 
      levels[Math.floor(Math.random() * levels.length)]
    );
  };

  const weeks = Array.from({ length: 20 }, () => generateActivityData());

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted border border-forest/5';
      case 1: return 'bg-[#d9e6dc]';
      case 2: return 'bg-[#9dc2ad] scribble-bar text-[#7aa68d]';
      case 3: return 'bg-[#5e8f76] scribble-bar text-[#3e6652]';
      case 4: return 'bg-forest scribble-bar text-[#1a2e26]';
      default: return 'bg-muted';
    }
  };

  return (
    <section className="w-full bg-card rounded-[1.5rem] border-2 border-forest p-6 shadow-hard overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">Exploration History</h3>
          <p className="text-sm text-muted-foreground">342 focus sessions recorded this year</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <span>Rest</span>
          <div className="size-3 rounded-full bg-muted border border-forest/10"></div>
          <div className="size-3 rounded-full bg-[#d9e6dc]"></div>
          <div className="size-3 rounded-full bg-[#9dc2ad]"></div>
          <div className="size-3 rounded-full bg-[#5e8f76]"></div>
          <div className="size-3 rounded-full bg-forest"></div>
          <span>Focus</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[600px] flex flex-col gap-1">
          <div className="flex text-xs font-bold text-foreground/40 pl-8 mb-1 gap-[calc(5*16px)]">
            <span className="w-12">Jun</span>
            <span className="w-12">Jul</span>
            <span className="w-12">Aug</span>
            <span className="w-12">Sep</span>
            <span className="w-12">Oct</span>
          </div>
          
          <div className="flex gap-2">
            <div className="flex flex-col justify-between text-[10px] font-bold text-foreground/40 h-[92px] pt-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((level, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`size-3 rounded-full ${getColorClass(level)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
