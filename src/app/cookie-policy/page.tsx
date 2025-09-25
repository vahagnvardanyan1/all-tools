'use client';

import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  maxWidth: '900px',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fafafa',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#1f2937',
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const BodyText = styled(Typography)(({ theme }) => ({
  color: '#4b5563',
  lineHeight: 1.7,
  marginBottom: theme.spacing(2),
  fontSize: '1rem',
}));

const LastUpdated = styled(Typography)(({ theme }) => ({
  color: '#6b7280',
  fontSize: '0.875rem',
  fontStyle: 'italic',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledList = styled('ul')(() => ({
  paddingLeft: 24,
  margin: '0 0 16px 0',
  color: '#4b5563',
  lineHeight: 1.7,
  fontSize: '1rem',
  '& li': {
    marginBottom: '8px',
  },
}));

const CookieTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: theme.spacing(2),
  '& th, & td': {
    border: '1px solid #e5e7eb',
    padding: theme.spacing(1.5),
    textAlign: 'left',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  '& th': {
    backgroundColor: '#f9fafb',
    fontWeight: 600,
    color: '#1f2937',
  },
  '& td': {
    color: '#4b5563',
  },
}));

const CookiePolicy: React.FC = () => {
  return (
    <StyledContainer>
      <HeaderBox>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            lineHeight: 1.2,
            marginBottom: 2,
            background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cookie Policy
        </Typography>
        <LastUpdated>
          Effective Date:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </LastUpdated>
      </HeaderBox>

      <ContentPaper>
        <BodyText>
          This Cookie Policy explains how CropsImage (
          <a href="https://cropsimage.com/" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            https://cropsimage.com/
          </a>
          ) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of
          them.
        </BodyText>

        <SectionTitle variant="h2">1. What are cookies?</SectionTitle>
        <BodyText>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to
          work more efficiently, as well as to provide reporting information.
        </BodyText>

        <SectionTitle variant="h2">2. Why do we use cookies?</SectionTitle>
        <BodyText>We use cookies for several reasons:</BodyText>
        <StyledList>
          <li>
            <strong>Essential cookies:</strong> Some cookies are essential for the operation of our website. They enable you to navigate around the site and use its features.
          </li>
          <li>
            <strong>Performance cookies:</strong> These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us optimize our
            website performance.
          </li>
          <li>
            <strong>Functionality cookies:</strong> These cookies allow our website to remember choices you make (such as your cookie preferences) and provide enhanced, more personal features.
          </li>
          <li>
            <strong>Analytics cookies:</strong> We use analytics services like Vercel Analytics to understand how our website is being used and to improve user experience.
          </li>
        </StyledList>

        <SectionTitle variant="h2">3. What types of cookies do we use?</SectionTitle>
        <BodyText>We use the following types of cookies on our website:</BodyText>

        <CookieTable>
          <thead>
            <tr>
              <th>Cookie Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential/Functional</td>
              <td>Store your cookie consent preferences</td>
              <td>Persistent (until you clear browser data)</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>Vercel Analytics - Track website usage and performance</td>
              <td>Session and persistent cookies</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Help us understand how visitors interact with our website</td>
              <td>Varies by provider</td>
            </tr>
          </tbody>
        </CookieTable>

        <SectionTitle variant="h2">4. Third-party cookies</SectionTitle>
        <BodyText>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements. These include:</BodyText>
        <StyledList>
          <li>
            <strong>Vercel Analytics:</strong> Provides website analytics to help us understand user behavior and improve our service.
          </li>
          <li>
            <strong>Future advertising partners:</strong> We may introduce advertising cookies in the future to support our free service.
          </li>
        </StyledList>

        <SectionTitle variant="h2">5. How can you control cookies?</SectionTitle>
        <BodyText>You have several options to control or limit how we and our partners use cookies and similar technologies:</BodyText>
        <StyledList>
          <li>
            <strong>Cookie banner:</strong> When you first visit our website, you can choose to accept or decline non-essential cookies through our cookie banner.
          </li>
          <li>
            <strong>Browser settings:</strong> Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies or to alert you when
            cookies are being sent.
          </li>
          <li>
            <strong>Opt-out links:</strong> Some third-party services provide direct opt-out mechanisms on their websites.
          </li>
        </StyledList>

        <BodyText>Please note that if you choose to disable cookies, some features of our website may not function properly.</BodyText>

        <SectionTitle variant="h2">6. Image processing and temporary data</SectionTitle>
        <BodyText>
          When you upload images to our service, we temporarily process them in your browser or on our servers. This processing does not involve cookies, and we do not store your images permanently.
          All uploaded images are automatically deleted after processing.
        </BodyText>

        <SectionTitle variant="h2">7. Updates to this Cookie Policy</SectionTitle>
        <BodyText>
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by
          posting the new Cookie Policy on this page with a new effective date.
        </BodyText>

        <SectionTitle variant="h2">8. Contact us</SectionTitle>
        <BodyText>
          If you have any questions about our use of cookies or this Cookie Policy, please contact us at:{' '}
          <a href="mailto:privacy.cropimage@gmail.com" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            privacy.cropimage@gmail.com
          </a>
        </BodyText>

        <BodyText sx={{ marginTop: 3, fontSize: '0.9rem', color: '#6b7280' }}>
          For more information about our privacy practices, please review our{' '}
          <a href="/privacy-policy" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms-of-use" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            Terms of Use
          </a>
          .
        </BodyText>
      </ContentPaper>
    </StyledContainer>
  );
};

export default CookiePolicy;
