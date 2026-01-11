import { useAdventures } from '@/hooks/useAdventures';
import Link from 'next/link';

export function ActiveProjects() {
  const { adventures } = useAdventures();

  return (
    <div className="bg-card rounded-[1.5rem] border-2 border-forest p-6 shadow-hard flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Active Projects</h3>
        <Link href="/dashboard/adventure" className="text-primary hover:text-primary/80">
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      {adventures.slice(0, 3).map((adventure) => (
        <div
          key={adventure.id}
          className="group flex flex-col p-4 bg-muted rounded-xl border-2 border-forest/10 hover:border-forest/30 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`size-10 rounded-lg bg-card border-2 border-forest flex items-center justify-center shadow-sm ${adventure.color === 'brick' ? 'text-brick' : 'text-foreground'
              }`}>
              <span className="material-symbols-outlined">{adventure.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm">{adventure.name}</span>
              <span className="text-xs text-muted-foreground">{adventure.category}</span>
            </div>
          </div>
          <div className="w-full bg-card rounded-full h-2 border border-forest/10 overflow-hidden">
            <div
              className={`h-full scribble-bar ${adventure.color === 'primary' ? 'bg-primary text-primary/50' :
                adventure.color === 'brick' ? 'bg-brick text-brick/50' :
                  'bg-forest text-forest/50'
                }`}
              style={{ width: `${adventure.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

