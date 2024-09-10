import React from "react";
import { Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import { sendCodeFelipe, sendCodeVito } from "../Email/useEmail";
import { useSetApi } from "../../setApi";

interface VerifyEmailProps {
  setStepNumber(step: number): void;
  email: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({
  setStepNumber,
  email,
}) => {
  const { api } = useSetApi();

  const { mutateAsync: sendCodeVitoFn } = useMutation({
    mutationFn: sendCodeVito,
  });

  const { mutateAsync: sendCodeFelipeFn } = useMutation({
    mutationFn: sendCodeFelipe,
  });

  async function handleSendCodeVito(email: string) {
    try {
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

  function handleResendCode() {
    api ? handleSendCodeVito(email) : handleSendCodeFelipe(email);
  }

  return (
    <>
      <h1 className="text-xl font-bold">Verifique seu e-mail </h1>
      <p className="font-semibold">
        Link de ativação da conta enviado para seu endereço de e-mail:
        seuemail@email.com Siga o link interno para continuar.
      </p>
      <Button
        className="w-full mt-4 text-white bg-button-color"
        htmlType="submit"
        onClick={() => setStepNumber(2)}
      >
        Ok
      </Button>
      <div className="flex justify-between mt-4">
        <p>Não receber o Código?</p>{" "}
        <button onClick={handleResendCode} className="cursor-pointer">
          Reenviar
        </button>
      </div>
    </>
  );
};
