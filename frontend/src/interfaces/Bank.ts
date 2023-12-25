import User from "./User";

export default interface Bank {
  id: number;
  bank_name: string;
  routing_number: string;
  swift_bic: string;
  users: User[];
}

export interface IUpdateBank extends Omit<Bank, "id" | "users"> {}

export interface IUnknownBank
  extends Omit<Bank, "routing_number" | "swift_bic" | "users"> {}
