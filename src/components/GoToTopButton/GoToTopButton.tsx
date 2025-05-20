import styles from "./GoToTopButton.module.scss";

const GoToTopButton = () => {
  const onGoToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  return (
    <button className={styles.goToTopButton} onClick={onGoToTop}>
      <img
        src="/icons/arrow-up-solid.svg"
        alt="Go to top"
        className={styles.goToTopIcon}
      />
    </button>
  );
};

export default GoToTopButton;
