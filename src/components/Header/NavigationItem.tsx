import { Texts } from '@/styles/texts';
import { MenuItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type NavigationItemProps = {
  title: string;
  href: string;
  isActive?: boolean;
  onClick: () => void;
};

const NavigationItem = ({ title, href, isActive, onClick }: NavigationItemProps) => {
  return (
    <MenuItem onClick={onClick}>
      <Link
        href={href}
        style={{
          color: isActive ? '#1976d2' : Texts.grey,
          textDecoration: 'none',
        }}
      >
        {title}
      </Link>
    </MenuItem>
  );
};

export default NavigationItem;
