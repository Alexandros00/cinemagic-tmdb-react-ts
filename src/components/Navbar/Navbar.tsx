import { JSX } from "react";
import styles from "./Navbar.module.scss";
import { appConfig } from "../../constants/config";

const Navbar = (): JSX.Element => {
  return (
    <nav className={styles.Navbar}>
      <header>
        <h1>{appConfig.appName}</h1>
      </header>
    </nav>
  );
};

export default Navbar;
