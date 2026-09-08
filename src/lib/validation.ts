import { z } from "zod";

export const checkoutRequestSchema = z.object({
  trekId: z.string().min(1),
  departureId: z.string().min(1),
  travelers: z.number().int().min(1).max(50),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
