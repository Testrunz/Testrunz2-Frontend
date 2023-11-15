import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Loader;
