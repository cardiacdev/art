"use client";

import { useAuth } from "@/hooks/use-auth";

import { Login } from "./login";
import { Logout } from "./logout";

export const AuthButton = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Logout /> : <Login />;
};
