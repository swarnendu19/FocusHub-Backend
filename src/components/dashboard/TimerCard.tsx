import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useAdventures } from '@/hooks/useAdventures';
import { useSessions } from '@/hooks/useSessions';

export function TimerCard() {
  const { adventures } = useAdventures();
  const { createSession } = useSessions();
  const {
    selectedAdventureId,
    timerDuration,
    isTimerRunning,
    timerRemaining,
    selectAdventure,
    setTimerDuration,
    startTimer,
    stopTimer,
    tickTimer,
  } = useStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, tickTimer]);

  const handleStop = () => {
    if (isTimerRunning) {
      const elapsedSeconds = (timerDuration * 60) - timerRemaining;
      // Round up to ensure even short sessions count as 1 minute
      const elapsedMinutes = Math.ceil(elapsedSeconds / 60);

      // Save if at least 10 seconds have passed (to avoid accidental clicks)
      if (elapsedSeconds >= 10 && selectedAdventureId) {
        createSession.mutate({ adventureId: selectedAdventureId, duration: elapsedMinutes, completed: false });
        toast.success(`Session saved! ${elapsedMinutes} min added.`);
      } else if (elapsedSeconds < 10) {
        toast.info("Session too short to save.");
      }

      stopTimer();
      setTimerDuration(timerDuration); // Reset timer
    } else {
      startTimer();
    }
  };

  useEffect(() => {
    if (isTimerRunning && timerRemaining === 0) {
      toast.success('🎉 Session completed! Great work, Explorer!');
      stopTimer();
      if (selectedAdventureId) {
        createSession.mutate({ adventureId: selectedAdventureId, duration: timerDuration, completed: true });
      }
    }
  }, [timerRemaining, isTimerRunning, selectedAdventureId, timerDuration, createSession, stopTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDuration(parseInt(e.target.value));
  };

  const sliderPercentage = ((timerDuration - 5) / (120 - 5)) * 100;

  return (
    <section className="w-full">
      <div className="bg-card rounded-[2rem] border-2 border-forest shadow-hard p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg border-2 border-forest/10 rotate-3">
                <span className="material-symbols-outlined text-brick text-2xl">rocket_launch</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Start New Adventure</h3>
                <p className="text-muted-foreground text-sm font-medium">Select a project to focus on</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-foreground/20 text-4xl rotate-12">rocket</span>
          </div>

          {/* Project Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {adventures.slice(0, 3).map((adventure) => (
              <label key={adventure.id} className="group relative cursor-pointer">
                <input
                  type="radio"
                  name="adventure"
                  checked={selectedAdventureId === adventure.id}
                  onChange={() => selectAdventure(adventure.id)}
                  className="adventure-card-radio sr-only"
                />
                <div className={`h-full bg-card rounded-2xl border-2 border-forest/20 p-4 flex flex-col items-center justify-center gap-3 hover:border-forest hover:shadow-hard-sm transition-all duration-200 ${selectedAdventureId === adventure.id ? 'bg-primary border-forest shadow-hard -translate-x-0.5 -translate-y-0.5' : ''}`}>
                  {selectedAdventureId === adventure.id && (
                    <div className="absolute -top-2 -right-2 z-20 bg-forest text-card rounded-full p-1 border-2 border-card shadow-sm check-icon">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                  )}
                  <div className={`size-16 rounded-full border-2 border-forest/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${adventure.color === 'primary' ? 'bg-primary/20' :
                    adventure.color === 'brick' ? 'bg-brick/10' : 'bg-forest/10'
                    }`}>
                    <span className={`material-symbols-outlined text-3xl ${adventure.color === 'brick' ? 'text-brick' : 'text-foreground'
                      }`}>{adventure.icon}</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-foreground text-lg">{adventure.name}</span>
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wide">{adventure.category}</span>
                  </div>
                </div>
              </label>
            ))}

            {/* Add New Project */}
            <label className="group relative cursor-pointer">
              <input type="radio" name="adventure" className="adventure-card-radio sr-only" />
              <div className="h-full bg-card rounded-2xl border-2 border-dashed border-forest/20 p-4 flex flex-col items-center justify-center gap-3 hover:border-forest hover:bg-forest/5 transition-all duration-200">
                <div className="size-16 rounded-full bg-forest/5 border-2 border-forest/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-foreground/40">add</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-foreground text-lg">New Project</span>
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wide">Create</span>
                </div>
              </div>
            </label>
          </div>

          {/* Timer Controls */}
          <div className="bg-muted rounded-xl border-2 border-forest/10 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-card p-1.5 rounded-lg border border-forest/10 shadow-sm">
                    <span className="material-symbols-outlined text-muted-foreground text-lg">timer</span>
                  </div>
                  <span className="font-bold text-foreground text-sm">Session Length</span>
                </div>
                <span className="bg-forest text-card px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                  {isTimerRunning ? formatTime(timerRemaining) : `${timerDuration} min`}
                </span>
              </div>

              {!isTimerRunning && (
                <div className="relative w-full h-8 flex items-center">
                  <div className="absolute w-full h-3 bg-card rounded-full border border-forest/10"></div>
                  <div
                    className="absolute h-3 bg-forest rounded-full border-t border-b border-l border-forest/20"
                    style={{ width: `${sliderPercentage}%` }}
                  ></div>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={timerDuration}
                    onChange={handleSliderChange}
                    className="relative z-10 w-full cursor-pointer"
                  />
                </div>
              )}

              {isTimerRunning && (
                <div className="w-full h-4 bg-card rounded-full border-2 border-forest/20 overflow-hidden">
                  <div
                    className="h-full bg-primary scribble-bar text-primary/50 transition-all duration-1000"
                    style={{ width: `${((timerDuration * 60 - timerRemaining) / (timerDuration * 60)) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            <button
              onClick={handleStop}
              className={`w-full md:w-auto border-2 border-forest font-black text-lg py-3 px-8 rounded-xl shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-sm transition-all flex items-center justify-center gap-2 group ${isTimerRunning
                ? 'bg-brick text-card hover:bg-brick/90'
                : 'bg-primary text-foreground hover:bg-primary/90'
                }`}
            >
              {isTimerRunning ? 'Stop' : 'Start Timer'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-black">
                {isTimerRunning ? 'stop' : 'play_arrow'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
