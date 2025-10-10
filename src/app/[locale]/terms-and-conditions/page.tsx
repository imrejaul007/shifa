import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Shifa Al Hind',
  description:
    'Terms and conditions for using Shifa Al Hind medical coordination services. Read our terms of service, user responsibilities, and legal disclaimers.',
  keywords: [
    'terms and conditions',
    'terms of service',
    'medical coordination terms',
    'healthcare services agreement',
    'shifa al hind terms',
    'medical tourism terms',
    'patient coordination agreement',
  ],
  openGraph: {
    title: 'Terms & Conditions | Shifa Al Hind',
    description: 'Terms and conditions for using Shifa Al Hind medical coordination services.',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  return <TermsClient />;
}
