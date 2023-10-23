"use client";

import { useMeQuery } from "@/hooks/queries/users/use-me-query";

import { Login } from "./login";
import { Logout } from "./logout";

export const AuthButton = () => {
  const { data } = useMeQuery();

  return data ? <Logout /> : <Login />;
};
