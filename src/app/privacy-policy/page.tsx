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

const PrivacyPolicy: React.FC = () => {
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
          Privacy Policy
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
          At CropsImage (
          <a href="https://cropsimage.com/" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            https://cropsimage.com/
          </a>
          ), your privacy is our priority. This Privacy Policy explains how we handle your information when you use our website.
        </BodyText>

        <SectionTitle variant="h2">1. Information We Collect</SectionTitle>
        <BodyText>Currently, we do not collect any personal data from users. You can use our crop and resize tools without creating an account or providing personal information.</BodyText>

        <SectionTitle variant="h2">2. Uploaded Images</SectionTitle>
        <BodyText>
          All images you upload are processed temporarily in your browser or on our servers for the purpose of cropping/resizing. We do not store, access, or share your images. Once processing is
          complete, the images are deleted automatically.
        </BodyText>

        <SectionTitle variant="h2">3. Cookies</SectionTitle>
        <BodyText>We do not use cookies to track users at this time.</BodyText>

        <SectionTitle variant="h2">4. Advertising</SectionTitle>
        <BodyText>Currently, there are no ads on CropsImage. In the future, we may implement ads or monetization methods. Any updates will be reflected in this Privacy Policy.</BodyText>

        <SectionTitle variant="h2">5. Third-Party Services</SectionTitle>
        <BodyText>We do not use third-party services that collect personal data at this time.</BodyText>

        <SectionTitle variant="h2">6. Changes to this Policy</SectionTitle>
        <BodyText>We may update this policy if new features are added. Changes will be posted on this page with an updated effective date.</BodyText>

        <SectionTitle variant="h2">Contact Us</SectionTitle>
        <BodyText>
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:privacy.cropimage@gmail.com" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            privacy.cropimage@gmail.com
          </a>
        </BodyText>
      </ContentPaper>
    </StyledContainer>
  );
};

export default PrivacyPolicy;
