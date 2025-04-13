import { JSX, useEffect, useRef } from "react";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement>(null);

  function goToHome(): void {
    navigate("/");
  }
  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <div className={styles.NotFound} role="alert" aria-live="assertive">
      <strong>Page not found!</strong>
      <button
        ref={buttonRef}
        onClick={goToHome}
        aria-label="Go back to home page"
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            goToHome();
          }
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default NotFound;
