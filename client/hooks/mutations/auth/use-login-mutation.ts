"use client";

import { env } from "@/env.mjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LoginInput {
  email: string;
  password: string;
}

async function login(data: LoginInput) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.resetQueries();
    },
  });
};
