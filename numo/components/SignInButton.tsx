"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div style={{ marginRight: "50px" }}>
        <p>{session.user.name}</p>
        <Link href={"/api/auth/signout"}>Log Out</Link>
      </div>
    );

  return (
    <div style={{ marginRight: "50px" }}>
      <Link href={"/api/auth/signin"}>Log In</Link>
      <Link href={"/signup"}> Sign Up</Link>
    </div>
  );
};

export default SignInButton;
