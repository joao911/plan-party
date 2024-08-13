import React from "react";
import { Outlet } from "react-router-dom";

// import { Container } from './styles';

export const SignOut: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col  md:bg-[url('/planbg.jpeg')] bg-no-repeat bg-cover min-h-screen overflow-auto">
      <Outlet />
    </div>
  );
};
