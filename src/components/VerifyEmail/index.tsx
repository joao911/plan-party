import React from "react";
import { Button } from "antd";

interface VerifyEmailProps {
  setStepNumber(step: number): void;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ setStepNumber }) => {
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
        Enviar
      </Button>
      <div className="flex justify-between mt-4">
        <p>Não receber o Código?</p> <p className="cursor-pointer">Reenviar</p>
      </div>
    </>
  );
};
