import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/Contact`);
  });

  test('should submit contact form successfully', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="inquiryType"]', 'demo');
    await page.fill('textarea[name="message"]', 'This is a test message with enough characters to pass validation.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for success toast
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.selectOption('select[name="inquiryType"]', 'demo');
    await page.fill('textarea[name="message"]', 'This is a test message.');

    await page.click('button[type="submit"]');

    // Check for error message
    await expect(page.locator('text=/Invalid email/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show validation errors for short message', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="inquiryType"]', 'demo');
    await page.fill('textarea[name="message"]', 'Short');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=/at least 10 characters/i')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Career Application Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/JobApplication?id=senior-ai-ml-engineer`);
    // Wait for page to load
    await page.waitForSelector('input[name="name"]');
  });

  test('should submit career form with resume successfully', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('input[name="phone"]', '+442012345678');
    await page.fill('textarea[name="message"]', 'I am interested in this position.');

    // Upload resume (create a fake PDF file)
    const fakePDFContent = Buffer.from('%PDF-1.4 fake pdf content');
    await page.setInputFiles('input[type="file"][accept=".pdf,.doc,.docx"]', {
      name: 'resume.pdf',
      mimeType: 'application/pdf',
      buffer: fakePDFContent,
    });

    // Submit
    await page.click('button[type="submit"]');

    // Wait for success
    await expect(page.locator('text=/Application submitted successfully/i')).toBeVisible({ timeout: 10000 });
  });

  test('should show error when resume is missing', async ({ page }) => {
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('input[name="phone"]', '+442012345678');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=/Resume is required/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid file type', async ({ page }) => {
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('input[name="phone"]', '+442012345678');

    // Upload invalid file
    const fakeTxtContent = Buffer.from('fake text content');
    await page.setInputFiles('input[type="file"][accept=".pdf,.doc,.docx"]', {
      name: 'resume.txt',
      mimeType: 'text/plain',
      buffer: fakeTxtContent,
    });

    await page.click('button[type="submit"]');

    await expect(page.locator('text=/invalid extension/i')).toBeVisible({ timeout: 10000 });
  });

  test('should submit with multiple attachments', async ({ page }) => {
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('input[name="phone"]', '+442012345678');

    // Upload resume
    const fakePDFContent = Buffer.from('%PDF-1.4 fake pdf content');
    await page.setInputFiles('input[type="file"][accept=".pdf,.doc,.docx"]', {
      name: 'resume.pdf',
      mimeType: 'application/pdf',
      buffer: fakePDFContent,
    });

    // Upload additional attachments
    const fileInput = page.locator('input[type="file"][multiple]').first();
    await fileInput.setInputFiles([
      {
        name: 'portfolio.pdf',
        mimeType: 'application/pdf',
        buffer: fakePDFContent,
      },
      {
        name: 'cover-letter.pdf',
        mimeType: 'application/pdf',
        buffer: fakePDFContent,
      },
    ]);

    await page.click('button[type="submit"]');

    await expect(page.locator('text=/Application submitted successfully/i')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Rate Limiting', () => {
  test('should return 429 after rate limit exceeded', async ({ request }) => {
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('inquiryType', 'demo');
    formData.append('message', 'This is a test message with enough characters.');

    // Make 11 requests (limit is 10)
    const responses = [];
    for (let i = 0; i < 11; i++) {
      const response = await request.post(`${API_BASE_URL}/api/forms/contact`, {
        data: formData,
      });
      responses.push(response);
    }

    // Check that last request is rate limited
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status()).toBe(429);
  });
});

test.describe('Honeypot', () => {
  test('should return 204 for honeypot submission', async ({ request }) => {
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('inquiryType', 'demo');
    formData.append('message', 'This is a test message.');
    formData.append('company', 'spam'); // Honeypot filled

    const response = await request.post(`${API_BASE_URL}/api/forms/contact`, {
      data: formData,
    });

    expect(response.status()).toBe(204);
  });
});

