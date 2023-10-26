"use client";

import { useAuth } from "@/hooks/use-auth";

import { Login } from "./login";
import { UserNav } from "./user-nav";

export const AuthButton = () => {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user ? <UserNav user={user} /> : <Login />;
};
