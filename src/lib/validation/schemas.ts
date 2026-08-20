import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Message is required").max(4000),
  // Honeypot: real users never fill this in.
  company: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const flockRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  incidentDate: z.string().trim().max(50).optional(),
  incidentNotSure: z.string().trim().max(200).optional(),
  description: z.string().trim().min(1, "Please describe what you're looking for").max(4000),
  company: z.string().max(0).optional(),
});
export type FlockRequestInput = z.infer<typeof flockRequestSchema>;

export const signupVerifySchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  address: z.string().trim().min(1, "Street address is required").max(200),
  mobile: z.string().trim().min(7, "Enter a valid mobile number").max(20),
});
export type SignupVerifyInput = z.infer<typeof signupVerifySchema>;

export const emailCodeSchema = z.object({
  code: z.string().trim().length(6, "Enter the 6-digit code"),
});

export const setCredentialsSchema = z
  .object({
    password: z.string().min(10, "Use at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const accountSettingsSchema = z.object({
  show_in_directory: z.boolean(),
  show_email: z.boolean(),
  show_phone: z.boolean(),
  show_household: z.boolean(),
  display_email: z.string().trim().email().optional().or(z.literal("")),
  display_phone: z.string().trim().max(20).optional().or(z.literal("")),
});
export type AccountSettingsInput = z.infer<typeof accountSettingsSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;
