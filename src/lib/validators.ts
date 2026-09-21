import { z } from "zod";

// Phone number regex supporting international and standard formats
const phoneRegex = /^([+]?[\d\s-]{7,16})$/;

export const HoneypotFieldSchema = z.string().max(0, "Bot submission detected").optional();

export const ViewingRequestSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number (e.g. +254 712 345 678)"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  property_id: z.string().uuid("Invalid property identifier").optional().or(z.literal("")),
  preferred_date: z.string().min(1, "Please select your preferred date"),
  preferred_time: z.string().min(1, "Please select a preferred time slot"),
  message: z.string().max(1000).optional(),
  honeypot: HoneypotFieldSchema,
});

export type ViewingRequestFormData = z.infer<typeof ViewingRequestSchema>;

export const ValuationRequestSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  valuation_property_type: z.string().min(1, "Please select property type (e.g. Villa, Townhouse, Penthouse)"),
  valuation_bedrooms: z.coerce.number().min(1, "Must be at least 1 bedroom").max(30),
  valuation_address: z.string().min(5, "Please enter the approximate address or neighborhood"),
  message: z.string().max(1000).optional(),
  honeypot: HoneypotFieldSchema,
});

export type ValuationRequestFormData = z.infer<typeof ValuationRequestSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  message: z.string().min(10, "Please provide some details in your message").max(2000),
  honeypot: HoneypotFieldSchema,
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const PropertyFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  listing_type: z.enum(["buy", "rent"]),
  status: z.enum(["draft", "pending_approval", "published", "archived"]).default("draft"),
  price: z.coerce.number().positive("Price must be a positive number"),
  bedrooms: z.coerce.number().int().min(0, "Bedrooms cannot be negative"),
  bathrooms: z.coerce.number().int().min(0, "Bathrooms cannot be negative"),
  size_sqm: z.coerce.number().positive("Size must be greater than 0"),
  neighborhood_id: z.string().min(1, "Please select a neighborhood"),
  address: z.string().min(5, "Please enter property location/address"),
  description: z.string().min(20, "Please provide a detailed property description"),
  amenities: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  images: z.array(z.string()).min(1, "Please provide at least 1 photo for this property"),
});

export type PropertyFormData = z.infer<typeof PropertyFormSchema>;

export const AgentProfileSchema = z.object({
  bio: z.string().min(20, "Bio should be at least 20 characters").max(2000),
  years_experience: z.coerce.number().min(0).max(60),
  specialties: z.array(z.string()).min(1, "Add at least one specialty"),
  license_number: z.string().min(3, "License number is required"),
  whatsapp_number: z.string().regex(phoneRegex, "Valid WhatsApp number is required"),
  is_active: z.boolean().default(true),
});

export type AgentProfileFormData = z.infer<typeof AgentProfileSchema>;
