import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create TipJar Account - Start Receiving Tips",
  description: "Create your free creator tipping profile and start receiving support instantly.",
};

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <RegisterForm />
    </div>
  );
}
