import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas";

// Demo users fallback when database is initializing
const DEMO_USERS: Record<
  string,
  { id: string; name: string; email: string; role: string }
> = {
  "admin@qaflow.dev": {
    id: "demo-admin-01",
    name: "Alex Vance",
    email: "admin@qaflow.dev",
    role: "ADMIN",
  },
  "manager@qaflow.dev": {
    id: "demo-mgr-02",
    name: "Sarah Jenkins",
    email: "manager@qaflow.dev",
    role: "QA_MANAGER",
  },
  "engineer@qaflow.dev": {
    id: "demo-eng-03",
    name: "Bonsa Tesfaye",
    email: "engineer@qaflow.dev",
    role: "QA_ENGINEER",
  },
  "viewer@qaflow.dev": {
    id: "demo-view-04",
    name: "Elena Rostova",
    email: "viewer@qaflow.dev",
    role: "VIEWER",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  secret:
    process.env.AUTH_SECRET ||
    "dev-secret-key-qaflow-auth-2026-production-testing-token",
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          // 1. Try querying Prisma database
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (user && user.passwordHash) {
            const passwordsMatch = await bcrypt.compare(
              password,
              user.passwordHash,
            );
            if (passwordsMatch) {
              return {
                id: user.id,
                name: user.name || "User",
                email: user.email,
                image: user.image,
                role: user.role,
              };
            }
          }
        } catch {
          // Fallback to demo users if database connection is pending
        }

        // 2. Demo accounts validation
        const demoUser = DEMO_USERS[email.toLowerCase()];
        if (demoUser && password === "password123") {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
          };
        }

        return null;
      },
    }),
  ],
});
