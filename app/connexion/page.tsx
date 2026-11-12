import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "./AuthForm";

export const metadata: Metadata = { title: "Connexion", robots: { index: false } };

export default function ConnexionPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm />
    </Suspense>
  );
}
