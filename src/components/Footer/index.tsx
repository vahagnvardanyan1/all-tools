'use client';

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { footerNavigationItems } from '@/constants/navigation';
import { BackgroundColors } from '@/styles/backgrounds';
import { usePathname } from 'next/navigation';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: BackgroundColors.light,
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const FooterLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(0, 1),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  textDecoration: 'none',
  fontWeight: active ? 600 : 400,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const pathname = usePathname();

  return (
    <FooterContainer>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        © {new Date().getFullYear()} Crop Image. All rights reserved.
      </Typography>
      <Box>
        {footerNavigationItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <FooterLink key={item.title} href={item.href} variant="body2" active={isActive}>
              {item.title}
            </FooterLink>
          );
        })}
      </Box>
    </FooterContainer>
  );
};

export default Footer;
