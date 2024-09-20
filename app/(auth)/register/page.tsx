"use client";

// React and Next.js hooks
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// UI components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardDescription } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";

// Interfaces
interface FormData {
  username: string;
  password: string;
}

// Form schema
const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Register component
export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Specify the type for `setToken`
  const { setToken } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect to the dashboard if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Handle registration
  async function handleRegister(data: FormData) {
    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        setToken(result.token);
        router.push("/login");
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            form.setError(key as keyof FormData, {
              type: "server",
              message: result.errors[key][0],
            });
          });
        } else {
          setServerError(
            "An error occurred during registration. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setServerError(
        "An error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <Card className="w-full max-w-md space-y-6 p-8 bg-background">
        <h1 className="text-center text-2xl font-bold text-white">
          Register Account
        </h1>
        <CardDescription className="text-center">
          Enter your username and password below to signup your account
        </CardDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-8 text-white"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your username"
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Password</FormLabel>
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
            {/* Display server error */}
            {serverError && (
              <div className="text-center text-red-500">{serverError}</div>
            )}
            <Button
              type="submit"
              className="w-full rounded-lg font-bold"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
