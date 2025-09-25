'use client';

import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NextLink from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { track } from '@vercel/analytics';

const FooterContainer = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent)',
  },
}));

const FooterLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  color: active ? '#667eea' : '#64748b',
  textDecoration: 'none',
  fontWeight: active ? 600 : 500,
  fontSize: '0.875rem',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  background: active ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
  border: active ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid transparent',
  display: 'inline-block',
  margin: '4px',
  '&:hover': {
    color: '#667eea',
    background: 'rgba(102, 126, 234, 0.08)',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
  },
}));

const Footer = () => {
  const pathname = usePathname();

  const socialMediaLinks = [
    { name: 'Twitter', icon: TwitterIcon, className: 'twitter', href: '/twitter' },
    { name: 'Facebook', icon: FacebookIcon, className: 'facebook', href: '/facebook' },
    { name: 'Instagram', icon: InstagramIcon, className: 'instagram', href: '/instagram' },
    { name: 'LinkedIn', icon: LinkedInIcon, className: 'linkedin', href: '/linkedin' },
    { name: 'YouTube', icon: YouTubeIcon, className: 'youtube', href: '/youtube' },
    { name: 'Pinterest', icon: PinterestIcon, className: 'pinterest', href: '/pinterest' },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          {/* Logo and Brand Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <NextLink
              href="/"
              style={{ textDecoration: 'none' }}
              onClick={() => {
                track('Footer Logo Click', {
                  destination: 'home',
                  location: 'footer',
                });
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
                    },
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="CropsImage Logo"
                    width={32}
                    height={32}
                    style={{
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    ml: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  CropsImage
                </Typography>
              </Box>
            </NextLink>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                maxWidth: 400,
                mx: 'auto',
                lineHeight: 1.6,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Professional image cropping tools for all your social media and creative needs. Fast, free, and easy to use.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: '#374151',
                fontWeight: 600,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {/* Social Media Platform Links with Icons and Titles */}
              {socialMediaLinks.map(social => {
                const IconComponent = social.icon;
                const isActive = pathname === social.href;
                return (
                  <FooterLink
                    key={social.name}
                    href={social.href}
                    active={isActive}
                    onClick={() => {
                      track('Footer Social Link Click', {
                        platform: social.name,
                        href: social.href,
                        isActive: isActive,
                        location: 'footer',
                      });
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconComponent sx={{ fontSize: '1rem', color: 'inherit' }} />
                      {social.name}
                    </Box>
                  </FooterLink>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ mb: 4, opacity: 0.3 }} />

          {/* Copyright */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#94a3b8',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              © {new Date().getFullYear()} CropsImage. All rights reserved. Made with ❤️ for creators worldwide.
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
