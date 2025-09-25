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
        gap: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        mx: 4,
        py: 1,
        px: 2,
        borderRadius: '16px',
        background: 'rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      {headerNavigationItems.map(item => (
        <NavigationItem {...item} onClick={onClose} isActive={pathname === item.href} key={item.title} />
      ))}
    </Box>
  );
};

export default DesktopMenu;
