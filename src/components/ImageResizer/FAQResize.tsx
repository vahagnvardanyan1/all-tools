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
    question: 'Is the image resizer really free to use?',
    answer: 'Yes, our image resizer is completely free to use. You can resize as many images as you want without any cost or registration required.',
  },
  {
    question: 'What image formats are supported for resizing?',
    answer: 'We support all major image formats including JPG, PNG, and GIF. The maximum file size is 10MB per image.',
  },
  {
    question: 'Will resizing reduce the quality of my image?',
    answer:
      'Our resizer uses advanced algorithms to maintain the best possible quality. When making images smaller, quality is preserved. When enlarging, we use interpolation techniques to minimize quality loss.',
  },
  {
    question: 'Can I maintain the aspect ratio while resizing?',
    answer: 'Yes! You can check the "Maintain aspect ratio" option, and when you change either width or height, the other dimension will automatically adjust to keep the original proportions.',
  },
  {
    question: 'What are the maximum dimensions I can resize to?',
    answer: 'You can resize images up to 5000×5000 pixels. For larger dimensions, consider using professional image editing software.',
  },
  {
    question: 'Can I use preset sizes for common dimensions?',
    answer: 'Absolutely! We provide common preset sizes like 1920×1080 (Full HD), 1280×720 (HD), 800×600, and more. You can also restore the original dimensions with one click.',
  },
  {
    question: 'How do I download my resized image?',
    answer: 'After resizing your image, click the green "Download" button. Your resized image will be saved as a high-quality JPEG file to your device.',
  },
  {
    question: 'Can I resize multiple images at once?',
    answer: 'Currently, you can resize one image at a time. However, the process is very quick and you can easily resize multiple images by uploading them one by one.',
  },
  {
    question: 'What happens if I resize an image to be larger than the original?',
    answer:
      'When enlarging images, we use advanced interpolation algorithms to add pixels intelligently. While some quality loss is inevitable when making images larger, our tool minimizes this effect.',
  },
  {
    question: 'Can I use this tool on mobile devices?',
    answer: 'Yes! Our image resizer is fully responsive and works perfectly on mobile devices, tablets, and desktops. The interface adapts to your screen size for the best experience.',
  },
];

const FAQResize: React.FC = () => {
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

export default FAQResize;
