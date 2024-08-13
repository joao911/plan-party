import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
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
    <Card className="p-2 w-[25rem] border-none ">
      <Link to="/">
        <p className="mb-4">eu sou o Logo seus viado</p>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                status={errors?.email ? "error" : ""}
              />
              {errors?.email && (
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
              <label htmlFor="password">Senha</label>
              <Input.Password
                id="password"
                {...field}
                placeholder="seu password"
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
        <Button className="w-full text-white bg-button-color" htmlType="submit">
          Entrar
        </Button>
      </form>
      <div className="flex justify-between mt-2">
        <Link to="/forgot-password">
          <p className="cursor-pointer text-button-color">
            Esqueceu sua senha?
          </p>
        </Link>
        <Link to="/register">
          <p className="cursor-pointer text-button-color">Criar conta</p>
        </Link>
      </div>
    </Card>
  );
};
