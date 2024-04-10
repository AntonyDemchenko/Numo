"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/styles.module.scss";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const { push } = useRouter();

  const [userData, setUserData] = useState<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegistration = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );
    if (res.status === 200) {
      push(`/signup/successSignup?email=${userData.email}`);
    }
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
        <label>email</label>
        <input
          name="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <label>password</label>
        <input
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <div>
          <button onClick={handleRegistration}>Submit</button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
