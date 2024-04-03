"use client";

import Link from "next/link";
import styles from "./signin.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

type FormInputs = {
  name: string;
  password: string;
};

const Signin = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [userData, setUserData] = useState<FormInputs>({
    name: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      username: userData.name,
      password: userData.password,
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  return (
    <div className={styles.signin}>
      <div>Sign up</div>
      <div>
        <input
          name="name"
          placeholder="Email"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <div>
          <button onClick={handleSubmit}>Submit</button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
        <div>OR</div>
        <Link href="http://localhost:5000/api/auth/google">
          Sign In with Google
        </Link>
      </div>
    </div>
  );
};

export default Signin;
