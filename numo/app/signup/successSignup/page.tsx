"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/styles.module.scss";
import { useSearchParams } from "next/navigation";

const ResendEmailPage = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleResendEmail = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/resetPass`,
      {
        method: "PATCH",
        body: JSON.stringify({ email }),
      }
    );
  };

  return (
    <div className={styles.main}>
      <div>
        <br />
        <p>
          {`Email sent successfully! 
            Check your mail and click "confirm" 
            If the email did not arrive, click "send again"`}
        </p>
        <br />
        <button onClick={handleResendEmail}>Send again </button>
        <br />
        <br />
        <Link href={"/profile"}>Go to Login</Link>
      </div>
    </div>
  );
};

export default ResendEmailPage;
