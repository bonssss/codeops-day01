"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, AtSign, ArrowRight, Coffee, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/actions/auth";
import { useToast } from "@/components/ui/toast";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await registerAction({
        name,
        username,
        email,
        password,
      });

      if (!res.success) {
        setError(res.error || "Registration failed");
        toast({
          title: "Registration Failed",
          description: res.error || "Please check your inputs",
          type: "error",
        });
      } else {
        toast({
          title: "Account Created!",
          description: `Welcome to TipJar, ${name}!`,
          type: "success",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-3xl p-8 border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="h-10 w-10 rounded-2xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Coffee className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white">Create Your TipJar</h1>
          <p className="text-xs text-neutral-400">
            Start receiving tips and building your supporter base today
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Your Full Name</label>
            <Input
              type="text"
              required
              placeholder="e.g. Bonsa Diriba"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="h-4 w-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Claim Username (@handle)</label>
            <Input
              type="text"
              required
              placeholder="e.g. bonsa"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
              icon={<AtSign className="h-4 w-4" />}
            />
            <span className="text-[11px] text-neutral-400">
              Your tipping link: <span className="text-amber-400 font-mono">tipjar.io/tip/{username || "username"}</span>
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Email Address</label>
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Password</label>
            <Input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading}
            className="w-full font-bold shadow-lg shadow-amber-500/20 gap-2 mt-2"
          >
            {loading ? "Creating Account..." : "Claim My TipJar Free"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
