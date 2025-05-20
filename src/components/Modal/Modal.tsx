import { JSX, useEffect } from "react";
import styles from "./Modal.module.scss";
import { useNavigate } from "react-router-dom";

const Modal = ({
  closeModal,
  children
}: {
  closeModal: () => void;
  children: JSX.Element;
}) => {
  const navigate = useNavigate();

  function onCloseModal(): void {
    closeModal();
    navigate("/movies");
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.contentContr}>
        <button className={styles.closeButton} onClick={onCloseModal}>
          <img
            src="/icons/close-sharp.svg"
            alt="Close"
            className={styles.closeIcon}
          />
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
