import Link from "next/link";
import styles from "./header.module.scss";
import SignInButton from "../SignInButton/SignInButton";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <Link className={styles.header_nav_link} href="/">
          Home
        </Link>
        <Link className={styles.header_nav_link} href="/blog">
          Blog
        </Link>
        <Link className={styles.header_nav_link} href="/about">
          About
        </Link>
        <Link className={styles.header_nav_link} href="/profile">
          Profile
        </Link>
      </nav>

      <SignInButton></SignInButton>
    </header>
  );
}
