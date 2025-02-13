import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { verifyToken } from "../../lib/auth";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
