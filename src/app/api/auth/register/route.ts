import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("API Route Triggered");
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user exists
    // const existingUser = await prisma.user.findUnique({ where: { body.email } });
    // if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });


    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: { name: body.name, email: body.email, password: hashedPassword },
    });

    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
