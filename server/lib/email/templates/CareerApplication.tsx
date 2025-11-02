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
} from './Theme.js';
import { Row, Column } from '@react-email/components';

export interface CareerApplicationProps {
  id: string;
  submittedAtISO: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
  };
  applyFor: string;
  message?: string;
  attachments: Array<{
    filename: string;
    contentType?: string;
    sizeBytes: number;
  }>;
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function truncateFilename(filename: string, maxLength: number = 60): string {
  if (filename.length <= maxLength) return filename;
  const ext = filename.split('.').pop() || '';
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const maxNameLength = maxLength - ext.length - 4; // 4 for "..."
  return `${nameWithoutExt.substring(0, maxNameLength)}…${ext}`;
}

export function CareerApplicationEmail({
  id,
  submittedAtISO,
  applicant,
  applyFor,
  message,
  attachments,
  brand,
}: CareerApplicationProps) {
  const theme = brand || {};
  const submittedAt = formatDate(submittedAtISO);
  const preheader = `New application for ${applyFor} from ${applicant.name}`;

  return (
    <EmailContainer theme={theme} preheader={preheader}>
      <EmailSection theme={theme}>
        <EmailH1 theme={theme}>Career Application #{id}</EmailH1>
        <EmailText theme={theme} muted>
          New application received
        </EmailText>
      </EmailSection>

      <EmailSection theme={theme}>
        <EmailH2 theme={theme}>Applicant Information</EmailH2>
        <Row>
          <Column>
            <KeyValueRow label="Name" value={applicant.name} theme={theme} />
            <KeyValueRow label="Email" value={applicant.email} theme={theme} />
            <KeyValueRow label="Phone" value={applicant.phone} theme={theme} />
          </Column>
        </Row>
        <Row>
          <Column>
            <KeyValueRow label="Role" value={applyFor} theme={theme} />
            <KeyValueRow label="Submitted" value={submittedAt} theme={theme} />
            <KeyValueRow label="Request ID" value={id} theme={theme} />
          </Column>
        </Row>
      </EmailSection>

      {message && (
        <EmailSection theme={theme}>
          <EmailH2 theme={theme}>Message</EmailH2>
          <EmailText theme={theme} style={{ whiteSpace: 'pre-wrap' }}>
            {message}
          </EmailText>
        </EmailSection>
      )}

      {attachments.length > 0 && (
        <EmailSection theme={theme}>
          <EmailH2 theme={theme}>Attachments ({attachments.length})</EmailH2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontWeight: '600', fontSize: '14px', color: '#1B1E28', textAlign: 'left' }}>
                  Filename
                </th>
                <th style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontWeight: '600', fontSize: '14px', color: '#1B1E28', textAlign: 'left' }}>
                  Type
                </th>
                <th style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontWeight: '600', fontSize: '14px', color: '#1B1E28', textAlign: 'left' }}>
                  Size
                </th>
                <th style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontWeight: '600', fontSize: '14px', color: '#1B1E28', textAlign: 'left' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attachments.map((att, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', color: '#1B1E28' }}>
                    {truncateFilename(att.filename)}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', color: '#6B7280' }}>
                    {att.contentType || 'Unknown'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', color: '#6B7280' }}>
                    {formatFileSize(att.sizeBytes)}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', color: '#059669' }}>
                    Attached
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </EmailSection>
      )}

      <EmailFooter theme={theme} />
    </EmailContainer>
  );
}

