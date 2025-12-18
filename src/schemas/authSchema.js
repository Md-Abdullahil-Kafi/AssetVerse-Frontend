
import { z } from "zod";

export const employeeRegisterSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
});

export const hrRegisterSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  companyLogo: z.string().url("Invalid URL for Company Logo"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});