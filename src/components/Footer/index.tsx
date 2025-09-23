'use client';

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { navigationItems } from '@/constants/navigation';
import { BackgroundColors } from '@/styles/backgrounds';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: BackgroundColors.light,
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        © {new Date().getFullYear()} Crop Image. All rights reserved.
      </Typography>
      <Box>
        {navigationItems.map(item => (
          <FooterLink key={item.title} href={item.href} variant="body2">
            {item.title}
          </FooterLink>
        ))}
      </Box>
    </FooterContainer>
  );
};

export default Footer;
