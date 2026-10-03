import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");
      const isProtectedPage =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/projects") ||
        nextUrl.pathname.startsWith("/test-cases") ||
        nextUrl.pathname.startsWith("/test-runs") ||
        nextUrl.pathname.startsWith("/bugs") ||
        nextUrl.pathname.startsWith("/reports") ||
        nextUrl.pathname.startsWith("/team") ||
        nextUrl.pathname.startsWith("/settings");

      if (isProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login
      } else if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "QA_ENGINEER";
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        const userObj = session.user as { id?: string; role?: string };
        userObj.id = token.id as string;
        userObj.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts with Credentials
} satisfies NextAuthConfig;
