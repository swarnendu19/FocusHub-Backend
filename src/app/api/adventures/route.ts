import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adventures = await prisma.adventure.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(adventures);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, category, priority, targetTime, icon } = body;

    // Color rotation logic
    const count = await prisma.adventure.count({
        where: { userId: session.user.id },
    });

    const colors = ['primary', 'brick', 'forest'];
    const color = colors[count % colors.length];

    const adventure = await prisma.adventure.create({
        data: {
            name,
            description,
            category,
            priority,
            targetTime,
            icon,
            color,
            userId: session.user.id,
        },
    });

    return NextResponse.json(adventure);
}
