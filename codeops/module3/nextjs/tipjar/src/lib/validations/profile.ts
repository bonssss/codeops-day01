import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters").max(60),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores")
    .toLowerCase(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().nullable(),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")).nullable(),
  location: z.string().max(100).optional().nullable(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")).nullable(),
  github: z.string().max(100).optional().nullable(),
  linkedin: z.string().max(100).optional().nullable(),
  twitter: z.string().max(100).optional().nullable(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;

export const TipSettingsSchema = z.object({
  currency: z.enum(["ETB", "USD", "EUR"]).default("ETB"),
  customTipMessage: z.string().max(300, "Message cannot exceed 300 characters").optional().nullable(),
  suggestedAmounts: z.array(z.number().positive("Amount must be greater than 0")).min(1, "Select at least one amount"),
  allowAnonymous: z.boolean().default(true),
  showSupporterWall: z.boolean().default(true),
});

export type TipSettingsInput = z.infer<typeof TipSettingsSchema>;

export const SocialLinkSchema = z.object({
  platform: z.string().min(2).max(50),
  url: z.string().url("Must be a valid URL"),
  label: z.string().max(50).optional().nullable(),
});

export type SocialLinkInput = z.infer<typeof SocialLinkSchema>;
