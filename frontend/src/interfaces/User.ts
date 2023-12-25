export default interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  banks: [];
}

export interface IUpdateUser extends Omit<User, "id" | "banks"> {}
