import { verifyUser } from "@/services/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  try {
    const res = await verifyUser(body);

    if (res.statusCode === 200) {
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
