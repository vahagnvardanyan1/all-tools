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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ faqData, title = 'Frequently Asked Questions' }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FAQContainer maxWidth="md">
      <FAQTitle variant="h2" as="h2" sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
        {title}
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
