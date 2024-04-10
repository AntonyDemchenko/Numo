"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("Error verifying your email");

  useEffect(() => {
    const emailVerification = async () => {
      if (!email || !token) {
        throw new Error("Missing required fields");
      }
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/verifyUser`,
          {
            method: "PATCH",
            body: JSON.stringify({
              email: email,
              emailVerificationToken: token,
            }),
          }
        );

        setResult("Email verified successfully. Please relogin.");
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying email:", error);
        throw new Error("Error verifying email");
      }
    };

    emailVerification();
  }, [email, token]);

  return (
    <>
      <div className="mb-4">{isLoading ? "Please wait ..." : result}</div>
      <div className="my-3">
        <Link href="/login" className="bg-white py-3 px-2 rounded">
          Back to Login
        </Link>
      </div>
    </>
  );
}
