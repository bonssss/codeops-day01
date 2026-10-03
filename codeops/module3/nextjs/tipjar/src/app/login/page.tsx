import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In - TipJar",
  description: "Sign in to manage your creator tipping page and goals.",
};

import { ThemeToggle } from "@/components/shared/theme-toggle";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
}
