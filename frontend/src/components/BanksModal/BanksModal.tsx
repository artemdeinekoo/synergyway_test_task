"use client";
import React, { useEffect, useRef } from "react";
import styles from "./BanksModal.module.scss";
import Loading from "../Loading/Loading";
import { useAddBankToUser } from "@/hooks/useAddBankToUser";
import { IUnknownBank } from "@/interfaces/Bank";
import { useGetUserUnknownBanks } from "@/hooks/useGetUserUnknownBanks";

interface IBanksModal {
  open: boolean;
  close: () => void;
  user_id: number;
}

const BanksModal = ({ open, close, user_id }: IBanksModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutate } = useAddBankToUser();
  const { data, isLoading, isError, refetch } = useGetUserUnknownBanks(user_id);

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={modalRef}
      style={{ display: open ? "block" : "none" }}
      className={styles.modal}
    >
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={() => close()}>
          Close
        </button>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>There was an Error, try again</div>
        ) : (
          <>
            {data?.map((bank) => (
              <div
                onClick={() => {
                  mutate({ user_id: user_id, bank_id: bank.id });
                  close();
                }}
                key={bank.id}
                className={styles.card}
              >
                <h3>ID: {bank.id}</h3>
                <h3>{bank.bank_name}</h3>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BanksModal;
