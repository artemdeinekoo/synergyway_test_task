import axios from "axios";
import User, { IUpdateUser } from "@/interfaces/User";
import { IUnknownBank } from "@/interfaces/Bank";

class userService {
  private API_URL = "http://127.0.0.1:8000/users";

  async getAll() {
    return axios.get<User[]>(this.API_URL);
  }

  async generateRandomUsers(amount: number) {
    return axios.post(`${this.API_URL}/generate/`, {
      num_of_users: amount,
    });
  }

  async deleteUser(id: number) {
    return axios.delete(`${this.API_URL}/${id}`);
  }

  async updateUser(
    id: number,
    { first_name, last_name, username, email, password }: IUpdateUser
  ) {
    return axios.put<any, any, IUpdateUser>(`${this.API_URL}/${id}/`, {
      first_name,
      last_name,
      username,
      email,
      password,
    });
  }

  async getUserUnknownBanks(id: number) {
    console.log(id);
    const test = await axios.get<IUnknownBank[]>(
      `${this.API_URL}/${id}/unknown_banks`
    );
    console.log(test);
    return test;
  }

  async addBankToUser(user_id: number, bank_id: number) {
    return axios.post<any, any, { user_id: number; bank_id: number }>(
      `${this.API_URL}/add_bank/`,
      {
        user_id: user_id,
        bank_id: bank_id,
      }
    );
  }
}

export default new userService();
