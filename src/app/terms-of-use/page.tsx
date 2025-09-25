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

const TermsOfUse: React.FC = () => {
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
          Terms of Use
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
          By using CropsImage (
          <a href="https://cropsimage.com/" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            https://cropsimage.com/
          </a>
          ), you agree to these Terms of Use.
        </BodyText>

        <SectionTitle variant="h2">1. Use of Service</SectionTitle>
        <BodyText>CropsImage provides free online tools to crop and resize images. You may use the tools for personal, educational, or professional purposes.</BodyText>

        <SectionTitle variant="h2">2. Image Responsibility</SectionTitle>
        <BodyText>You are solely responsible for the content of images you upload. We do not access, store, or monitor your images.</BodyText>

        <SectionTitle variant="h2">3. Prohibited Uses</SectionTitle>
        <BodyText>You may not use CropsImage to:</BodyText>
        <StyledList>
          <li>Upload illegal, offensive, or copyrighted content without permission</li>
          <li>Attempt to disrupt or harm the website or servers</li>
        </StyledList>

        <SectionTitle variant="h2">4. Availability</SectionTitle>
        <BodyText>We strive to keep the website available, but CropsImage does not guarantee uninterrupted service.</BodyText>

        <SectionTitle variant="h2">5. Limitation of Liability</SectionTitle>
        <BodyText>CropsImage is provided &quot;as-is&quot; and &quot;as available.&quot; We are not liable for any damages arising from the use of this website.</BodyText>

        <SectionTitle variant="h2">6. Future Updates and Ads</SectionTitle>
        <BodyText>We may introduce new features, ads, or monetization methods in the future. These Terms will be updated to reflect such changes.</BodyText>

        <SectionTitle variant="h2">7. Changes to Terms</SectionTitle>
        <BodyText>We may update these Terms of Use at any time. Continued use of CropsImage constitutes acceptance of the updated Terms.</BodyText>

        <SectionTitle variant="h2">Contact Us</SectionTitle>
        <BodyText>
          For any questions, contact:{' '}
          <a href="mailto:privacy.cropimage@gmail.com" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            privacy.cropimage@gmail.com
          </a>
        </BodyText>
      </ContentPaper>
    </StyledContainer>
  );
};

export default TermsOfUse;
