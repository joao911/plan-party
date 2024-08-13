import { Route, Routes } from "react-router-dom";
import { SignOut } from "./_layouts/SignOut";
import { Login } from "./screens/signOut/Login";
import { Register } from "./screens/signOut/Register";
import { ForgotPassword } from "./screens/signOut/ForgotPassword";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignOut />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
