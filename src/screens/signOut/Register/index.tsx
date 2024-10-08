import React, { useState } from "react";
import { Card, Input, Button } from "antd";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
// import { Container } from './styles';

export const Register: React.FC = () => {
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
      nome: z.string().min(1, "Nome é obrigatório"),
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
  const onSubmit = async (data: NewCycleFormData) => {
    console.log("data", data);
  };

  return (
    <Card className="p-2 w-[25rem]">
      <Link to="/">
        <p className="mb-4">eu sou o Logo seus viado</p>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="w-full h-[5rem]">
              <label htmlFor="name">Email</label>
              <Input
                id="name"
                {...field}
                placeholder="Nome"
                status={errors.nome ? "error" : ""}
              />
              {errors.nome && (
                <span className="text-red-500">{errors.nome.message}</span>
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
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                {...field}
                placeholder="seu email"
                status={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="text-red-500">{errors?.email?.message}</span>
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
              <label htmlFor="email">Email</label>
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
                <span className="text-red-500">
                  {errors?.password?.message}
                </span>
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
                placeholder="Senha"
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
          Criar e acessar
        </Button>
      </form>
    </Card>
  );
};
