import Image from "next/image";
// import styles from "./page.module.css";
// import variables from "../styles/variables.module.scss";
import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <Image
          src="/numo-logo-02.png"
          width={100}
          height={100}
          alt="Numo logo"
        ></Image>
      </div>
      <div
        className={styles.block}
      >{`Hi there! Seeking new friendships and exciting events? You've come to the right place. Welcome to NUMO, your gateway to a world of connections and fun!`}</div>

      <div className={styles.block}>
        App Information
        <ul>
          <li>Purpose Statement</li>
          <li>Development Phase</li>
          <li>Call to Action</li>
          <li>Appreciation</li>
        </ul>
      </div>
    </div>
  );
}
