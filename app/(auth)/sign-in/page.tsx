// app/sign-in/page.tsx
"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";
import { Session } from "next-auth";


interface PageProps {
  session: Session | null;
}

const SignInPage: React.FC<PageProps> = ({ session }) => (
  <AuthForm
    session={session}
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
      role: "USER", // Default role
      universityCard: "", // Optional field for file upload
    }}
    onSubmit={signInWithCredentials}
  />
);

export default SignInPage;