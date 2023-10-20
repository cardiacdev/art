"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/header/login-form";

export const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <LoginForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
