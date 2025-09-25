import React from 'react';

import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import { headerNavigationItems } from '@/constants/navigation';
import NavigationItem from './NavigationItem';

type MobileMenuProps = {
  onClose: () => void;
  anchorEl: null | HTMLElement;
};

const MobileMenu = ({ onClose, anchorEl }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex' }}>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
        {headerNavigationItems.map(item => (
          <NavigationItem {...item} onClick={onClose} isActive={pathname === item.href} key={item.title} />
        ))}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
