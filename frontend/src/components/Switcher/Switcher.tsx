import React from "react";

import styles from "./Switcher.module.scss";

interface SwitcherProps {
  users: boolean;
  setUsers: () => void;
}

const Switcher = ({ users, setUsers }: SwitcherProps) => {
  return (
    <div className={styles.switcher}>
      <button className={users ? styles.active : ""} onClick={setUsers}>
        Users
      </button>
      <button className={users ? "" : styles.active} onClick={setUsers}>
        Banks
      </button>
    </div>
  );
};

export default Switcher;
