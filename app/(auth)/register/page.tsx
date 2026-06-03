import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create your account · Marco Reid",
  description: "Sign up for Marco Reid — the professional intelligence platform for lawyers and accountants.",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
