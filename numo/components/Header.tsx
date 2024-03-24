import Link from "next/link";
import styles from "../styles/header.module.scss";
import SignInButton from "./SignInButton";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/profile">Profile</Link>
      </nav>

      <SignInButton></SignInButton>
    </header>
  );
}
