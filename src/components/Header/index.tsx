'use client';

import { MouseEvent, Suspense, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        top: 0,
        zIndex: 1100,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: { xs: 64, sm: 70 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Link href="/" aria-label="logo" tabIndex={0} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                },
              }}
            >
              <Image
                src="/images/logo.png"
                alt="CropsImage Logo"
                width={40}
                height={40}
                style={{
                  width: 'auto',
                  height: '40px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                ml: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                letterSpacing: '-0.02em',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              CropsImage
            </Typography>
          </Box>
        </Link>
        <DesktopMenu onClose={onMenuClose} />
        <Box>
          {isMobile && (
            <IconButton
              aria-label="header burger button"
              tabIndex={0}
              onClick={onMenuOpen}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              <MenuIcon
                sx={{
                  color: '#374151',
                  fontSize: '1.5rem',
                }}
              />
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
