"use client";

import * as React from "react";
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
  FieldError,
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
                    aria-invalid={fieldState.invalid}
                    placeholder="Your email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button type="submit" form="form-rhf-demo">
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
