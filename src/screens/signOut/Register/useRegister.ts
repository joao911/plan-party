import { apiVito } from "../../../api";

export interface registerVitoBody {
  contact: string;
  password: string;
  confirmPassword: string;
  recoveryOptions: [string];
}
export interface registerFelipeBody {
  name: string;
  email: string;
  password: string;
}
export async function registerVito(body: registerVitoBody) {
  const response = await apiVito.post("/Account/create", body);
  return response.data;
}

export async function registerFelipe(body: registerFelipeBody) {
  const response = await apiVito.post("auth/register", body);
  return response.data;
}
