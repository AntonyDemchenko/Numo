"use client";

import styles from "./signin.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/resetPass`,
      {
        method: "PATCH",
        body: JSON.stringify({ email: userEmail }),
      }
    );

    if (res.status === 200) {
      setIsSuccess(true);
    }
  };

  return (
    <div className={styles.signin}>
      <div>Reset Password</div>
      {isSuccess ? (
        <>
          <div>Email sent successfully</div>
          <button onClick={() => router.push("/auth/signin")}>
            Go to login
          </button>
        </>
      ) : (
        <>
          <div>
            <input
              name="name"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <br />

            <div>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => router.back()}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPasswordPage;
