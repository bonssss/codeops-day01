import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create TipJar Account - Start Receiving Tips",
  description: "Create your free creator tipping profile and start receiving support instantly.",
};

import { ThemeToggle } from "@/components/shared/theme-toggle";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <RegisterForm />
    </div>
  );
}
