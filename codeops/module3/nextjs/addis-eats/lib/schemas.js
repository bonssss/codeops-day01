// lib/schemas.js
import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.union([z.number(), z.string()], {
    required_error: "Item ID is required"
  }),
  name: z.string().min(1, "Item name is required"),
  price: z.number().positive("Item price must be positive"),
  quantity: z.number().int().min(1, "Quantity must be at least 1")
});

export const orderSchema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters long"),
  address: z
    .string({ required_error: "Delivery address is required" })
    .trim()
    .min(5, "Delivery address must be at least 5 characters long"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(9, "Phone number must be at least 9 characters"),
  paymentMethod: z.enum(["telebirr", "cbe", "cash"], {
    errorMap: () => ({ message: "Payment method must be telebirr, cbe, or cash" })
  }),
  items: z
    .array(orderItemSchema)
    .min(1, "Your cart cannot be empty. Please select at least one dish."),
  promoCode: z.string().optional().nullable()
});
