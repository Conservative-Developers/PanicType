import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");

    const results = await prisma.typingResult.findMany({
      orderBy: { wpm: "desc" },
      take: limit,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
