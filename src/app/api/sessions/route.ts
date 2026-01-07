import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { adventureId, duration, completed } = body;
    const userId = session.user.id;

    // Transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
        // 1. Create Session
        const newSession = await tx.session.create({
            data: {
                userId: userId,
                adventureId,
                duration,
                completed: completed,
            }
        });

        // 2. Update Adventure
        const adventure = await tx.adventure.findUnique({ where: { id: adventureId } });
        if (adventure) {
            const newTimeSpent = adventure.timeSpent + duration;
            const newProgress = Math.min(100, Math.round((newTimeSpent / adventure.targetTime) * 100));

            await tx.adventure.update({
                where: { id: adventureId },
                data: {
                    timeSpent: newTimeSpent,
                    progress: newProgress,
                }
            });
        }

        // 3. Update User Stats
        const user = await tx.user.findUnique({ where: { id: session.user.id } });
        if (user) {
            await tx.user.update({
                where: { id: session.user.id },
                data: {
                    totalFocusTime: user.totalFocusTime + duration,
                    xp: user.xp + (duration * 2), // 2 XP per minute
                    tasksCompleted: completed ? user.tasksCompleted + 1 : user.tasksCompleted,
                }
            });
        }

        return newSession;
    });

    return NextResponse.json(result);
}
