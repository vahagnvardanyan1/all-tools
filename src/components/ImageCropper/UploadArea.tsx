import React, { useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';

interface UploadAreaProps {
  isDragActive?: boolean;
}

interface UploadAreaComponentProps {
  onFileSelect: (file: File) => void;
  error?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttonText?: string;
  supportedFormats?: string;
  wide?: boolean;
}

const UploadAreaContainer = styled(Paper, {
  shouldForwardProp: prop => prop !== 'isDragActive',
})<UploadAreaProps>(({ theme, isDragActive }) => {
  const dashColor = isDragActive ? '#D6D3F1' : '#bdbdbd';
  return {
    // draw dashes with an inset pseudo-element to create inner padding
    border: 0,
    borderRadius: theme.spacing(4),
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    // soft UI-matching background gradient (indigo/purple tint)
    backgroundImage: 'linear-gradient(145deg, #F5F3FF 0%, #EDE9FE 35%, #E9D5FF 70%, #DBEAFE 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 24px 48px rgba(17,24,39,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
    position: 'relative',
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: theme.spacing(2.5),
      border: `3px dashed ${dashColor}`,
      borderRadius: theme.spacing(3.5),
      pointerEvents: 'none',
      zIndex: 0,
    },
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(147,51,234,0.12) 50%, rgba(76,29,149,0.10) 100%), #ffffff',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.16)',
      transform: 'translateY(-2px)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
      '&::after': {
        inset: theme.spacing(1.5),
        borderRadius: theme.spacing(3),
      },
    },
  };
});

const HiddenInput = styled('input')({
  display: 'none',
});

const UploadArea: React.FC<UploadAreaComponentProps> = ({
  onFileSelect,
  error,
  title = 'Drag & drop an image',
  subtitle,
  buttonText = 'Choose Image',
  supportedFormats = 'Supports: JPG, PNG, GIF (Max 40MB)',
  wide = false,
}) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSelectFile = useCallback(
    (file: File) => {
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        // Error handling will be done by parent component
        return;
      }

      // Validate file size (max 40MB)
      if (file.size > 40 * 1024 * 1024) {
        // Error handling will be done by parent component
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      const file = e.dataTransfer.files[0];
      validateAndSelectFile(file);
    },
    [validateAndSelectFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSelectFile(file);
    },
    [validateAndSelectFile],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const defaultSubtitle = (
    <>
      <Box
        component="span"
        sx={{
          backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block',
          fontWeight: 800,
        }}
      >
        browse to upload
      </Box>
    </>
  );

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <UploadAreaContainer
        isDragActive={isDragActive}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: wide ? { xs: '100%', md: '700px' } : { xs: '100%', sm: '400px', md: '600px' },
          maxWidth: wide ? { xs: '100%', md: '900px' } : { xs: '100%', md: '720px' },
          minHeight: wide ? { xs: 240, md: 300 } : { xs: 240, md: 320 },
          width: { xs: '100%', sm: 'auto' },
          mx: 'auto',
          margin: 0,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: '#242424',
            mb: 1,
            fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
            letterSpacing: '-0.04em',
            lineHeight: '1.3',
            textAlign: 'center',
            flexWrap: 'nowrap',
          }}
        >
          {title}
        </Typography>
        {/* the centered 'or' line */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#242424',
            my: 0.5,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
          }}
        >
          or
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
            mb: 1,
            textAlign: 'center',
            letterSpacing: '-0.04em',
            lineHeight: '1.3',
            flexWrap: 'nowrap',
            color: '#242424',
          }}
        >
          {subtitle ?? defaultSubtitle}
        </Typography>
        <Button
          variant="contained"
          size="large"
          disableElevation
          sx={{
            borderRadius: 999,
            px: { xs: 4, md: 5 },
            py: { xs: 1.75, md: 2 },
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            fontWeight: 800,
            textTransform: 'none',
            // backgroundColor: 'primary.main',
            backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
            color: 'primary.contrastText',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: 'none',
              transform: 'none',
            },
            mb: 2,
          }}
        >
          {buttonText}
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
            opacity: 0.75,
            textAlign: 'center',
          }}
        >
          {supportedFormats}
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>Free to use</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>No credit card required</Typography>
          </Box>
        </Box>
        <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} />
      </UploadAreaContainer>
    </Box>
  );
};

export default UploadArea;
