"use client";
import { useState } from "react";
import React from "react";

import styles from "./Generator.module.scss";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface IGenerator {
  mutateHook: () => UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    number,
    unknown
  >;
  buttonText: string;
}

const Generator = ({ mutateHook, buttonText }: IGenerator) => {
  const [amount, setAmount] = useState<number>(1);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const { mutate } = mutateHook();

  const handleClick = () => {
    mutate(amount);
  };

  return (
    <div className={styles.generator}>
      <input
        defaultValue={amount}
        onChange={handleAmountChange}
        type="number"
      />
      <button onClick={handleClick}>
        Add {buttonText}
        {amount > 1 ? "s" : ""}
      </button>
    </div>
  );
};

export default Generator;
