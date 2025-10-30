import { passwordSchema } from "@/lib/schema/password.schema";
import { restrictedNames } from "@/lib/schema/usernames.schema";
import { z } from "zod";

export const CreateSchema = z
  .object({
    email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
    name: z
    .string()
    .min(4, { message: "Must be at least 4 characters" })
    .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers allowed")
    .refine(
      (name) => {
        for (const pattern of restrictedNames) {
          if (name.toLowerCase().includes(pattern)) {
            return false;
          }
        }
        return true;
      },
      { message: "Name contains disallowed words" }
    ),
    password: passwordSchema,
    confirmPassword: z.string().min(8, {
      message: "Must be at least 8 characters",
    }),
  })

export type CreateValues = z.infer<typeof CreateSchema>;