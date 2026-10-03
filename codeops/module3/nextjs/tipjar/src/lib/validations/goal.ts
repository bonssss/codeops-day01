import { z } from "zod";

export const GoalSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title is too long"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional().or(z.literal("")).nullable(),
  targetAmount: z.coerce.number().positive("Target amount must be greater than 0"),
  currency: z.string().default("ETB"),
  deadline: z.string().optional().or(z.literal("")).nullable(),
  imageUrl: z.string().url("Must be a valid image URL").optional().or(z.literal("")).nullable(),
  status: z.enum(["ACTIVE", "COMPLETED", "PAUSED", "CANCELLED"]).default("ACTIVE"),
});

export type GoalInput = z.infer<typeof GoalSchema>;
