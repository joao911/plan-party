import { apiVito } from "../../../api";

export interface registerVitoBody {
  contact: string;
  password: string;
}

export interface registerFelipeBody {
  email: string;
  password: string;
}
export async function loginVito(body: registerVitoBody) {
  const response = await apiVito.post("/Account/login", body);
  return response.data;
}

export async function loginFelipe(body: registerFelipeBody) {
  const response = await apiVito.post("/auth/login", body);
  return response.data;
}
