import { z } from "zod";

export const userFormValidation = z.object({
    name: z.string().min(2, "name must be at least 2 characters.").max(15, "name must be at max 15 characters."),
    email: z.string().email("Invalid Email Address"),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});