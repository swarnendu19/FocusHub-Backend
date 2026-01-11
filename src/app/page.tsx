import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="bg-paper text-forest font-display overflow-x-hidden selection:bg-primary selection:text-forest min-h-screen">
            <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 backdrop-blur-sm bg-paper/90 border-b-2 border-forest/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-10 bg-primary rounded-lg border-2 border-forest flex items-center justify-center shadow-hard-sm rotate-3">
                            <span className="material-symbols-outlined text-forest text-2xl">
                                draw
                            </span>
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tight">
                            Crayon<span className="text-brick">Time</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-bold text-forest/80">
                        <a
                            className="hover:text-brick hover:underline decoration-wavy decoration-2 underline-offset-4 transition-all"
                            href="#features"
                        >
                            Features
                        </a>
                        <a
                            className="hover:text-brick hover:underline decoration-wavy decoration-2 underline-offset-4 transition-all"
                            href="#how-it-works"
                        >
                            How it Works
                        </a>
                        <a
                            className="hover:text-brick hover:underline decoration-wavy decoration-2 underline-offset-4 transition-all"
                            href="#testimonials"
                        >
                            Stories
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            className="hidden md:block font-bold hover:text-brick transition-colors"
                            href="/login"
                        >
                            Log In
                        </Link>
                        <Link
                            className="bg-forest text-white px-5 py-2.5 rounded-xl font-bold shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all border-2 border-forest"
                            href="/signup"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
            <header className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-20 left-[-5%] size-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-[-5%] size-80 bg-brick/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-forest rounded-full w-fit shadow-hard-sm rotate-[-2deg]">
                            <span className="material-symbols-outlined text-primary text-xl">
                                star
                            </span>
                            <span className="font-bold text-sm">
                                Productivity just got fun!
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-shadow-sm">
                            Turn your <br />
                            <span className="relative inline-block text-brick mt-2">
                                <span className="relative z-10">To-Do List</span>
                                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/40 -rotate-2 -z-0 rounded-full"></span>
                            </span>{" "}
                            <br />
                            into an adventure.
                        </h1>
                        <p className="text-xl font-medium text-forest/70 max-w-lg">
                            Stop dreading time tracking. Build projects with crayon cards, earn
                            stickers for focus, and level up your character every day.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <button className="bg-primary hover:bg-primary/90 text-forest border-2 border-forest font-black text-xl py-4 px-8 rounded-xl shadow-hard hover:translate-y-1 hover:shadow-hard-sm transition-all flex items-center justify-center gap-2 group">
                                Start Your Quest
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-black">
                                    arrow_forward
                                </span>
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-forest border-2 border-forest font-bold text-lg py-4 px-8 rounded-xl shadow-hard-sm hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">play_circle</span>
                                Watch Demo
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm font-bold text-forest/60">
                            <div className="flex -space-x-3">
                                <div className="size-8 rounded-full border-2 border-white bg-brick"></div>
                                <div className="size-8 rounded-full border-2 border-white bg-primary"></div>
                                <div className="size-8 rounded-full border-2 border-white bg-forest"></div>
                            </div>
                            <span>Join 10,000+ happy explorers</span>
                        </div>
                    </div>
                    <div className="relative z-10 hidden md:block">
                        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                            <div className="absolute inset-x-4 inset-y-8 bg-white border-2 border-forest rounded-[2rem] shadow-hard-xl p-6 flex flex-col gap-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center justify-between border-b-2 border-forest/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full border-2 border-forest bg-background-light overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{
                                                    backgroundImage:
                                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xz-zXqq0bAuKsJMdt6ZUvJBbFkTHEZ0yUQURkfNCJXlR_eeQztCPXgp3bwgzxHy7k3pI3prQgNml9XkYHrQsyxFUrqtyJCQAsNzw50uZbiCs9LR0XVHSrW5cztwHcOdan7nOhd3INQHgLuIQKE43p7dt_uP3kwcl5Ukj086Er2WhMsFUP77JOPXMEKg0pog1S-C-f2XKZu6mOEJy94EPwWCjBwPM4LM5oFkktbxlTSO06NvBbWJK7AY9zUrOmMpxz79es5J_RnI")',
                                                }}
                                            ></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">
                                                Captain Alex
                                            </h3>
                                            <span className="text-xs font-bold text-brick bg-brick/10 px-2 py-0.5 rounded-full">
                                                Lvl 12 Explorer
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-forest text-white px-3 py-1 rounded-lg font-bold text-sm shadow-sm">
                                        25:00
                                    </div>
                                </div>
                                <div className="bg-primary/10 border-2 border-primary border-dashed rounded-xl p-4 flex items-center gap-4">
                                    <div className="size-12 bg-white rounded-lg border-2 border-forest flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-2xl text-brick">
                                            rocket_launch
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-xs uppercase font-bold text-forest/50">
                                            Current Quest
                                        </span>
                                        <h4 className="font-bold text-lg">Launch Website</h4>
                                    </div>
                                    <div className="size-8 rounded-full bg-forest text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-sm">
                                            play_arrow
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background-light p-4 rounded-xl border-2 border-forest/10">
                                        <span className="text-xs font-bold text-forest/50 uppercase">
                                            Focus XP
                                        </span>
                                        <div className="text-2xl font-black text-forest">+450</div>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border-2 border-forest/10">
                                        <span className="text-xs font-bold text-forest/50 uppercase">
                                            Streak
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl font-black text-brick">
                                                3 Days
                                            </span>
                                            <span className="material-symbols-outlined text-brick">
                                                local_fire_department
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full border-2 border-forest shadow-hard rotate-12 animate-bounce duration-[2000ms]">
                                <span className="material-symbols-outlined text-4xl text-primary">
                                    verified
                                </span>
                            </div>
                            <div className="absolute bottom-10 -left-6 bg-white p-3 rounded-xl border-2 border-forest shadow-hard -rotate-12">
                                <div className="flex flex-col items-center">
                                    <span className="text-xs font-bold uppercase text-forest/60">
                                        Reward
                                    </span>
                                    <span className="material-symbols-outlined text-3xl text-brick">
                                        emoji_events
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section
                className="py-20 px-6 md:px-12 bg-white border-y-2 border-forest/10"
                id="features"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-brick font-bold tracking-widest uppercase text-sm mb-2 block">
                            Why it works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-forest mb-4">
                            Not just another boring timer.
                        </h2>
                        <p className="text-lg text-forest/70 font-medium">
                            We brought the joy of childhood creativity to serious productivity
                            tools.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group p-8 rounded-[2rem] bg-background-light border-2 border-forest shadow-hard hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="size-14 bg-white rounded-2xl border-2 border-forest shadow-sm flex items-center justify-center mb-6 relative z-10 rotate-[-3deg] group-hover:rotate-3 transition-transform">
                                <span className="material-symbols-outlined text-3xl text-forest">
                                    brush
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 relative z-10">
                                Doodle Aesthetics
                            </h3>
                            <p className="text-forest/70 font-medium relative z-10">
                                Enjoy a UI that feels like a storybook. Hand-drawn borders, crayon
                                textures, and playful colors make work feel like play.
                            </p>
                        </div>
                        <div className="group p-8 rounded-[2rem] bg-background-light border-2 border-forest shadow-hard hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-32 bg-brick/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="size-14 bg-white rounded-2xl border-2 border-forest shadow-sm flex items-center justify-center mb-6 relative z-10 rotate-[2deg] group-hover:rotate-[-2deg] transition-transform">
                                <span className="material-symbols-outlined text-3xl text-brick">
                                    military_tech
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 relative z-10">
                                Gamified Rewards
                            </h3>
                            <p className="text-forest/70 font-medium relative z-10">
                                Earn XP for every minute of focus. Unlock sticker packs, new
                                avatars, and badges as you complete your daily quests.
                            </p>
                        </div>
                        <div className="group p-8 rounded-[2rem] bg-background-light border-2 border-forest shadow-hard hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-32 bg-forest/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="size-14 bg-white rounded-2xl border-2 border-forest shadow-sm flex items-center justify-center mb-6 relative z-10 rotate-[-1deg] group-hover:rotate-1 transition-transform">
                                <span className="material-symbols-outlined text-3xl text-primary">
                                    analytics
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 relative z-10">
                                Fun Analytics
                            </h3>
                            <p className="text-forest/70 font-medium relative z-10">
                                Visualize your productivity with colorful charts that look like
                                they were drawn in a coloring book. Tracking data has never been
                                this cute.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 md:px-12 bg-paper relative" id="how-it-works">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="bg-white p-6 rounded-[2rem] border-2 border-forest shadow-hard rotate-1 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/30 rotate-1 transform skew-x-12 z-20"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background-light p-4 rounded-xl border-2 border-forest/20 flex flex-col items-center gap-2 hover:border-forest hover:shadow-hard-sm transition-all cursor-pointer">
                                        <div className="size-10 rounded-full bg-brick/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-brick">
                                                palette
                                            </span>
                                        </div>
                                        <span className="font-bold text-sm">Design UI</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border-2 border-forest shadow-[2px_2px_0px_0px_#2d4a3e] flex flex-col items-center gap-2 -translate-y-1">
                                        <div className="absolute -top-2 -right-2 bg-primary text-forest rounded-full p-1 border border-forest">
                                            <span className="material-symbols-outlined text-xs font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-forest">
                                                code
                                            </span>
                                        </div>
                                        <span className="font-bold text-sm">Coding</span>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border-2 border-forest/20 flex flex-col items-center gap-2 hover:border-forest hover:shadow-hard-sm transition-all cursor-pointer">
                                        <div className="size-10 rounded-full bg-forest/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-forest">
                                                mail
                                            </span>
                                        </div>
                                        <span className="font-bold text-sm">Emails</span>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border-2 border-dashed border-forest/30 flex flex-col items-center gap-2 hover:bg-forest/5 cursor-pointer">
                                        <span className="material-symbols-outlined text-forest/40 my-auto text-2xl">
                                            add
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 bg-background-light rounded-xl p-4 border-2 border-forest/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-xs uppercase text-forest/50">
                                            Time Elapsed
                                        </span>
                                        <span className="font-bold text-forest">00:45:00</span>
                                    </div>
                                    <div className="w-full h-4 bg-white rounded-full border border-forest/10 overflow-hidden">
                                        <div className="h-full bg-forest w-2/3 scribble-bar text-forest/40"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col gap-8">
                            <h2 className="text-4xl font-black text-forest">
                                How to start your adventure
                            </h2>
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="size-10 rounded-full bg-primary border-2 border-forest flex items-center justify-center font-bold text-lg shadow-sm z-10">
                                        1
                                    </div>
                                    <div className="w-0.5 h-full bg-forest/20 my-2 border-l-2 border-dashed border-forest/30"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-bold mb-2">
                                        Create a Project Card
                                    </h3>
                                    <p className="text-forest/70 font-medium">
                                        Define your task like an RPG quest. Give it a name, a category,
                                        and an icon.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="size-10 rounded-full bg-white border-2 border-forest flex items-center justify-center font-bold text-lg shadow-sm z-10">
                                        2
                                    </div>
                                    <div className="w-0.5 h-full bg-forest/20 my-2 border-l-2 border-dashed border-forest/30"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-bold mb-2">Start the Timer</h3>
                                    <p className="text-forest/70 font-medium">
                                        Hit play and focus. The scribbly progress bar fills up as you
                                        work towards your goal.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="size-10 rounded-full bg-brick text-white border-2 border-forest flex items-center justify-center font-bold text-lg shadow-sm z-10">
                                        3
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Collect Rewards</h3>
                                    <p className="text-forest/70 font-medium">
                                        Finish your session and earn stars. Use them to unlock fun
                                        customizations for your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="py-20 px-6 md:px-12 bg-white border-t-2 border-forest/10"
                id="testimonials"
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-center text-forest mb-16">
                        Explorer Stories
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x">
                        <div className="flex-1 min-w-[300px] bg-paper p-8 rounded-[2rem] border-2 border-forest shadow-hard snap-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-14 rounded-full bg-primary border-2 border-forest overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xz-zXqq0bAuKsJMdt6ZUvJBbFkTHEZ0yUQURkfNCJXlR_eeQztCPXgp3bwgzxHy7k3pI3prQgNml9XkYHrQsyxFUrqtyJCQAsNzw50uZbiCs9LR0XVHSrW5cztwHcOdan7nOhd3INQHgLuIQKE43p7dt_uP3kwcl5Ukj086Er2WhMsFUP77JOPXMEKg0pog1S-C-f2XKZu6mOEJy94EPwWCjBwPM4LM5oFkktbxlTSO06NvBbWJK7AY9zUrOmMpxz79es5J_RnI")',
                                            filter: "hue-rotate(45deg)",
                                        }}
                                    ></div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Sarah Jenkins</div>
                                    <div className="text-xs font-bold text-brick uppercase">
                                        Freelance Artist
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-forest/10 font-black">
                                    "
                                </span>
                                <p className="text-lg font-medium relative z-10 italic">
                                    I used to hate tracking my hours. Now I actually look forward to
                                    filling up my progress bars. It's oddly satisfying!
                                </p>
                            </div>
                            <div className="flex gap-1 mt-6">
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[300px] bg-paper p-8 rounded-[2rem] border-2 border-forest shadow-hard snap-center mt-6 md:mt-0 md:-rotate-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-14 rounded-full bg-brick border-2 border-forest overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xz-zXqq0bAuKsJMdt6ZUvJBbFkTHEZ0yUQURkfNCJXlR_eeQztCPXgp3bwgzxHy7k3pI3prQgNml9XkYHrQsyxFUrqtyJCQAsNzw50uZbiCs9LR0XVHSrW5cztwHcOdan7nOhd3INQHgLuIQKE43p7dt_uP3kwcl5Ukj086Er2WhMsFUP77JOPXMEKg0pog1S-C-f2XKZu6mOEJy94EPwWCjBwPM4LM5oFkktbxlTSO06NvBbWJK7AY9zUrOmMpxz79es5J_RnI")',
                                            filter: "hue-rotate(180deg)",
                                        }}
                                    ></div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Mike Chen</div>
                                    <div className="text-xs font-bold text-brick uppercase">
                                        Developer
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-forest/10 font-black">
                                    "
                                </span>
                                <p className="text-lg font-medium relative z-10 italic">
                                    The crayon aesthetic is surprisingly calming. It takes the stress
                                    out of tight deadlines. Best productivity tool ever.
                                </p>
                            </div>
                            <div className="flex gap-1 mt-6">
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[300px] bg-paper p-8 rounded-[2rem] border-2 border-forest shadow-hard snap-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-14 rounded-full bg-forest border-2 border-forest overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xz-zXqq0bAuKsJMdt6ZUvJBbFkTHEZ0yUQURkfNCJXlR_eeQztCPXgp3bwgzxHy7k3pI3prQgNml9XkYHrQsyxFUrqtyJCQAsNzw50uZbiCs9LR0XVHSrW5cztwHcOdan7nOhd3INQHgLuIQKE43p7dt_uP3kwcl5Ukj086Er2WhMsFUP77JOPXMEKg0pog1S-C-f2XKZu6mOEJy94EPwWCjBwPM4LM5oFkktbxlTSO06NvBbWJK7AY9zUrOmMpxz79es5J_RnI")',
                                            filter: "hue-rotate(90deg)",
                                        }}
                                    ></div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Jessica Lee</div>
                                    <div className="text-xs font-bold text-brick uppercase">
                                        Student
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-forest/10 font-black">
                                    "
                                </span>
                                <p className="text-lg font-medium relative z-10 italic">
                                    Leveling up my avatar keeps me motivated to study. I treat my
                                    homework like quests now. It works!
                                </p>
                            </div>
                            <div className="flex gap-1 mt-6">
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star
                                </span>
                                <span className="material-symbols-outlined text-primary fill-current">
                                    star_half
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-5xl mx-auto bg-forest rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-hard-xl">
                    <div className="absolute inset-0 bg-scribble text-white/5 opacity-30 bg-[length:20px_20px]"></div>
                    <div className="absolute top-10 left-10 text-white/10 rotate-12">
                        <span className="material-symbols-outlined text-8xl">
                            rocket_launch
                        </span>
                    </div>
                    <div className="absolute bottom-10 right-10 text-white/10 -rotate-12">
                        <span className="material-symbols-outlined text-8xl">timer</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            Ready to Level Up?
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Join thousands of others who have turned their daily grind into a
                            fun game. Start for free today.
                        </p>
                        <button className="bg-primary hover:bg-primary/90 text-forest border-2 border-forest font-black text-2xl py-5 px-10 rounded-2xl shadow-hard hover:scale-105 transition-all w-full md:w-auto">
                            Get Started for Free
                        </button>
                        <p className="text-white/60 text-sm font-bold">
                            No credit card required • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>
            <footer className="bg-white border-t-2 border-forest/10 pt-16 pb-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-primary rounded-lg border-2 border-forest flex items-center justify-center -rotate-3">
                                <span className="material-symbols-outlined text-forest text-xl">
                                    draw
                                </span>
                            </div>
                            <span className="text-xl font-black tracking-tight text-forest">
                                Crayon<span className="text-brick">Time</span>
                            </span>
                        </div>
                        <p className="text-forest/60 max-w-xs font-medium">
                            Making time tracking fun again, one sticker at a time.
                        </p>
                    </div>
                    <div className="flex gap-16 font-bold text-forest/70">
                        <div className="flex flex-col gap-4">
                            <span className="text-forest font-black uppercase tracking-wider text-sm">
                                Product
                            </span>
                            <a className="hover:text-brick transition-colors" href="#">
                                Features
                            </a>
                            <a className="hover:text-brick transition-colors" href="#">
                                Pricing
                            </a>
                            <a className="hover:text-brick transition-colors" href="#">
                                Download
                            </a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-forest font-black uppercase tracking-wider text-sm">
                                Company
                            </span>
                            <a className="hover:text-brick transition-colors" href="#">
                                About Us
                            </a>
                            <a className="hover:text-brick transition-colors" href="#">
                                Blog
                            </a>
                            <a className="hover:text-brick transition-colors" href="#">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-forest/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-forest/40">
                    <span>© 2023 CrayonTime Inc. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a className="hover:text-forest" href="#">
                            Privacy Policy
                        </a>
                        <a className="hover:text-forest" href="#">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
