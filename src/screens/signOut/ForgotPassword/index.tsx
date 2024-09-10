import React, { useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import { Email } from "../../../components/Email";
import { VerifyEmail } from "../../../components/VerifyEmail";
import { NewPassword } from "../../../components/NewPassword";

// import { Container } from './styles';

export const ForgotPassword: React.FC = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [email, setEmail] = useState("");
  function renderStep() {
    switch (stepNumber) {
      case 0:
        return <Email setStepNumber={setStepNumber} setEmail={setEmail} />;
      case 1:
        return <VerifyEmail setStepNumber={setStepNumber} email={email} />;
      case 2:
        return <NewPassword />;
      default:
        return <Email setStepNumber={setStepNumber} setEmail={setEmail} />;
    }
  }
  return (
    <Card className="p-2 w-[25rem] border-none">
      <Link to="/">
        <p className="mb-4">eu sou o Logo seus viado</p>
      </Link>
      {renderStep()}
    </Card>
  );
};
