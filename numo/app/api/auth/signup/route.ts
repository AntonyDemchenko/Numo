import { register, resetVerificationToken } from "@/services/auth";
import { EmailType, sendVerificationEmail } from "@/utils/email";
import { generateEmailVerificationToken } from "@/utils/helpers/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const token = generateEmailVerificationToken();

  const userSaved = await register({ ...body, emailVerificationToken: token });

  if (userSaved.statusCode === 200) {
    const res = await sendVerificationEmail(
      "tonisaysdo@gmail.com",
      token,
      EmailType.Verification
    );

    if (res) {
      return NextResponse.json({ status: 200 });
    }
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const token = generateEmailVerificationToken();

  const userSaved = await resetVerificationToken({
    ...body,
    emailVerificationToken: token,
  });

  if (userSaved.statusCode === 200) {
    const res = await sendVerificationEmail(
      "tonisaysdo@gmail.com",
      token,
      EmailType.Verification
    );

    if (res) {
      return NextResponse.json({ status: 200 });
    }
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}