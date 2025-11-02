import React from 'react';
import {
  EmailContainer,
  EmailSection,
  EmailH1,
  EmailH2,
  EmailText,
  EmailButton,
  EmailDivider,
  KeyValueRow,
  EmailFooter,
  type EmailTheme,
} from './Theme';
import { Row, Column } from '@react-email/components';

export interface ContactMessageProps {
  id: string;
  submittedAtISO: string;
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  message: string;
  brand?: Partial<EmailTheme>;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
}

function encodeMailtoSubject(subject: string): string {
  return encodeURIComponent(`Re: ${subject}`);
}

export function ContactMessageEmail({
  id,
  submittedAtISO,
  sender,
  subject,
  message,
  brand,
}: ContactMessageProps) {
  const theme = brand || {};
  const submittedAt = formatDate(submittedAtISO);
  const preheader = `New message from ${sender.name}`;
  const mailtoHref = `mailto:${sender.email}?subject=${encodeMailtoSubject(subject)}`;

  return (
    <EmailContainer theme={theme} preheader={preheader}>
      <EmailSection theme={theme}>
        <EmailH1 theme={theme}>Contact #{id}</EmailH1>
        <EmailText theme={theme} muted>
          New message received
        </EmailText>
      </EmailSection>

      <EmailSection theme={theme}>
        <EmailH2 theme={theme}>Sender Information</EmailH2>
        <Row>
          <Column>
            <KeyValueRow label="Name" value={sender.name} theme={theme} />
            <KeyValueRow label="Email" value={sender.email} theme={theme} />
            <KeyValueRow label="Subject" value={subject} theme={theme} />
            <KeyValueRow label="Submitted" value={submittedAt} theme={theme} />
            <KeyValueRow label="Request ID" value={id} theme={theme} />
          </Column>
        </Row>
      </EmailSection>

      <EmailSection theme={theme}>
        <EmailH2 theme={theme}>Message</EmailH2>
        <EmailText theme={theme} style={{ whiteSpace: 'pre-wrap' }}>
          {message}
        </EmailText>
      </EmailSection>

      <EmailSection theme={theme}>
        <Row>
          <Column align="center">
            <EmailButton href={mailtoHref} theme={theme}>
              Reply to {sender.name}
            </EmailButton>
          </Column>
        </Row>
      </EmailSection>

      <EmailFooter theme={theme} />
    </EmailContainer>
  );
}

