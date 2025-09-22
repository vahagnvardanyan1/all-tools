import React from 'react';
import { Box, Typography, Button, Slider, FormControl, InputLabel, Select, MenuItem, IconButton, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Download, RotateLeft, RotateRight } from '@mui/icons-material';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropControlsProps {
  zoom: number;
  rotation: number;
  aspectRatio: number | null;
  croppedAreaPixels: CropArea | null;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onAspectRatioChange: (aspectRatio: number | null) => void;
  onDownload: () => void;
  onReset: () => void;
}

const ControlsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
}));

const aspectRatios = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
];

const CropControls: React.FC<CropControlsProps> = ({ zoom, rotation, aspectRatio, croppedAreaPixels, onZoomChange, onRotationChange, onAspectRatioChange, onDownload, onReset }) => {
  const handleAspectRatioChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onAspectRatioChange(value === '' ? null : parseFloat(value));
  };

  const handleRotationDecrease = () => {
    onRotationChange(rotation - 90);
  };

  const handleRotationIncrease = () => {
    onRotationChange(rotation + 90);
  };

  return (
    <ControlsContainer>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} alignItems="center">
        <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Typography gutterBottom>Zoom</Typography>
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, value) => onZoomChange(value as number)} />
        </Box>

        <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Typography gutterBottom>Rotation</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handleRotationDecrease}>
              <RotateLeft />
            </IconButton>
            <Slider value={rotation} min={-180} max={180} step={1} onChange={(_, value) => onRotationChange(value as number)} sx={{ mx: 1 }} />
            <IconButton onClick={handleRotationIncrease}>
              <RotateRight />
            </IconButton>
          </Box>
        </Box>

        <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' }, minWidth: { xs: '200px', md: 'auto' } }}>
          <FormControl fullWidth sx={{ minHeight: { xs: '56px', md: 'auto' } }}>
            <InputLabel sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>Aspect Ratio</InputLabel>
            <Select
              value={aspectRatio?.toString() || ''}
              label="Aspect Ratio"
              onChange={handleAspectRatioChange}
              sx={{
                height: { xs: '56px', md: 'auto' },
                fontSize: { xs: '1rem', md: '0.875rem' },
              }}
            >
              {aspectRatios.map(ratio => (
                <MenuItem key={ratio.label} value={ratio.value?.toString() || ''}>
                  {ratio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" gap={1} sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Button variant="contained" startIcon={<Download />} onClick={onDownload} disabled={!croppedAreaPixels}>
            Download
          </Button>
          <Button variant="outlined" onClick={onReset}>
            New Image
          </Button>
        </Box>
      </Box>
    </ControlsContainer>
  );
};

export default CropControls;
