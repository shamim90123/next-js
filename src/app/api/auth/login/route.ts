import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { comparePassword, generateToken } from "../../../lib/auth";

export async function POST(req: Request) {
  try {
    console.log("Login API Route Triggered");
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If user doesn't exist, return an error
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

     // Check password
     const isMatch = await comparePassword(password, user.password);
     if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

      // Generate JWT
    const token = generateToken(user.id);

    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } });
 

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(body.password, user.password);

    // // If passwords don't match, return an error
    // if (!isPasswordValid) {
    //   return NextResponse.json(
    //     { error: "Invalid email or password" },
    //     { status: 401 }
    //   );
    // }

    // If everything is valid, return the user (excluding the password)
    // const { password, ...userWithoutPassword } = user;
    // return NextResponse.json({ user: userWithoutPassword }, { status: 200 });

  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}