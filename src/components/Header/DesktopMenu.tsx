import { headerNavigationItems } from '@/constants/navigation';
import Box from '@mui/material/Box';
import React from 'react';
import NavigationItem from './NavigationItem';
import { usePathname } from 'next/navigation';

type DesktopMenuProps = {
  onClose: () => void;
};

const DesktopMenu = ({ onClose }: DesktopMenuProps) => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 3,
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      {headerNavigationItems.map(item => (
        <NavigationItem {...item} onClick={onClose} isActive={pathname === item.href} key={item.title} />
      ))}
    </Box>
  );
};

export default DesktopMenu;
