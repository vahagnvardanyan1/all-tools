'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CookieBanner = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  maxWidth: '600px',
  margin: '0 auto',
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2.5),
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3, 4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  zIndex: 1300,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    padding: theme.spacing(2.5, 3),
    gap: theme.spacing(2),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const AcceptButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  background: 'rgba(255, 255, 255, 0.95)',
  color: '#2563EB',
  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
  border: 'none',
  '&:hover': {
    background: '#ffffff',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const DeclineButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  background: 'transparent',
  color: 'rgba(255, 255, 255, 0.9)',
  border: '1.5px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    color: '#ffffff',
  },
}));

export default function CookiesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <CookieBanner>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.95)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        🍪 We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our{' '}
        <Typography
          component="a"
          href="/cookie-policy"
          sx={{
            color: 'rgba(255, 255, 255, 1)',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
              color: '#ffffff',
              textDecoration: 'underline',
            },
          }}
        >
          cookie policy
        </Typography>
        .
      </Typography>
      <ButtonContainer>
        <AcceptButton onClick={handleAccept}>Accept All Cookies</AcceptButton>
        <DeclineButton onClick={handleDecline}>Decline</DeclineButton>
      </ButtonContainer>
    </CookieBanner>
  );
}
