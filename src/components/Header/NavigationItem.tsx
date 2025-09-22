import { Texts } from '@/styles/texts';
import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';

type NavigationItemProps = {
  title: string;
  href: string;
  isActive?: boolean;
  onClick: () => void;
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
}));

const StyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? theme.palette.primary.main : Texts.grey,
  textDecoration: 'none',
}));

const NavigationItem = ({ title, href, isActive, onClick }: NavigationItemProps) => {
  return (
    <StyledMenuItem onClick={onClick}>
      <StyledLink href={href} isActive={isActive}>
        {title}
      </StyledLink>
    </StyledMenuItem>
  );
};

export default NavigationItem;
