import axios from "axios";
import { ENV } from "../../config/env";

export const PaystackService = {
  async initialize(email: string, amount: number) {
    const res = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${ENV.PAYSTACK_SECRET}`
        }
      }
    );
    return res.data.data;
  }
};
