import { apiVito } from "../../api";

export interface sendRestaurantBody {
  email: string;
  phone: string;
  whatsApp: string;
}
export interface sendCodeToEmailFelipeBody {
  email: string;
}
export async function sendCodeVito(body: sendRestaurantBody) {
  const response = await apiVito.post("/Account/forgot-password", body);
  return response.data;
}

export async function sendCodeFelipe(body: sendCodeToEmailFelipeBody) {
  const response = await apiVito.post("auth/recuperar-senha'", body);
  return response.data;
}
