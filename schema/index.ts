import z from "zod";

export const resetPasswordSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email" }),
});
export const passwordschema = z.object({
   password: z.string().min(1).max(25),
});

export const loginSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email" }),
   password: z.string().min(1).max(100),
});

export const signupSchema = z.object({
   email: z.string().email(),
   password: z.string().min(3).max(100),
   username: z.string().min(3).max(100),
});
