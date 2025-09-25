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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            mt: 1,
            minWidth: '200px',
            py: 1,
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: 1 }}>
          {headerNavigationItems.map(item => (
            <NavigationItem {...item} onClick={onClose} isActive={pathname === item.href} key={item.title} />
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default MobileMenu;
