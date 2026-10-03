"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import {
  ProfileUpdateSchema,
  TipSettingsSchema,
  SocialLinkSchema,
} from "@/lib/validations/profile";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(data: unknown) {
  try {
    const session = await requireAuth();
    const validated = ProfileUpdateSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid profile data",
      };
    }

    const { username, displayName, bio, avatarUrl, location, website, github, linkedin, twitter } =
      validated.data;

    // Check if new username is already taken by another user
    const existing = await db.profile.findFirst({
      where: {
        username,
        NOT: { userId: session.id },
      },
    });

    if (existing) {
      return { success: false, error: "This username is already taken by another creator" };
    }

    await db.profile.update({
      where: { userId: session.id },
      data: {
        username,
        displayName,
        bio,
        avatarUrl,
        location,
        website,
        github,
        linkedin,
        twitter,
      },
    });

    await db.user.update({
      where: { id: session.id },
      data: { name: displayName },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath(`/tip/${username}`);

    return { success: true, message: "Profile updated successfully" };
  } catch (err: unknown) {
    console.error("Profile update error:", err);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateTipSettingsAction(data: unknown) {
  try {
    const session = await requireAuth();
    const validated = TipSettingsSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid tip settings",
      };
    }

    const profile = await db.profile.update({
      where: { userId: session.id },
      data: {
        currency: validated.data.currency,
        customTipMessage: validated.data.customTipMessage,
        suggestedAmounts: validated.data.suggestedAmounts.join(","),
        allowAnonymous: validated.data.allowAnonymous,
        showSupporterWall: validated.data.showSupporterWall,
      },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath(`/tip/${profile.username}`);

    return { success: true, message: "Tip settings updated successfully" };
  } catch (err: unknown) {
    console.error("Tip settings error:", err);
    return { success: false, error: "Failed to update tip settings" };
  }
}

export async function addSocialLinkAction(data: unknown) {
  try {
    const session = await requireAuth();
    const validated = SocialLinkSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid link data",
      };
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.id },
    });

    if (!profile) return { success: false, error: "Profile not found" };

    const link = await db.socialLink.create({
      data: {
        profileId: profile.id,
        platform: validated.data.platform,
        url: validated.data.url,
        label: validated.data.label,
      },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath(`/tip/${profile.username}`);

    return { success: true, link };
  } catch (err: unknown) {
    console.error("Add link error:", err);
    return { success: false, error: "Failed to add social link" };
  }
}

export async function deleteSocialLinkAction(linkId: string) {
  try {
    const session = await requireAuth();

    const link = await db.socialLink.findUnique({
      where: { id: linkId },
      include: { profile: true },
    });

    if (!link || link.profile.userId !== session.id) {
      return { success: false, error: "Unauthorized or link not found" };
    }

    await db.socialLink.delete({
      where: { id: linkId },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath(`/tip/${link.profile.username}`);

    return { success: true };
  } catch (err: unknown) {
    console.error("Delete link error:", err);
    return { success: false, error: "Failed to delete link" };
  }
}
