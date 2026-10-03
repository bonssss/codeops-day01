import { z } from "zod";

export const CreateTipSchema = z.object({
  recipientUsername: z.string().min(1, "Recipient is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  currency: z.string().default("ETB"),
  supporterName: z.string().max(60, "Name is too long").optional().or(z.literal("")).nullable(),
  supporterEmail: z.string().email("Invalid email").optional().or(z.literal("")).nullable(),
  message: z.string().max(500, "Message cannot exceed 500 characters").optional().or(z.literal("")).nullable(),
  isAnonymous: z.boolean().default(false),
  goalId: z.string().optional().or(z.literal("")).nullable(),
  paymentMethod: z.string().default("Telebirr"),
});

export type CreateTipInput = z.infer<typeof CreateTipSchema>;

export const ProcessPaymentSchema = z.object({
  tipId: z.string().min(1),
  transactionReference: z.string().min(1),
  simulateOutcome: z.enum(["SUCCESS", "FAILED"]).default("SUCCESS"),
});

export type ProcessPaymentInput = z.infer<typeof ProcessPaymentSchema>;
