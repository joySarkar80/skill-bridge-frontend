"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
<<<<<<< HEAD
  FieldError,
=======
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

import {
  extractTokenFromAuthResponse,
  persistTokenCookie,
} from "@/src/lib/auth/clientSession";
import { loginUser } from "@/src/services/auth";

const formSchema = z.object({
  email: z.email({ message: "Please provide a valid email" }),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
<<<<<<< HEAD
    try {
      const res = await loginUser(data);

      if (!res?.success) {
        toast.error(
          typeof res?.message === "string"
            ? res.message
            : "Login failed"
        );
        return;
      }

      const token = extractTokenFromAuthResponse(res);
      if (token) {
        const ok = await persistTokenCookie(token);
        if (!ok) {
          toast.error("Could not save session. Try again.");
          return;
        }
      }

      toast.success(
        typeof res?.message === "string" ? res.message : "Logged in"
      );
      window.dispatchEvent(new Event("authChanged"));
      window.location.href = "/";
    } catch (e: unknown) {
      toast.error(
        e instanceof Error ? e.message : "Login failed"
      );
=======
    // console.log(data)
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.success(res.message);
        router.replace("/");
        setTimeout(() => {
          window.dispatchEvent(new Event("authChanged"));
        }, 200);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
<<<<<<< HEAD
                    aria-invalid={fieldState.invalid}
=======
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
                    placeholder="Your email"
                  />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
<<<<<<< HEAD
                    aria-invalid={fieldState.invalid}
=======
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
                    placeholder="******"
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button className="cursor-pointer" type="submit" form="form-rhf-demo">
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
