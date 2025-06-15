import {z} from "zod";
import {passwordSchema} from "./common/passwordSchema.ts";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema
});

export const otpSchema = z.object({
    email: z.string().email("Invalid email address"),
    oneTimePassword: z.string().min(6, "Invalid otp"),
})

export type OtpInput = z.infer<typeof otpSchema>
export type LoginInput = z.infer<typeof loginSchema>;
