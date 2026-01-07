"use client"

import { useActionState } from "react"
import { register } from "@/actions/auth"
import Link from "next/link"

export default function SignUpPage() {
    const [errorMessage, formAction, isPending] = useActionState(register, undefined)

    return (
        <div className="bg-background text-forest font-display overflow-x-hidden">
            <div className="relative min-h-screen w-full flex items-center justify-center bg-paper p-4 md:p-8">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] text-forest/5 transform -rotate-12">
                        <span className="material-symbols-outlined text-[12rem]">rocket_launch</span>
                    </div>
                    <div className="absolute bottom-[10%] right-[5%] text-brick/5 transform rotate-12">
                        <span className="material-symbols-outlined text-[12rem]">draw</span>
                    </div>
                    <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary rounded-full border-2 border-forest shadow-hard opacity-20 hidden lg:block"></div>
                    <div className="absolute bottom-20 left-[20%] w-24 h-24 bg-brick rounded-full border-2 border-forest shadow-hard opacity-20 hidden lg:block"></div>
                </div>
                <main className="relative z-10 w-full max-w-md">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full border-2 border-forest shadow-hard flex items-center justify-center z-20">
                        <span className="material-symbols-outlined text-4xl text-primary drop-shadow-[2px_2px_0_rgba(45,74,62,1)]">edit_square</span>
                    </div>
                    <div className="bg-white rounded-[2rem] border-2 border-forest shadow-hard p-8 pt-16 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-4 bg-primary bg-scribble scribble-bar border-b-2 border-forest opacity-50"></div>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-forest mb-2">Create Account</h1>
                            <p className="text-forest/60 font-medium">Join the squad and start tracking your creative adventures!</p>
                        </div>
                        <form action={formAction} className="flex flex-col gap-5">
                            <div className="group">
                                <label className="block text-sm font-bold text-forest mb-1.5 ml-1" htmlFor="username">
                                    Username
                                </label>
                                <div className="relative transition-all group-focus-within:transform group-focus-within:-translate-y-1">
                                    <input name="username" className="w-full bg-background border-2 border-forest/10 rounded-xl py-3 px-4 pl-11 text-forest placeholder:text-forest/30 font-bold focus:border-forest focus:ring-0 focus:shadow-[4px_4px_0px_0px_#2d4a3e] transition-all outline-none" id="username" placeholder="Captain Awesome" type="text" required />
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/40 group-focus-within:text-forest transition-colors">person</span>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-forest mb-1.5 ml-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative transition-all group-focus-within:transform group-focus-within:-translate-y-1">
                                    <input name="email" className="w-full bg-background border-2 border-forest/10 rounded-xl py-3 px-4 pl-11 text-forest placeholder:text-forest/30 font-bold focus:border-forest focus:ring-0 focus:shadow-[4px_4px_0px_0px_#2d4a3e] transition-all outline-none" id="email" placeholder="you@adventure.com" type="email" required />
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/40 group-focus-within:text-forest transition-colors">mail</span>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-forest mb-1.5 ml-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative transition-all group-focus-within:transform group-focus-within:-translate-y-1">
                                    <input name="password" className="w-full bg-background border-2 border-forest/10 rounded-xl py-3 px-4 pl-11 text-forest placeholder:text-forest/30 font-bold focus:border-forest focus:ring-0 focus:shadow-[4px_4px_0px_0px_#2d4a3e] transition-all outline-none" id="password" placeholder="••••••••" type="password" required />
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/40 group-focus-within:text-forest transition-colors">lock</span>
                                </div>
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 text-sm font-bold text-center">{errorMessage}</div>
                            )}
                            <button disabled={isPending} className="mt-4 w-full bg-primary hover:bg-primary/90 text-forest border-2 border-forest font-black text-xl py-3.5 rounded-xl shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-sm transition-all flex items-center justify-center gap-2 group" type="submit">
                                {isPending ? "Creating..." : "Create Account"}
                                <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                                    <span className="material-symbols-outlined text-lg font-black block">arrow_forward</span>
                                </div>
                            </button>
                        </form>
                        <div className="mt-8 pt-6 border-t-2 border-dashed border-forest/10 text-center">
                            <p className="font-bold text-forest/60 text-sm">
                                Already have an account?
                                <Link className="text-brick hover:text-brick/80 underline decoration-2 decoration-wavy underline-offset-2 ml-1 transition-colors" href="/login">Sign In</Link>
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 w-full h-full bg-forest/5 rounded-[2rem] -z-10 border-2 border-forest/5"></div>
                </main>
            </div>
        </div>
    )
}
