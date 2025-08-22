import type { JSX } from "react";
import Password from "./Password";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const getPass = localStorage.getItem("password");

  if (!getPass && getPass !== `${import.meta.env.VITE_PASSWORD}`)
    return <Password />;
  return <div>{children}</div>;
};

export default ProtectedRoute;
