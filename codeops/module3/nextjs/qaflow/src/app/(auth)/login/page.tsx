"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loginUser } from "@/actions/auth";
import { AlertCircle, Loader2, Lock, Mail, Zap } from "lucide-react";

const DEMO_PRESETS = [
  {
    role: "ADMIN",
    email: "admin@qaflow.dev",
    name: "Alex Vance",
    badgeVariant: "destructive" as const,
  },
  {
    role: "QA_MANAGER",
    email: "manager@qaflow.dev",
    name: "Sarah Jenkins",
    badgeVariant: "default" as const,
  },
  {
    role: "QA_ENGINEER",
    email: "engineer@qaflow.dev",
    name: "Bonsa Tesfaye",
    badgeVariant: "pass" as const,
  },
  {
    role: "VIEWER",
    email: "viewer@qaflow.dev",
    name: "Elena Rostova",
    badgeVariant: "secondary" as const,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("engineer@qaflow.dev");
  const [password, setPassword] = React.useState("password123");
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await loginUser(null, formData);
      if (result && !result.success) {
        setError(result.error || "Login failed");
        setIsPending(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleSelectDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setError(null);
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your QA workspace
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Demo Selector */}
        <div className="rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-300">
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            <span>1-Click Demo Profiles</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.email}
                type="button"
                onClick={() => handleSelectDemo(preset.email)}
                className={`text-left p-2 rounded border text-xs transition-all flex flex-col justify-between ${
                  email === preset.email
                    ? "border-blue-600 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-blue-600"
                    : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {preset.name}
                  </span>
                  <Badge
                    variant={preset.badgeVariant}
                    className="text-[9px] px-1 py-0 h-4 uppercase"
                  >
                    {preset.role.replace("QA_", "")}
                  </Badge>
                </div>
                <span className="text-[10px] text-slate-500 truncate">
                  {preset.email}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 text-xs rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span className="text-xs text-muted-foreground">
                Default:{" "}
                <code className="text-blue-600 font-mono">password123</code>
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                type="password"
                required
                className="pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In to QAFlow"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
