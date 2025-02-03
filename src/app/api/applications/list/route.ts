import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany();
    if (!students) {
      return NextResponse.json({ error: "No students found" }, { status: 404 });
    }
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications", details: error.message },
      { status: 500 }
    );
  }
}