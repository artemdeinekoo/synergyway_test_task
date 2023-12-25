import axios from "axios";
import Bank, { IUpdateBank } from "@/interfaces/Bank";

class banksService {
  private API_URL = "http://127.0.0.1:8000/banks";

  async getAll() {
    return axios.get<Bank[]>(this.API_URL);
  }

  async generateRandomBanks(amount: number) {
    return axios.post(`${this.API_URL}/generate/`, {
      num_of_banks: amount,
    });
  }

  async deleteBank(id: number) {
    return axios.delete(`${this.API_URL}/${id}`);
  }

  async updateBank(
    id: number,
    { bank_name, routing_number, swift_bic }: IUpdateBank
  ) {
    return axios.put<any, any, IUpdateBank>(`${this.API_URL}/${id}/`, {
      bank_name,
      routing_number,
      swift_bic,
    });
  }

  async removeUserFromBank(bank_id: number, user_id: number) {
    return axios.delete(`${this.API_URL}/${bank_id}/users/${user_id}/remove`);
  }
}

export default new banksService();
