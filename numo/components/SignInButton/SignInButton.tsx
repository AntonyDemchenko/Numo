"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "./signInButton.module.scss";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className={styles.signInButton_block}>
        <Link href="/profile" className={styles.username}>
          {session.user.name}
        </Link>
        <Link href={"/api/auth/signout"}>Log Out</Link>
      </div>
    );

  return (
    <div className={styles.signInButton_block}>
      <Link href={"/api/auth/signin"} className={styles.username}>
        Log In
      </Link>
      <Link href={"/signup"} className={styles.signin}>
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
