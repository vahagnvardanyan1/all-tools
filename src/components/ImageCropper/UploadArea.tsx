import React, { useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

interface UploadAreaProps {
  isDragActive?: boolean;
}

interface UploadAreaComponentProps {
  onFileSelect: (file: File) => void;
  error?: string;
}

const UploadAreaContainer = styled(Paper, {
  shouldForwardProp: prop => prop !== 'isDragActive',
})<UploadAreaProps>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const UploadArea: React.FC<UploadAreaComponentProps> = ({ onFileSelect, error }) => {
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

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
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
          minWidth: { xs: '100%', md: 500 },
          minHeight: { xs: 250, md: 400 },
          width: '100%',
          maxWidth: { xs: '100%', md: 600 },
        }}
      >
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drag & drop your image here
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          or click to select from your device
        </Typography>
        <Button variant="contained" startIcon={<CloudUpload />}>
          Choose Image
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Supports: JPG, PNG, GIF (Max 10MB)
        </Typography>
        <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} />
      </UploadAreaContainer>
    </Box>
  );
};

export default UploadArea;
