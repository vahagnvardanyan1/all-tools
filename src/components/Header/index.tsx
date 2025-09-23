'use client';

import { MouseEvent, Suspense, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { BackgroundColors } from '@/styles/backgrounds';
import { Texts } from '@/styles/texts';
import useDevice from '@/hooks/useDevice';
import dynamic from 'next/dynamic';
import DesktopMenu from './DesktopMenu';

const MobileMenu = dynamic(() => import('./MobileMenu'));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isMobile } = useDevice();

  const onMenuOpen = (event?: MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(true);
    setAnchorEl(event?.currentTarget ?? null);
  };
  const onMenuClose = () => {
    setIsMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: BackgroundColors.light,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} style={{ width: 'auto', height: '60px' }} />
          <Typography variant="h6" component="div" sx={{ color: '#8b5cf6', fontWeight: 600 }}>
            Crop Image
          </Typography>
        </Box>
        <DesktopMenu onClose={onMenuClose} />
        <Box>
          {isMobile && (
            <IconButton color="inherit" onClick={onMenuOpen}>
              <MenuIcon sx={{ color: Texts.dark }} />
            </IconButton>
          )}
          {isMenuOpen && (
            <Suspense fallback={null}>
              <MobileMenu onClose={onMenuClose} anchorEl={anchorEl} />
            </Suspense>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
