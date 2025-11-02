import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  inquiryType: z.string().min(1, 'Inquiry type is required').max(100, 'Inquiry type must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
  company: z.string().optional(), // Honeypot field
});

export type ContactInput = z.infer<typeof contactSchema>;

