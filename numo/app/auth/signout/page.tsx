"use client";
import { useRouter } from "next/navigation";
import styles from "../../../styles/styles.module.scss";
import { signOut } from "next-auth/react";

const SignOutPage = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };
  return (
    <div className={styles.main}>
      <div>Sign out</div>

      <p>Are you sure you want to sign out?</p>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  );
};

export default SignOutPage;
