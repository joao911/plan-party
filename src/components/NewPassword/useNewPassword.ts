import { apiVito } from "../../api";

export interface resetPasswordVitoBody {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface resetPasswordFelipeBody {
  codigo: string;
  novaSenha: string;
}
export async function resetPasswordVito(body: resetPasswordVitoBody) {
  const response = await apiVito.post("Account/reset-password", body);
  return response.data;
}

export async function resetPasswordFelipe(body: resetPasswordFelipeBody) {
  const response = await apiVito.post("auth/redefinir-senha", body);
  return response.data;
}
