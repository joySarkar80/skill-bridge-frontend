// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"

// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"


//----------------------------------


// import { Input } from "@/components/ui/input"
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/src/components/ui/field"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/card"
// import { Input } from "../../../ui/input"
// import { Button } from "../../../ui/button"

// export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//         <CardDescription>
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="name">Full Name</FieldLabel>
//               <Input id="name" type="text" placeholder="John Doe" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//               <FieldDescription>
//                 We&apos;ll use this to contact you. We will not share your email
//                 with anyone else.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="password">Password</FieldLabel>
//               <Input id="password" type="password" required />
//               <FieldDescription>
//                 Must be at least 8 characters long.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="confirm-password">
//                 Confirm Password
//               </FieldLabel>
//               <Input id="confirm-password" type="password" required />
//               <FieldDescription>Please confirm your password.</FieldDescription>
//             </Field>
//             <FieldGroup>
//               <Field>
//                 <Button type="submit">Create Account</Button>
//                 <Button variant="outline" type="button">
//                   Sign up with Google
//                 </Button>
//                 <FieldDescription className="px-6 text-center">
//                   Already have an account? <a href="#">Sign in</a>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </FieldGroup>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { registerUser } from "@/src/services/auth";

const formSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email({ message: "Please provide a valid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["STUDENT", "TUTOR"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      const res = await registerUser(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...field} placeholder="John Doe" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="example@gmail.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="password" placeholder="******" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input {...field} type="password" placeholder="******" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Role */}
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Select Role</FieldLabel>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="STUDENT"
                        checked={field.value === "STUDENT"}
                        onChange={field.onChange}
                      />
                      Student
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="TUTOR"
                        checked={field.value === "TUTOR"}
                        onChange={field.onChange}
                      />
                      Tutor
                    </label>
                  </div>
                  <FieldDescription>
                    Choose how you want to use SkillBridge
                  </FieldDescription>
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}