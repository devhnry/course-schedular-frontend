import {z} from "zod";
import {passwordSchema} from "./common/passwordSchema.ts";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema
});

export type LoginInput = z.infer<typeof loginSchema>;
