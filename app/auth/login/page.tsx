"use client";

// React and Next.js hooks
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";

// UI components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardDescription } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";

interface FormData {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  async function handleLogin(data: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setToken(result.token);
        }

        await signIn("credentials", {
          redirect: false,
          username: data.username,
          password: data.password,
        });

        router.push("/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md space-y-6 bg-background p-8">
        <h1 className="text-center text-2xl font-bold">Login an Account</h1>
        <CardDescription className="text-center">
          Enter your username and password below to signin your account
        </CardDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-center text-destructive">{error}</div>
            )}
            <Button type="submit" className="w-full rounded-lg font-bold">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
