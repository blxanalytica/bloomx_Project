import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components';

export interface EmailTheme {
  brand: {
    name: string;
    url: string;
    logoUrl?: string;
  };
  color: {
    bg: string;
    card: string;
    text: string;
    muted: string;
    accent: string;
    accentDark: string;
  };
  radius: {
    card: string;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    card: string;
  };
}

export const defaultTheme: EmailTheme = {
  brand: {
    name: 'BloomX Analytica',
    url: 'https://bloomxanalytica.co.uk',
    logoUrl: undefined,
  },
  color: {
    bg: '#0B0C10',
    card: '#FFFFFF',
    text: '#1B1E28',
    muted: '#6B7280',
    accent: '#2563EB',
    accentDark: '#1E3A8A',
  },
  radius: {
    card: '12px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    lg: '24px',
    md: '16px',
  },
  shadow: {
    card: '0 2px 10px rgba(0,0,0,.06)',
  },
};

export function mergeTheme(theme: Partial<EmailTheme>): EmailTheme {
  return {
    brand: { ...defaultTheme.brand, ...theme.brand },
    color: { ...defaultTheme.color, ...theme.color },
    radius: { ...defaultTheme.radius, ...theme.radius },
    space: { ...defaultTheme.space, ...theme.space },
    shadow: { ...defaultTheme.shadow, ...theme.shadow },
  };
}

interface EmailContainerProps {
  children: React.ReactNode;
  theme?: Partial<EmailTheme>;
  preheader?: string;
}

export function EmailContainer({ children, theme, preheader }: EmailContainerProps) {
  const finalTheme = mergeTheme(theme || {});

  return (
    <Html>
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .email-bg { background-color: ${finalTheme.color.text} !important; }
            .email-card { background-color: ${finalTheme.color.bg} !important; }
            .email-text { color: ${finalTheme.color.card} !important; }
            .email-muted { color: #9CA3AF !important; }
            .email-accent { color: ${finalTheme.color.accent} !important; }
            .email-border { border-color: #374151 !important; }
          }
        `}</style>
      </Head>
      <Body style={{ fontFamily: '-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', backgroundColor: finalTheme.color.bg, margin: 0, padding: 0 }}>
        {preheader && (
          <div style={{ display: 'none', fontSize: '1px', color: '#ffffff', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden' }}>
            {preheader}
          </div>
        )}
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: finalTheme.space.md }}>
          {children}
        </Container>
      </Body>
    </Html>
  );
}

interface SectionProps {
  children: React.ReactNode;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

export function EmailSection({ children, theme, style }: SectionProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Section
      style={{
        backgroundColor: finalTheme.color.card,
        borderRadius: finalTheme.radius.card,
        padding: finalTheme.space.lg,
        marginBottom: finalTheme.space.md,
        boxShadow: finalTheme.shadow.card,
        ...style,
      }}
    >
      {children}
    </Section>
  );
}

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

export function EmailH1({ children, theme, style }: HeadingProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Heading
      as="h1"
      style={{
        fontSize: '24px',
        fontWeight: '600',
        color: finalTheme.color.text,
        margin: `0 0 ${finalTheme.space.md} 0`,
        lineHeight: '1.4',
        ...style,
      }}
    >
      {children}
    </Heading>
  );
}

export function EmailH2({ children, theme, style }: HeadingProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Heading
      as="h2"
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: finalTheme.color.text,
        margin: `0 0 ${finalTheme.space.sm} 0`,
        lineHeight: '1.4',
        ...style,
      }}
    >
      {children}
    </Heading>
  );
}

interface TextProps {
  children: React.ReactNode;
  theme?: Partial<EmailTheme>;
  muted?: boolean;
  style?: React.CSSProperties;
}

export function EmailText({ children, theme, muted, style }: TextProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Text
      style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: muted ? finalTheme.color.muted : finalTheme.color.text,
        margin: `0 0 ${finalTheme.space.sm} 0`,
        ...style,
      }}
    >
      {children}
    </Text>
  );
}

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

export function EmailButton({ href, children, theme, style }: ButtonProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Button
      href={href}
      style={{
        backgroundColor: finalTheme.color.accent,
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: '600',
        textDecoration: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        display: 'inline-block',
        minHeight: '44px',
        lineHeight: '20px',
        ...style,
      }}
    >
      {children}
    </Button>
  );
}

export function EmailDivider({ theme }: { theme?: Partial<EmailTheme> }) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Hr
      style={{
        borderColor: '#E5E7EB',
        borderWidth: '1px',
        borderStyle: 'solid',
        margin: `${finalTheme.space.md} 0`,
      }}
    />
  );
}

interface KeyValueRowProps {
  label: string;
  value: string;
  theme?: Partial<EmailTheme>;
}

export function KeyValueRow({ label, value, theme }: KeyValueRowProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <table style={{ width: '100%', marginBottom: finalTheme.space.sm, borderCollapse: 'collapse' }}>
      <tr>
        <td style={{ padding: '4px 8px 4px 0', fontSize: '14px', fontWeight: '600', color: finalTheme.color.text, verticalAlign: 'top', width: '120px' }}>
          {label}
        </td>
        <td style={{ padding: '4px 0', fontSize: '14px', color: finalTheme.color.text, verticalAlign: 'top' }}>
          {value}
        </td>
      </tr>
    </table>
  );
}

interface FooterProps {
  theme?: Partial<EmailTheme>;
  complianceNote?: string;
}

export function EmailFooter({ theme, complianceNote }: FooterProps) {
  const finalTheme = mergeTheme(theme || {});
  return (
    <Section
      style={{
        marginTop: finalTheme.space.lg,
        paddingTop: finalTheme.space.md,
        borderTop: `1px solid #E5E7EB`,
      }}
    >
      <Text
        style={{
          fontSize: '12px',
          color: finalTheme.color.muted,
          textAlign: 'center',
          margin: 0,
        }}
      >
        {complianceNote || 'Internal notification. Do not forward externally.'}
      </Text>
    </Section>
  );
}

