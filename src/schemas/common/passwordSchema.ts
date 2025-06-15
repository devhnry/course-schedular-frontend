import {z} from "zod";

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must include one uppercase, lowercase, a number, and a special character"
    );