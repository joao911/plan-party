import React, { useState } from "react";
import { Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { sendCodeFelipe, sendCodeVito } from "./useEmail";
import { useSetApi } from "../../setApi";
interface EmailProps {
  setStepNumber(step: number): void;
  setEmail(email: string): void;
}
export const Email: React.FC<EmailProps> = ({ setStepNumber, setEmail }) => {
  const { api } = useSetApi();

  const userSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync: sendCodeVitoFn } = useMutation({
    mutationFn: sendCodeVito,
  });

  const { mutateAsync: sendCodeFelipeFn } = useMutation({
    mutationFn: sendCodeFelipe,
  });

  async function handleSendCodeVito(email: string) {
    try {
      setStepNumber(1);
      await sendCodeVitoFn({
        email,
        phone: "",
        whatsApp: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSendCodeFelipe(email: string) {
    try {
      setStepNumber(1);
      await sendCodeFelipeFn({
        email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (data: NewCycleFormData) => {
    const { email } = data;
    setEmail(email);
    api ? await handleSendCodeVito(email) : await handleSendCodeFelipe(email);
  };
  return (
    <>
      <h1 className="text-xl font-bold">Esqueceu sua senha?</h1>
      <p className="font-semibold">
        Digite seu e-mail e enviaremos instruções para redefinir sua senha
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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

        <Button className="w-full text-white bg-button-color" htmlType="submit">
          Enviar
        </Button>
      </form>
    </>
  );
};
