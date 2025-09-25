import React from 'react';
import { Box, Typography, Button, TextField, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Download, Refresh, AspectRatio, PhotoSizeSelectLarge } from '@mui/icons-material';
import { track } from '@vercel/analytics';

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

interface ResizeControlsProps {
  resizeSettings: ResizeSettings;
  originalDimensions: { width: number; height: number } | null;
  resizedImage: string | null;
  isProcessing: boolean;
  onResizeSettingsChange: (settings: Partial<ResizeSettings>) => void;
  onResize: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const ControlsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

const PresetButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1),
}));

const presetSizes = [
  { label: '1920×1080', width: 1920, height: 1080 },
  { label: '1280×720', width: 1280, height: 720 },
  { label: '800×600', width: 800, height: 600 },
  { label: '640×480', width: 640, height: 480 },
  { label: '320×240', width: 320, height: 240 },
];

const ResizeControls: React.FC<ResizeControlsProps> = ({ resizeSettings, originalDimensions, resizedImage, isProcessing, onResizeSettingsChange, onResize, onDownload, onReset }) => {
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value) || 0;
    track('Resize Width Change', {
      newWidth: width,
      location: 'resize_controls',
    });
    onResizeSettingsChange({ width });
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(event.target.value) || 0;
    track('Resize Height Change', {
      newHeight: height,
      location: 'resize_controls',
    });
    onResizeSettingsChange({ height });
  };

  const handleAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    track('Resize Aspect Ratio Toggle', {
      maintainAspectRatio: event.target.checked,
      location: 'resize_controls',
    });
    onResizeSettingsChange({ maintainAspectRatio: event.target.checked });
  };

  const handlePresetSize = (width: number, height: number, label: string) => {
    track('Resize Preset Size Click', {
      presetLabel: label,
      width: width,
      height: height,
      location: 'resize_controls',
    });
    onResizeSettingsChange({ width, height });
  };

  const handleRestoreOriginal = () => {
    if (originalDimensions) {
      track('Resize Restore Original', {
        originalWidth: originalDimensions.width,
        originalHeight: originalDimensions.height,
        location: 'resize_controls',
      });
      onResizeSettingsChange({
        width: originalDimensions.width,
        height: originalDimensions.height,
      });
    }
  };

  return (
    <ControlsContainer>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
        Resize Settings
      </Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} mb={3}>
        {/* Dimensions */}
        <Box flex={1}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Dimensions
          </Typography>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <TextField label="Width" type="number" value={resizeSettings.width} onChange={handleWidthChange} size="small" InputProps={{ inputProps: { min: 1, max: 5000 } }} sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
              ×
            </Typography>
            <TextField label="Height" type="number" value={resizeSettings.height} onChange={handleHeightChange} size="small" InputProps={{ inputProps: { min: 1, max: 5000 } }} sx={{ flex: 1 }} />
          </Box>
          <FormControlLabel
            control={<Checkbox checked={resizeSettings.maintainAspectRatio} onChange={handleAspectRatioChange} icon={<AspectRatio />} checkedIcon={<AspectRatio color="primary" />} />}
            label="Maintain aspect ratio"
          />
        </Box>

        {/* Preset Sizes */}
        <Box flex={1}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Preset Sizes
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {presetSizes.map(preset => (
              <PresetButton key={preset.label} variant="outlined" size="small" onClick={() => handlePresetSize(preset.width, preset.height, preset.label)} startIcon={<PhotoSizeSelectLarge />}>
                {preset.label}
              </PresetButton>
            ))}
          </Box>
          {originalDimensions && (
            <Tooltip title="Restore original dimensions">
              <Button variant="outlined" size="small" onClick={handleRestoreOriginal} startIcon={<Refresh />}>
                Original ({originalDimensions.width}×{originalDimensions.height})
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
        <Button
          variant="contained"
          onClick={() => {
            track('Resize Image Button Click', {
              width: resizeSettings.width,
              height: resizeSettings.height,
              maintainAspectRatio: resizeSettings.maintainAspectRatio,
              isProcessing: isProcessing,
              location: 'resize_controls',
            });
            onResize();
          }}
          disabled={isProcessing}
          size="large"
          sx={{ minWidth: 120 }}
        >
          {isProcessing ? 'Resizing...' : 'Resize Image'}
        </Button>

        {resizedImage && (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              track('Resize Download Button Click', {
                width: resizeSettings.width,
                height: resizeSettings.height,
                location: 'resize_controls',
              });
              onDownload();
            }}
            startIcon={<Download />}
            size="large"
            sx={{ minWidth: 120 }}
          >
            Download
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => {
            track('Resize Reset Button Click', {
              location: 'resize_controls',
            });
            onReset();
          }}
          startIcon={<Refresh />}
          size="large"
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>
    </ControlsContainer>
  );
};

export default ResizeControls;
