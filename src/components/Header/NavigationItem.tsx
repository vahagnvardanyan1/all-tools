import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';

type NavigationItemProps = {
  title: string;
  href: string;
  isActive?: boolean;
  onClick: () => void;
};

const StyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive }) => ({
  position: 'relative',
  color: isActive ? '#667eea' : '#6b7280',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: isActive ? 600 : 500,
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  padding: '8px 16px',
  borderRadius: '999px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    color: '#667eea',
    transform: 'translateY(-1px)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  // Active indicator
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isActive ? '40px' : '0',
    height: '2px',
    background: 'linear-gradient(135deg, #667eea 10%, #764ba2 100%)',
    borderRadius: '1px',
    transition: 'width 0.3s ease',
  },
}));

const NavigationItem = ({ title, href, isActive }: NavigationItemProps) => {
  return (
    <StyledLink href={href} isActive={isActive}>
      {title}
    </StyledLink>
  );
};

export default NavigationItem;
