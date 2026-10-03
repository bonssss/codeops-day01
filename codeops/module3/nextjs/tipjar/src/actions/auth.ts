"use server";

import { db } from "@/lib/db";
import {
  RegisterSchema,
  LoginSchema,
  ChangePasswordSchema,
} from "@/lib/validations/auth";
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  requireAuth,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerAction(formData: unknown) {
  try {
    const validated = RegisterSchema.safeParse(formData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid registration data",
      };
    }

    const { name, username, email, password } = validated.data;

    // Check if email is already taken
    const existingEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return { success: false, error: "An account with this email already exists" };
    }

    // Check if username is already taken
    const existingUsername = await db.profile.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return { success: false, error: "This username is already taken. Please choose another." };
    }

    const passwordHash = await hashPassword(password);

    // Create user and profile in transaction
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name,
        profile: {
          create: {
            username,
            displayName: name,
            bio: `Hey there! Welcome to my TipJar page. Thanks for supporting my work!`,
            currency: "ETB",
            suggestedAmounts: "50,100,200,500",
            customTipMessage: "Thanks for supporting my journey! Every bit helps me create more.",
            allowAnonymous: true,
            showSupporterWall: true,
          },
        },
      },
      include: { profile: true },
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      username: user.profile?.username,
    });

    await setSessionCookie(token);

    return { success: true, redirectUrl: "/dashboard" };
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return { success: false, error: "Something went wrong during registration. Please try again." };
  }
}

export async function loginAction(formData: unknown) {
  try {
    const validated = LoginSchema.safeParse(formData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid credentials",
      };
    }

    const { email, password } = validated.data;

    const user = await db.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      username: user.profile?.username,
    });

    await setSessionCookie(token);

    return { success: true, redirectUrl: "/dashboard" };
  } catch (err: unknown) {
    console.error("Login error:", err);
    return { success: false, error: "An unexpected error occurred during login." };
  }
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}

export async function changePasswordAction(formData: unknown) {
  try {
    const session = await requireAuth();
    const validated = ChangePasswordSchema.safeParse(formData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Validation failed",
      };
    }

    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (!user) return { success: false, error: "User not found" };

    const isMatch = await verifyPassword(validated.data.currentPassword, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Current password is incorrect" };
    }

    const newHash = await hashPassword(validated.data.newPassword);
    await db.user.update({
      where: { id: session.id },
      data: { passwordHash: newHash },
    });

    return { success: true, message: "Password updated successfully" };
  } catch (err: unknown) {
    console.error("Change password error:", err);
    return { success: false, error: "Failed to update password" };
  }
}

export async function deleteAccountAction() {
  try {
    const session = await requireAuth();
    await db.user.delete({
      where: { id: session.id },
    });
    await clearSessionCookie();
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete account error:", err);
    return { success: false, error: "Failed to delete account" };
  }
}
