import React, { useState } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';

const FAQContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: 700,
  color: '#1f2937',
  fontSize: '2.25rem',
  lineHeight: 1.2,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.875rem',
  },
}));

const StyledAccordion = styled(Accordion, {
  shouldForwardProp: prop => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(() => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  border: 'none',
  borderBottom: '1px solid #e5e7eb',
  borderRadius: 0,
  margin: 0,
  '&:before': {
    display: 'none',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
    backgroundColor: 'transparent',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(3, 0),
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#6b7280',
    '&.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: '#1f2937',
  fontSize: '1.125rem',
  lineHeight: 1.5,
  flex: 1,
  paddingRight: theme.spacing(2),
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 0, 3, 0),
  backgroundColor: 'transparent',
}));

const StyledContainer = styled(Box)(() => ({
  maxWidth: '80%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const AnswerText = styled(Typography)(() => ({
  color: '#6b7280',
  lineHeight: 1.6,
  fontSize: '1rem',
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
    <FAQContainer>
      <FAQTitle variant="h2">{title}</FAQTitle>

      <StyledContainer>
        {faqData.map((faq, index) => {
          const panelId = `panel${index}`;
          const isExpanded = expanded === panelId;

          return (
            <StyledAccordion key={index} expanded={isExpanded} onChange={handleChange(panelId)} isExpanded={isExpanded}>
              <StyledAccordionSummary expandIcon={<ExpandMore />} aria-controls={`${panelId}-content`} id={`${panelId}-header`}>
                <QuestionText>{faq.question}</QuestionText>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                <AnswerText>{faq.answer}</AnswerText>
              </StyledAccordionDetails>
            </StyledAccordion>
          );
        })}
      </StyledContainer>
    </FAQContainer>
  );
};

export default FAQ;
