import styles from "../../styles/styles.module.scss";

export default function About() {
  return (
    <div className="main_content">
      <div className={styles.block}>
        {`Our app is all about fostering connections and making new friends. By providing a platform for organizing and discovering events, we bring like-minded people together to share experiences and forge meaningful relationships. Join us in building a vibrant community where everyone can find companionship and support.`}
      </div>
      <div className={styles.block}>Benefits</div>
      <div className={styles.block}>
        How to Interact Section
        <ul>
          <li> Creating Events</li>
          <li>Finding Events</li>
          <li>Joining Events</li>
          <li>Finding Friends</li>
        </ul>
      </div>
    </div>
  );
}
