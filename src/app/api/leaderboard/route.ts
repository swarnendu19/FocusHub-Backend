import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
        orderBy: { xp: 'desc' },
        take: 10,
        select: {
            id: true,
            name: true,
            email: true,
            level: true,
            xp: true,
            totalFocusTime: true,
            avatarUrl: true,
        }
    });

    const leaderboard = users.map((user, index) => ({
        rank: index + 1,
        name: user.name || 'Anonymous',
        username: user.email.split('@')[0],
        role: 'Explorer',
        level: user.level,
        time: `${Math.floor(user.totalFocusTime / 60)}h ${user.totalFocusTime % 60}m`,
        xp: user.xp,
        avatarUrl: user.avatarUrl || '',
        isCurrentUser: user.id === session.user.id,
    }));

    return NextResponse.json(leaderboard);
}
