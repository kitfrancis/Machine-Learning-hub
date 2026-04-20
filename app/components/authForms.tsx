"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";

type AuthFormProps = {
  action: (prevState: { error?: string } | null, formData: FormData) => Promise<{ error?: string } | null>;
  isRegister?: boolean;
};

const errorMessages: Record<string, string> = {
  "Invalid login credentials": "Wrong email or password. Please try again.",
  "User already registered": "An account with this email already exists.",
  "Email not confirmed": "Please check your email and confirm your account first.",
  "Password should be at least 6 characters": "Password must be at least 6 characters.",
};

export const AuthForm = ({ action, isRegister }: AuthFormProps) => {
  const [error, formAction] = useActionState(action, null);

  

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isRegister ? "Create an account" : "Login to your account"}</CardTitle>
          <CardDescription>Enter your email below to {isRegister ? "register" : "login"}</CardDescription>
          <CardAction>
            <Link href={isRegister ? "/login" : "/signup"}>
              <Button variant="link">{isRegister ? "Login" : "Sign Up"}</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" placeholder="your password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-6">
            {error?.error && <p className="text-sm text-red-500">{errorMessages[error.error] ?? error.error}</p>}
            <Button type="submit" className="w-full">
              {isRegister ? "Register" : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};