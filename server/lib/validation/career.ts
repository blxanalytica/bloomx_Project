import { z } from 'zod';

/**
 * Allowed file extensions for resume and attachments
 */
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Career form validation schema
 */
export const careerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format (E.164)'),
  applyFor: z.string().min(1, 'Job title is required').max(200, 'Job title must be less than 200 characters'),
  message: z.string().max(5000, 'Message must be less than 5000 characters').optional(),
  company: z.string().optional(), // Honeypot field
});

export type CareerInput = z.infer<typeof careerSchema>;

/**
 * Validate file extension
 */
export function validateFileExtension(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? ALLOWED_EXTENSIONS.includes(extension as typeof ALLOWED_EXTENSIONS[number]) : false;
}

/**
 * Validate file size
 */
export function validateFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE;
}

/**
 * File-like interface for validation
 */
interface FileLike {
  name: string;
  size: number;
}

/**
 * Validate total file size
 */
export function validateTotalFileSize(files: FileLike[]): boolean {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  return totalSize <= MAX_TOTAL_SIZE;
}

/**
 * Get file validation errors
 */
export function validateFiles(files: FileLike[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (files.length === 0) {
    errors.push('Resume is required');
    return { valid: false, errors };
  }

  // Check for resume
  const resume = files.find(f => f.name.toLowerCase().includes('resume') || f.name.toLowerCase().includes('cv'));
  if (!resume) {
    errors.push('Resume file is required');
  }

  // Validate each file
  for (const file of files) {
    if (!validateFileExtension(file.name)) {
      errors.push(`File "${file.name}" has invalid extension. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
    }
    if (!validateFileSize(file.size)) {
      errors.push(`File "${file.name}" exceeds maximum size of 5MB`);
    }
  }

  // Check total size
  if (!validateTotalFileSize(files)) {
    errors.push(`Total file size exceeds maximum of 10MB`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export { MAX_FILE_SIZE, MAX_TOTAL_SIZE, ALLOWED_EXTENSIONS };

