import { useContext } from "react";
import { AuthContext } from "../context/auth-context.jsx";

export const useGetSession = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Context can only be accessed inside a Provider");

  return context;
};
