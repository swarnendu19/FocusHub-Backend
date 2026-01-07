import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const defaultBadges = [
    {
        name: 'Blast Off!',
        description: 'Completed your first 5 sessions.',
        icon: 'rocket_launch',
        category: 'Focus & Time',
        total: 5,
        bgColor: 'bg-primary',
    },
    {
        name: 'Zen Master',
        description: '2 hours of focus without pause.',
        icon: 'self_improvement',
        category: 'Focus & Time',
        total: 120,
        bgColor: 'bg-[#9dc2ad]',
    },
    {
        name: 'On Fire',
        description: 'Maintained a 3-day streak.',
        icon: 'local_fire_department',
        category: 'Streaks',
        total: 3,
        bgColor: 'bg-brick',
    },
    {
        name: 'Time Keeper',
        description: 'Track 10 hours of focus time.',
        icon: 'timer',
        category: 'Focus & Time',
        total: 10,
        bgColor: 'bg-primary',
    },
    {
        name: 'Early Bird',
        description: 'Start 5 sessions before 9 AM.',
        icon: 'wb_sunny',
        category: 'Focus & Time',
        total: 5,
        bgColor: 'bg-[#d9e6dc]',
    },
    {
        name: 'Log Master',
        description: 'Complete 20 focus sessions.',
        icon: 'edit_note',
        category: 'Focus & Time',
        total: 20,
        bgColor: 'bg-card',
    },
    {
        name: 'Night Owl',
        description: 'Complete 5 sessions after 10 PM.',
        icon: 'bedtime',
        category: 'Focus & Time',
        total: 5,
        bgColor: 'bg-muted',
    },
    {
        name: 'Caffeine Fix',
        description: 'Take 10 breaks during sessions.',
        icon: 'local_cafe',
        category: 'Focus & Time',
        total: 10,
        bgColor: 'bg-muted',
    },
    {
        name: 'Month Warrior',
        description: 'Complete sessions for 30 days.',
        icon: 'calendar_month',
        category: 'Milestones',
        total: 30,
        bgColor: 'bg-muted',
    },
    {
        name: 'Gold Medalist',
        description: 'Complete a 100-hour project.',
        icon: 'workspace_premium',
        category: 'Milestones',
        total: 1,
        bgColor: 'bg-muted',
    },
    {
        name: 'High Voltage',
        description: 'Achieve a 50-day streak.',
        icon: 'bolt',
        category: 'Streaks',
        total: 50,
        bgColor: 'bg-muted',
    },
];

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await prisma.badge.count();
    if (count === 0) {
        await prisma.badge.createMany({
            data: defaultBadges,
        });
    }

    const badges = await prisma.badge.findMany();
    const userBadges = await prisma.userBadge.findMany({
        where: { userId: session.user.id },
    });

    const result = badges.map(badge => {
        const userBadge = userBadges.find(ub => ub.badgeId === badge.id);
        return {
            ...badge,
            earned: !!userBadge?.earned,
            earnedAt: userBadge?.earnedAt,
            progress: userBadge?.progress || 0,
        };
    });

    return NextResponse.json(result);
}
