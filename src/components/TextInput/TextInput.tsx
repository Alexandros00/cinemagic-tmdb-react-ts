import { useEffect, useState } from "react";
import styles from "./TextInput.module.scss";
import { debounce } from "@/utils/helpers";

const TextInput = () => {
  const [value, setValue] = useState("");

  const deb = debounce((input: string) => setValue(input), 2000);
  useEffect(() => {
    console.log("value: ", value);
  }, [value]);

  return (
    <input
      id="search-input"
      className={styles.textInput}
      type="text"
      placeholder="Search for a movie..."
      onChange={(event) => deb(event.target.value)}
    />
  );
};
export default TextInput;
