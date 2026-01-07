"use client"

import { useActionState } from "react"
import { authenticate } from "@/actions/auth"
import Link from "next/link"

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <div className="bg-background text-forest font-display min-h-screen flex items-center justify-center bg-paper p-6 relative overflow-hidden">
            <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 rounded-full border-4 border-dashed border-primary/30 animate-pulse hidden md:block"></div>
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-32 w-24 h-24 rounded-full bg-brick/5 blur-xl"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 text-forest/10 rotate-12 hidden lg:block">
                <span className="material-symbols-outlined text-6xl">timer</span>
            </div>
            <div className="absolute bottom-1/4 right-20 w-16 h-16 text-forest/10 -rotate-12 hidden lg:block">
                <span className="material-symbols-outlined text-6xl">rocket_launch</span>
            </div>
            <div className="w-full max-w-md bg-white rounded-[2rem] border-2 border-forest shadow-hard p-8 md:p-10 relative z-10">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="size-20 rounded-full bg-primary flex items-center justify-center border-2 border-forest shadow-hard mb-2 relative group cursor-pointer hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-forest">waving_hand</span>
                        <div className="absolute -top-1 -right-1 size-6 bg-white rounded-full border-2 border-forest flex items-center justify-center">
                            <div className="size-2 bg-brick rounded-full animate-bounce"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-forest tracking-tight mb-1">Welcome Back!</h1>
                        <p className="text-forest/60 font-medium">Ready for another adventure?</p>
                    </div>
                </div>
                <form action={formAction} className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <label className="font-bold text-forest ml-1" htmlFor="email">Explorer ID or Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-forest/40 group-focus-within:text-primary transition-colors">person</span>
                            </div>
                            <input name="email" className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-forest/10 rounded-xl text-forest font-medium placeholder-forest/30 focus:border-forest focus:ring-0 focus:shadow-hard-sm transition-all input-scribble outline-none" id="email" placeholder="captain@explorer.com" type="email" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="font-bold text-forest" htmlFor="password">Secret Code</label>
                            <a className="text-xs font-bold text-brick hover:underline decoration-2 underline-offset-2" href="#">Forgot code?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-forest/40 group-focus-within:text-primary transition-colors">lock</span>
                            </div>
                            <input name="password" className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-forest/10 rounded-xl text-forest font-medium placeholder-forest/30 focus:border-forest focus:ring-0 focus:shadow-hard-sm transition-all input-scribble outline-none" id="password" placeholder="••••••••" type="password" required />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm font-bold text-center">{errorMessage}</div>
                    )}
                    <button disabled={isPending} className="mt-4 w-full bg-primary hover:bg-primary/90 text-forest border-2 border-forest font-black text-lg py-3.5 px-8 rounded-xl shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-sm transition-all flex items-center justify-center gap-2 group relative overflow-hidden" type="submit">
                        <span className="relative z-10">{isPending ? "Logging in..." : "Start Exploring"}</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-black relative z-10">login</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
                <div className="relative flex py-6 items-center">
                    <div className="flex-grow border-t-2 border-dashed border-forest/10"></div>
                    <span className="flex-shrink-0 mx-4 text-forest/40 font-bold text-sm">or join with</span>
                    <div className="flex-grow border-t-2 border-dashed border-forest/10"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center py-2.5 border-2 border-forest/10 rounded-xl hover:bg-background hover:border-forest hover:shadow-hard-sm transition-all bg-white group" type="button">
                        <img alt="Google" className="w-6 h-6 group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb4Tknwqd5umDMouKHPokZH1MYOIDT21GAJG77iOoj6fm95fYjoietPKnT_JgJlf3cP_z2hnLWPMrUyw7nrNH0o8jYmvNtnhPu-ezFwjdoCR78ECHokjEBg1vzf7LKWKkO045Etd77I8CzPKi2FFHSMpaDKluUvPONcBdRfzzEMHouJWT9ioL-kpcDFVFusYIVKywoABWC3dUpxoQZzLRXr5dwetZZFb-NfMiThtf1OZkrZjAvYTG68LbfU-T8YWOCP-bFjglGg2A" />
                    </button>
                    <button className="flex items-center justify-center py-2.5 border-2 border-forest/10 rounded-xl hover:bg-background hover:border-forest hover:shadow-hard-sm transition-all bg-white group" type="button">
                        <img alt="GitHub" className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoakZVcjTKcbGlVhCJ_-H37bGzeKwWYSbsQPGdEOX2qk68mCAykm_RiXkH4XHP23RvUpiTx3I5lVu8Nk8LcBgGnA73elXEEPZW5yO7qAoTQICM4sXfUkKI54_OTLzvRi2CeUBZpWTxX2U0f9ttaGTew1Z_A0xpMjXZpyHRXgd9r2p4ezNET9nLOPiBrhUgsUzOdTqCnNpzSaC4xhjO4WphpVJf-XngtZApvJdctGHr4Hsq5Ude-UYZ95Xkj4_qbAJQrgwbOmeVeSo" />
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-forest/60 font-medium text-sm">
                        New to the crew?
                        <Link className="text-brick font-bold hover:underline decoration-2 underline-offset-2 ml-1" href="/signup">Join the expedition</Link>
                    </p>
                </div>
                <div className="absolute -top-3 -left-3 -rotate-12 bg-white px-3 py-1 border-2 border-forest shadow-sm rounded-lg z-20">
                    <span className="text-xs font-bold text-forest">Ver 2.0</span>
                </div>
            </div>
        </div>
    )
}
