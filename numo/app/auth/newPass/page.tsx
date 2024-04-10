"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const router = useRouter();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (passwords.password === passwords.confirmPassword) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/resetPass`,
        {
          method: "POST",
          body: JSON.stringify({
            email: "111@gmail.com",
            password: passwords.password,
            emailVerificationToken: token,
          }),
        }
      );

      if (res.status === 200) {
        setIsSuccess(true);
      }
    }

    return setIsError(true);
  };

  return (
    <div>
      <div>New Password</div>
      {isSuccess ? (
        <>
          <div>Password updated successfully</div>
          <button onClick={() => router.push("/auth/signin")}>
            Go to login
          </button>
        </>
      ) : (
        <>
          <div>
            <input
              name="password"
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Password"
              value={passwords.password}
              onChange={(e) =>
                setPasswords({ ...passwords, password: e.target.value })
              }
            />
            <input
              name="password"
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
            />
            <br />
            {isError && <div>Passwords error!</div>}

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
