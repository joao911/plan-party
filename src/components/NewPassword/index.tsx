import React, { useState } from "react";
import { Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordFelipe, resetPasswordVito } from "./useNewPassword";
import { useSetApi } from "../../setApi";

export const NewPassword: React.FC = () => {
  const { api } = useSetApi();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const passwordSchema = z
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial."
    );
  const userSchema = z
    .object({
      code: z.string().min(1, "Código é obrigatório"),
      email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

      password: passwordSchema,
      confirm_password: passwordSchema,
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "As senhas não são iguais.",
      path: ["confirm_password"],
    });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
  });
  const { mutateAsync: resetPasswordVitoFn } = useMutation({
    mutationFn: resetPasswordVito,
  });

  const { mutateAsync: resetPasswordFelipeFn } = useMutation({
    mutationFn: resetPasswordFelipe,
  });

  async function handleSendCodeVito(
    email: string,
    code: string,
    newPassword: string,
    confirmPassword: string
  ) {
    try {
      await resetPasswordVitoFn({
        email,
        code,
        newPassword,
        confirmPassword,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (data: NewCycleFormData) => {
    const { code, password, confirm_password, email } = data;
    api
      ? await handleSendCodeVito(email, code, password, confirm_password)
      : await resetPasswordFelipeFn({
          codigo: code,
          novaSenha: password,
        });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="code"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="w-full h-[5rem]">
            <label htmlFor="name">Código</label>
            <Input
              id="name"
              {...field}
              placeholder="Digite o código enviado para seu email"
              status={errors.code ? "error" : ""}
            />
            {errors.code && (
              <span className="text-red-500">{errors.code.message}</span>
            )}
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="w-full h-[5rem]">
            <label htmlFor="email">Código</label>
            <Input
              id="email"
              {...field}
              placeholder="Digite o código enviado para seu email"
              status={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="w-full h-[5rem]">
            <label htmlFor="email">Senha</label>
            <Input.Password
              id="password"
              {...field}
              placeholder="Senha"
              status={errors.password ? "error" : ""}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
            {errors.password && (
              <span className="text-red-500">{errors?.password?.message}</span>
            )}
          </div>
        )}
      />
      <Controller
        name="confirm_password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="w-full h-[5rem]">
            <label htmlFor="confirm_password">Confirme sua senha</label>
            <Input.Password
              id="confirm_password"
              {...field}
              placeholder="Confirme sua senha"
              status={errors.confirm_password ? "error" : ""}
              visibilityToggle={{
                visible: confirmPasswordVisible,
                onVisibleChange: setConfirmPasswordVisible,
              }}
            />
            {errors.confirm_password && (
              <span className="text-red-500">
                {errors?.confirm_password?.message}
              </span>
            )}
          </div>
        )}
      />
      <Button className="w-full text-white bg-button-color" htmlType="submit">
        Redefinir e acessar
      </Button>
    </form>
  );
};
