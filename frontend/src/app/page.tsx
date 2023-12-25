"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Switcher from "@/components/Switcher/Switcher";
import UserList from "@/components/UserList/UserList";
import BanksList from "@/components/BanksList/BanksList";
import { useGenerateUsers } from "@/hooks/useGenerateUsers";
import { useGenerateBanks } from "@/hooks/useGenerateBanks";
import Generator from "@/components/Generator/Generator";

export default function Home() {
  const [users, setUsers] = useState<boolean>(true);

  const handleSetUsers = () => {
    setUsers(!users);
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Switcher users={users} setUsers={handleSetUsers} />

        {users ? (
          <div>
            <Generator mutateHook={useGenerateUsers} buttonText="User" />
            <UserList />
          </div>
        ) : (
          <div>
            <Generator mutateHook={useGenerateBanks} buttonText="Bank" />
            <BanksList />
          </div>
        )}
      </div>
    </main>
  );
}
