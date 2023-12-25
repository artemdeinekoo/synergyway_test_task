"use client";
import React from "react";
import Loading from "../Loading/Loading";
import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.scss";
import { useUsers } from "@/hooks/useUsers";

const UserList = () => {
  const { data, isLoading, isError, refetch } = useUsers();

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>There was an Error, try again</div>
      ) : (
        <>
          {data?.map((user) => (
            <UserCard {...user} key={user.id}></UserCard>
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;
