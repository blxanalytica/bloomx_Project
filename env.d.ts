/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_PROVIDER?: 'smtp' | 'resend';
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_SECURE?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
    SMTP_FROM?: string;
    SMTP_TO?: string;
    RESEND_API_KEY?: string;
    ENABLE_RECAPTCHA?: string;
    RECAPTCHA_SECRET_KEY?: string;
    PORT?: string;
  }
}

export {};

