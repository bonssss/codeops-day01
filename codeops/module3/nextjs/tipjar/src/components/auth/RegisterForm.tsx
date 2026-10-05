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
      <div className="rounded-3xl border border-border bg-card p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
              <Coffee className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-foreground">Create Your TipJar</h1>
          <p className="text-xs text-muted-foreground">
            Start receiving tips and building your supporter base today
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Your Full Name</label>
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
            <label className="text-xs font-medium text-foreground">Claim Username (@handle)</label>
            <Input
              type="text"
              required
              placeholder="e.g. bonsa"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
              icon={<AtSign className="h-4 w-4" />}
            />
            <span className="text-[11px] text-muted-foreground">
              Your tipping link: <span className="text-primary font-mono font-medium">tipjar.io/tip/{username || "username"}</span>
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Email Address</label>
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
            <label className="text-xs font-medium text-foreground">Password</label>
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
            className="w-full font-bold gap-2 mt-2"
          >
            {loading ? "Creating Account..." : "Claim My TipJar Free"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
