"use client";
import React from "react";
import Loading from "../Loading/Loading";

import styles from "./BanksList.module.scss";
import BankCard from "../BankCard/BankCard";
import { useBanks } from "@/hooks/useBanks";

const BanksList = () => {
  const { data, isLoading, isError } = useBanks();

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>There was an Error, try again</div>
      ) : (
        <>
          {data?.map((bank) => (
            <BankCard {...bank} key={bank.id}></BankCard>
          ))}
        </>
      )}
    </div>
  );
};

export default BanksList;
