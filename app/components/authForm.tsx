"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import {toast} from "sonner"

const errorMessages: Record<string, string> = {
  "Invalid login credentials": "Wrong email or password. Please try again.",
  "User already registered": "An account with this email already exists.",
  "Email not confirmed": "Please check your email and confirm your account first.",
  "Password should be at least 6 characters": "Password must be at least 6 characters.",
};

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError(null);
  }, [isRegister]);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setIsPending(true);


    if (isRegister) {
      const result = await signUp(null, formData);
      setIsPending(false);
      if (result?.error) {
        setError(errorMessages[result.error] ?? result.error);

      } else {
        toast.success("Account created! Please log in.");
        setIsRegister(false);
      }
    } else {
      const result = await signIn(null, formData);
      setIsPending(false);
      if (result?.error) {
        setError(errorMessages[result.error] ?? result.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-3 lg:p-0">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isRegister ? "Create an account" : "Login to your account"}</CardTitle>
          <CardDescription>
            Enter your email below to {isRegister ? "register" : "login"}
          </CardDescription>
          <CardAction>
                <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Log in" : "Sign up"}
            </Button>
          </CardAction>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input className="px-3 text-sm lg-text-base rounded-md lg:rounded-2xl" id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-xs lg:text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input className="px-3  text-sm lg-text-base rounded-md lg:rounded-2xl"  id="password" name="password" type="password" placeholder="your password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-6">
            {error && <p className="text-sm text-red-500 w-full">{error}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : isRegister ? "Register" : "Login"}
            </Button>
            
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}