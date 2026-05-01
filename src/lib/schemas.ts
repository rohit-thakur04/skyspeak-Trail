import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export const enrollSchema = enquirySchema.extend({
  course: z.string().min(1, "Please select a course"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
export type EnrollValues = z.infer<typeof enrollSchema>;
export type ContactValues = z.infer<typeof contactSchema>;

export const COURSES = [
  "Air Hostess Training",
  "Ground Staff Training",
  "Personality Development",
  "Spoken English Classes",
  "Interview Preparation",
  "Tour & Travel Management",
] as const;
