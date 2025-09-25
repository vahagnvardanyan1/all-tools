import React from 'react';
import { Typography } from '@mui/material';

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return (
    <Typography
      component="p"
      sx={{
        mt: 1,
        mx: 'auto',
        maxWidth: 760,
        textAlign: 'center',
        fontSize: { xs: '1rem', md: '1.0625rem' },
        lineHeight: 1.7,
        letterSpacing: '-0.01em',
        color: '#475569',
        opacity: 0.95,
      }}
    >
      {children}
    </Typography>
  );
};

export default Description;


