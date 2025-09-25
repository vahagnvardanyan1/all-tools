import React, { useRef, useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

interface HowToStep {
  iconName: string;
  title: string;
  description: string;
  details: string[];
}

interface HowToProps {
  steps: HowToStep[];
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imagePosition?: 'left' | 'right';
}

const Section = styled(Box)(({ theme }) => ({
  maxWidth: '1100px',
  margin: '0 auto',
  padding: theme.spacing(6, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

const Grid = styled(Box, {
  shouldForwardProp: prop => prop !== 'imagePosition',
})<{ imagePosition?: 'left' | 'right' }>(({ theme, imagePosition }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gridAutoFlow: 'dense',
    '& > .image-col': { order: imagePosition === 'right' ? 2 : 1 },
    '& > .steps-col': { order: imagePosition === 'right' ? 1 : 2 },
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: 20,
  border: '1px solid #E5E7EB',
  display: 'block',
  boxShadow: '0 20px 50px rgba(2,6,23,0.08)',
  maxWidth: 520,
  justifySelf: 'center',
  [theme.breakpoints.down('md')]: {
    maxWidth: 420,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 320,
  },
}));

const StepRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '6px 1fr',
  gap: theme.spacing(2.5),
  padding: theme.spacing(1.5, 0),
  cursor: 'pointer',
  marginBottom: theme.spacing(2.5),
}));

const StepBar = styled(Box, { shouldForwardProp: prop => prop !== 'active' })<{ active?: boolean }>(({ active }) => ({
  width: 6,
  borderRadius: 999,
  background: active ? 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' : '#E5E7EB',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.01em',
  color: '#0B1220',
  fontSize: '1.875rem',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: { fontSize: '2.25rem' },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#0B1220',
}));

const StepDescription = styled(Typography)({
  fontSize: '0.95rem',
  color: '#475569',
  lineHeight: 1.6,
});

const StepParagraph = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#475569',
  lineHeight: 1.7,
  marginTop: theme.spacing(1),
}));

const CompactAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderRadius: 0,
  '&:before': { display: 'none' },
  '& .MuiAccordionSummary-root': { padding: 0, minHeight: 0 },
  '& .MuiAccordionSummary-content': { margin: 0 },
  '& .MuiAccordionDetails-root': { padding: 0, paddingTop: theme.spacing(1) },
}));

const HowToAccordion: React.FC<HowToProps> = ({ steps, title, subtitle, imageSrc = '/window.svg', imagePosition = 'left' }) => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const firstStepRef = useRef<HTMLDivElement | null>(null);

  const toggle = (index: number) => setExpanded(prev => (prev === index ? null : index));

  return (
    <Section>
      <Grid imagePosition={imagePosition}>
        <Box
          className="image-col"
          onClick={() => {
            setExpanded(0);
            firstStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setExpanded(0);
              firstStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          sx={{ outline: 'none', width: '80%', margin: '0 auto' }}
        >
          <Image src={imageSrc} alt="How to preview" />
        </Box>
        <Box className="steps-col">
          <Title variant="h2">{title}</Title>
          <Box>
            {steps.map((step, index) => {
              const isOpen = expanded === index;
              return (
                <StepRow
                  key={index}
                  ref={index === 0 ? firstStepRef : undefined}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('[data-acc-summary="true"]')) return;
                    toggle(index);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(index);
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <StepBar active={isOpen} />
                  <Box>
                    <CompactAccordion expanded={isOpen} onChange={() => toggle(index)} disableGutters square>
                      <AccordionSummary data-acc-summary="true" aria-controls={`howto2-step-${index}-content`} id={`howto2-step-${index}-header`} sx={{ cursor: 'pointer' }}>
                        <StepTitle sx={{ cursor: 'pointer' }}>{step.title}</StepTitle>
                      </AccordionSummary>
                      <AccordionDetails>
                        <StepDescription>{step.description}</StepDescription>
                        <Box>
                          {step.details.map((detail, i) => (
                            <StepParagraph key={i}>{detail}</StepParagraph>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </CompactAccordion>
                  </Box>
                </StepRow>
              );
            })}
          </Box>
          <Box mt={4}>
            <Button
              startIcon={<CloudUpload />}
              variant="contained"
              onClick={() => {
                const el = document.getElementById('hero-title');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 999,
                px: 2.5,
                py: 1,
                backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                  boxShadow: '0 10px 28px rgba(124, 58, 237, 0.45)',
                },
              }}
            >
              Upload your image
            </Button>
          </Box>
        </Box>
      </Grid>
    </Section>
  );
};

export default HowToAccordion;


