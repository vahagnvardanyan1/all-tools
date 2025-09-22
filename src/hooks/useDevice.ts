import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useDevice = () => {
  const theme = useTheme();

  // Mobile: width <= sm
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Desktop: width > md
  const isDesktop = useMediaQuery(theme.breakpoints.up('xs'));

  return { isMobile, isDesktop };
};

export default useDevice;
