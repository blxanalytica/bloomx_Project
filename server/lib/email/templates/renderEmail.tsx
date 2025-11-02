import React from 'react';
import { render } from '@react-email/render';
import { CareerApplicationEmail, type CareerApplicationProps } from './CareerApplication.js';
import { ContactMessageEmail, type ContactMessageProps } from './ContactMessage.js';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  preheader?: string;
}

function wrapTextLines(text: string, maxLength: number = 78): string {
  const lines = text.split('\n');
  const wrapped: string[] = [];

  for (const line of lines) {
    if (line.length <= maxLength) {
      wrapped.push(line);
    } else {
      // Wrap long lines
      let remaining = line;
      while (remaining.length > maxLength) {
        const spaceIndex = remaining.lastIndexOf(' ', maxLength);
        if (spaceIndex > 0) {
          wrapped.push(remaining.substring(0, spaceIndex));
          remaining = remaining.substring(spaceIndex + 1);
        } else {
          wrapped.push(remaining.substring(0, maxLength));
          remaining = remaining.substring(maxLength);
        }
      }
      if (remaining) {
        wrapped.push(remaining);
      }
    }
  }

  return wrapped.join('\n');
}

export function renderCareer(props: CareerApplicationProps): RenderedEmail {
  try {
    const { id, applicant, applyFor } = props;
    const subject = `Career Application #${id} – ${applyFor} – ${applicant.name}`;
    const preheader = `New application for ${applyFor} from ${applicant.name}`;

    const html = render(React.createElement(CareerApplicationEmail, props), {
      pretty: false,
    });

    const text = render(React.createElement(CareerApplicationEmail, props), {
      plainText: true,
    });

    return {
      subject,
      html,
      text: wrapTextLines(text),
      preheader,
    };
  } catch (error) {
    console.error('Error rendering career email:', error);
    throw error;
  }
}

export function renderContact(props: ContactMessageProps): RenderedEmail {
  try {
    const { id, sender, subject } = props;
    const emailSubject = `Contact #${id} – ${subject} – ${sender.name}`;
    const preheader = `New message from ${sender.name}`;

    const html = render(React.createElement(ContactMessageEmail, props), {
      pretty: false,
    });

    const text = render(React.createElement(ContactMessageEmail, props), {
      plainText: true,
    });

    return {
      subject: emailSubject,
      html,
      text: wrapTextLines(text),
      preheader,
    };
  } catch (error) {
    console.error('Error rendering contact email:', error);
    throw error;
  }
}
