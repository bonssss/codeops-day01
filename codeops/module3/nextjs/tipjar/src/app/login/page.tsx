import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In - TipJar",
  description: "Sign in to manage your creator tipping page and goals.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <LoginForm />
    </div>
  );
}
