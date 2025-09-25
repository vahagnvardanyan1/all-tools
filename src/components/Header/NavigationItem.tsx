import { Texts } from '@/styles/texts';
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
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.primary.main : Texts.grey,
  textDecoration: 'none',
  fontSize: '1.2rem',
}));

const NavigationItem = ({ title, href, isActive }: NavigationItemProps) => {
  return (
    <StyledLink href={href} isActive={isActive}>
      {title}
    </StyledLink>
  );
};

export default NavigationItem;
