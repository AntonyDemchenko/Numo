"use client";

import Link from "next/link";
import styles from "../../../styles/styles.module.scss";
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
    <div className={styles.main}>
      <div>Sign up</div>
      <div className="p-2 flex flex-col gap-6">
        <label>name</label>
        <input
          name="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br />
        <label>password</label>
        <input
          name="password"
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
      </div>
    </div>
  );
};

export default Signin;
