import React, { useState } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';

const FAQContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: `0 0 ${theme.spacing(2)}px 0`,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2, 3),
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
    },
  },
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontSize: '1.1rem',
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  backgroundColor: theme.palette.background.default,
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const faqData = [
  {
    question: 'Is the image cropper really free to use?',
    answer: 'Yes, our image cropper is completely free to use. You can crop as many images as you want without any cost or registration required.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support all major image formats including JPG, PNG, and GIF. The maximum file size is 10MB per image.',
  },
  {
    question: 'Will cropping reduce the quality of my image?',
    answer: 'No, our cropping tool maintains the original quality of your image. We use advanced algorithms to ensure zero quality loss during the cropping process.',
  },
  {
    question: 'Can I crop images on mobile devices?',
    answer: 'Absolutely! Our image cropper is fully responsive and works perfectly on mobile devices, tablets, and desktops. The interface adapts to your screen size for the best experience.',
  },
  {
    question: 'Do I need to create an account to use the cropper?',
    answer: 'No account creation is required. You can start cropping images immediately without any registration or sign-up process.',
  },
  {
    question: 'How do I download my cropped image?',
    answer: 'After cropping your image, simply click the "Download" button. Your cropped image will be saved as a high-quality JPEG file to your device.',
  },
  {
    question: 'Can I crop multiple images at once?',
    answer: 'Currently, you can crop one image at a time. However, the process is very quick and you can easily crop multiple images by uploading them one by one.',
  },
  {
    question: 'What aspect ratios are available?',
    answer: 'You can choose from several preset aspect ratios including Free (custom), 1:1 (square), 4:3, 16:9, and 3:2. You can also crop freely without any aspect ratio constraints.',
  },
];

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FAQContainer maxWidth="md">
      <FAQTitle variant="h2" as="h2" sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
        Frequently Asked Questions
      </FAQTitle>

      <Box>
        {faqData.map((faq, index) => (
          <StyledAccordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <StyledAccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
              <QuestionText>{faq.question}</QuestionText>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <AnswerText>{faq.answer}</AnswerText>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </FAQContainer>
  );
};

export default FAQ;
