"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, FieldValues, Path, SubmitHandler, DefaultValues } from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUpload from "./FileUpload";

interface FormValues {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  universityCard?: string; // Optional field for file upload
}

interface Props {
  session?: any; // Replace `any` with a proper type if possible
  schema: ZodType<FormValues>;
  defaultValues: FormValues;
  onSubmit: (data: FormValues) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = ({
  type,
  schema,
  defaultValues,
  onSubmit,
  session,
}: Props) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      const role = form.getValues("role");
      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to PrepPal" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, schedule your Examinations, get Exam reminder and stay updated"
          : "Please complete all fields and upload a valid university ID to schedule exams and gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
          {/* Role Selection (Admin or User) */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="USER"
                        checked={field.value === "USER"} // Manually bind `checked`
                        onChange={() => field.onChange("USER")} // Manually bind `onChange`
                        className="form-radio"
                      />
                      User
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="ADMIN"
                        checked={field.value === "ADMIN"} // Manually bind `checked`
                        onChange={() => field.onChange("ADMIN")} // Manually bind `onChange`
                        className="form-radio"
                      />
                      Admin
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dynamically Render Other Fields */}
          {Object.keys(defaultValues)
            .filter((field) => field !== "role") // Exclude the "role" field
            .map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof FormValues} // Explicitly cast to keyof FormValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <FileUpload
                          type="image"
                          accept="image/*"
                          placeholder="Upload your ID"
                          folder="ids"
                          variant="dark"
                          onFileChange={field.onChange}
                        />
                      ) : (
                        <Input
                          required
                          type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                          {...field} // This already includes `value`
                          className="form-input"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

          {/* Submit Button */}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      {/* Additional Links */}
      <p className="text-center text-base font-medium">
        {isSignIn && session?.user?.isAdmin && (
          <Link href="/admin" className="font-bold text-primary">
            Go to Admin Page
          </Link>
        )}
        {isSignIn ? "New to PrepPal? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;