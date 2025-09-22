import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoneyOff, HighQuality, AutoFixHigh } from '@mui/icons-material';

const ValueContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

const ValueGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(6),
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

const ValueItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const ValueIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  fontSize: 36,
}));

const ValueTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const ValueDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const valueItems = [
  {
    icon: <MoneyOff />,
    title: 'Free photo cropping',
    description: "Save time, money, and peace of mind with Picsart's free image cropper.",
  },
  {
    icon: <HighQuality />,
    title: 'Zero quality loss',
    description: 'Instantly crop images without sacrificing your photo quality.',
  },
  {
    icon: <AutoFixHigh />,
    title: 'Beginner-friendly cropping',
    description: 'Easily crop photos online with an easy-to-use cropping tool.',
  },
];

const ValueItemisation: React.FC = () => {
  return (
    <ValueContainer maxWidth="lg">
      <ValueGrid>
        {valueItems.map((item, index) => (
          <ValueItem key={index}>
            <ValueIcon>{item.icon}</ValueIcon>
            <ValueTitle variant="h5">{item.title}</ValueTitle>
            <ValueDescription variant="body1">{item.description}</ValueDescription>
          </ValueItem>
        ))}
      </ValueGrid>
    </ValueContainer>
  );
};

export default ValueItemisation;
