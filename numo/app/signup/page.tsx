"use client";

import Link from "next/link";
import { useState } from "react";
import { Backend_URL } from "../lib/Constants";
import styles from "../../styles/styles.module.scss";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    const res = await fetch(Backend_URL + "/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    router.push("/");
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
          <button onClick={register}>Submit</button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
