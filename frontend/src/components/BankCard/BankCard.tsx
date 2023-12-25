"use cleint";
import React, { useState } from "react";
import styles from "./BankCard.module.scss";
import Bank from "@/interfaces/Bank";
import { useDeleteBank } from "@/hooks/useDeleteBank";
import { useForm } from "react-hook-form";
import { useUpdateBank } from "@/hooks/useUpdateBank";
import { useRemoveUserFromBank } from "@/hooks/useRemoveUserFromBank";

interface IFormInput {
  bank_name: string;
  routing_number: string;
  swift_bic: string;
}

const BankCard = ({
  id,
  bank_name,
  routing_number,
  swift_bic,
  users,
}: Bank) => {
  const [active, setActive] = useState<boolean>(false);
  const [editing, setEditing] = useState(false);

  const { mutate: deleteBank } = useDeleteBank();
  const { mutate: updateBank } = useUpdateBank();
  const { mutate: removeUserFromBank } = useRemoveUserFromBank();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleDeleteClick = () => {
    deleteBank(id);
  };

  const onSubmit = (data: IFormInput) => {
    updateBank({ id, updateBank: data });
    setEditing(false);
  };

  const handleRemoveUserFromBank = (user_id: number) => {
    removeUserFromBank({ bank_id: id, user_id: user_id });
  };

  return (
    <div className={styles.bankcard}>
      {editing ? (
        <div className={styles.card}>
          <form className={styles.text} onSubmit={handleSubmit(onSubmit)}>
            <h3>ID: {id}</h3>

            <input
              {...register("bank_name", { required: true, maxLength: 100 })}
              defaultValue={bank_name}
              className={errors.bank_name ? styles.error : ""}
            />
            <input
              {...register("routing_number", {
                required: true,
                maxLength: 100,
              })}
              defaultValue={routing_number}
              className={errors.routing_number ? styles.error : ""}
            />
            <input
              {...register("swift_bic", { required: true, maxLength: 100 })}
              defaultValue={swift_bic}
              className={errors.swift_bic ? styles.error : ""}
            />
          </form>
          <div className={styles.buttons}>
            <button
              className={styles.cancel}
              onClick={() => setEditing(!editing)}
            >
              Cancel
            </button>
            <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.text}>
            <h3>ID: {id}</h3>
            <h3>{bank_name}</h3>
            <h3>Routing Number: {routing_number}</h3>
            <h3>Swift BIC: {swift_bic}</h3>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => setActive(!active)}>Edit Users</button>
            <button onClick={() => setEditing(!editing)}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      )}

      <div className={`${styles.inner} ${active ? styles.active : ""}`}>
        {users?.map((user) => (
          <div key={user.username} className={styles.el}>
            <div className={styles.user}>
              <h3>ID: {user.id}</h3>
              <h3>{user.first_name}</h3>
              <h3>{user.last_name}</h3>
            </div>

            <button onClick={() => handleRemoveUserFromBank(user.id)}>
              Remove From Bank
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankCard;
