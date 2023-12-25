"use client";
import React, { useState } from "react";
import styles from "./UserCard.module.scss";

import User from "@/interfaces/User";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useGetUserUnknownBanks } from "@/hooks/useGetUserUnknownBanks";
import BanksModal from "../BanksModal/BanksModal";

interface IFormInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

const UserCard = ({
  id,
  email,
  first_name,
  last_name,
  password,
  username,
}: User) => {
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    updateUser({ id, updateUser: data });
    setEditing(false);
  };

  const handleDeleteClick = () => {
    deleteUser(id);
  };

  return editing ? (
    <div className={styles.card}>
      <form className={styles.text} onSubmit={handleSubmit(onSubmit)}>
        <h3>ID: {id}</h3>
        <input
          {...register("first_name", { required: true, maxLength: 100 })}
          defaultValue={first_name}
          className={errors.first_name ? styles.error : ""}
        />
        <input
          {...register("last_name", { required: true, maxLength: 100 })}
          defaultValue={last_name}
          className={errors.last_name ? styles.error : ""}
        />
        <input
          {...register("username", { required: true, maxLength: 100 })}
          defaultValue={username}
          className={errors.username ? styles.error : ""}
        />
        <input
          {...register("email", { required: true, maxLength: 100 })}
          defaultValue={email}
          className={errors.email ? styles.error : ""}
        />
        <input
          {...register("password", { required: true, maxLength: 100 })}
          defaultValue={password}
          className={errors.password ? styles.error : ""}
        />
      </form>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={() => setEditing(!editing)}>
          Cancel
        </button>
        <button onClick={handleSubmit(onSubmit)} className={styles.submit}>
          Submit
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.card}>
      <BanksModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        user_id={id}
      />
      <div className={styles.text}>
        <h3>ID: {id}</h3>
        <h3>{first_name}</h3>
        <h3>{last_name}</h3>
        <h3>{username}</h3>
        <h3>{email}</h3>
        <h3>{password}</h3>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => setEditing(!editing)}>Edit</button>
        <button onClick={() => setModalOpen(true)} className={styles.join}>
          Join Bank
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
