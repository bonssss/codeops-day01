"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Coffee, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/actions/auth";
import { useToast } from "@/components/ui/toast";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("bonsa@tipjar.io");
  const [password, setPassword] = React.useState("password123");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAction({ email, password });
      if (!res.success) {
        setError(res.error || "Login failed");
        toast({
          title: "Login Failed",
          description: res.error || "Invalid email or password",
          type: "error",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Signed in successfully",
          type: "success",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
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
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-xs text-neutral-400">
            Sign in to manage your creator tipping page, goals, and payouts
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-neutral-300">Password</label>
            </div>
            <Input
              type="password"
              required
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Sign In to Dashboard"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Demo Fast Login Pills */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          <span className="text-[11px] text-neutral-400 font-medium block text-center">
            Or test with seeded demo accounts (password: <code className="text-amber-400">password123</code>):
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo("bonsa@tipjar.io")}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 border border-white/5 font-mono truncate"
            >
              @bonsa
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("sara@tipjar.io")}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 border border-white/5 font-mono truncate"
            >
              @sarab
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("abel@tipjar.io")}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-amber-300 border border-white/5 font-mono truncate"
            >
              @abelt
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-amber-400 hover:underline font-semibold">
            Create your TipJar free
          </Link>
        </div>
      </div>
    </div>
  );
}
