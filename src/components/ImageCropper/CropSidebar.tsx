import React from 'react';
import { Box, Typography, Button, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Download, CheckCircle } from '@mui/icons-material';
import { track } from '@vercel/analytics';

interface PlatformPreset {
  label: string;
  ratio: number | null;
}

interface CropSidebarProps {
  aspectRatio: number | null;
  onAspectRatioChange: (aspectRatio: number | null) => void;
  onDownload: () => void;
  onReset: () => void;
  canDownload: boolean;
  platformPresets?: Record<string, PlatformPreset>;
}

const RatioTile = styled(ButtonBase)(({ theme }) => ({
  width: 88,
  height: 88,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  position: 'relative',
  '&:hover': {
    borderColor: theme.palette.text.disabled,
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
}));

const CropSidebar: React.FC<CropSidebarProps> = ({ aspectRatio, onAspectRatioChange, onDownload, onReset, canDownload, platformPresets }) => {
  const defaultRatios = [
    { label: 'Landscape', value: 16 / 9, sub: '16:9' },
    { label: 'Portrait', value: 9 / 16, sub: '9:16' },
    { label: 'Square', value: 1, sub: '1:1' },
    { label: 'Freeform', value: null as number | null, sub: '' },
  ];

  const ratios = platformPresets
    ? Object.values(platformPresets).map(preset => ({
        label: preset.label.split('(')[0].trim(),
        value: preset.ratio,
        sub: preset.label.includes('(') ? preset.label.match(/\(([^)]+)\)/)?.[1] || '' : '',
      }))
    : defaultRatios;

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
        Aspect ratio
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {ratios.map(item => {
          const isActive = item.value === aspectRatio;
          return (
            <Box key={item.label} sx={{ textAlign: 'center' }}>
              <RatioTile
                onClick={() => {
                  track('Aspect Ratio Change', {
                    previousRatio: aspectRatio,
                    newRatio: item.value,
                    ratioLabel: item.label,
                    ratioSub: item.sub,
                    location: 'crop_sidebar',
                  });
                  onAspectRatioChange(item.value);
                }}
                sx={{
                  outline: 'none',
                  border: isActive ? '2px solid transparent' : undefined,
                  backgroundImage: isActive ? 'linear-gradient(#ffffff,#ffffff), linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' : undefined,
                  backgroundOrigin: isActive ? 'border-box' : undefined,
                  backgroundClip: isActive ? 'padding-box, border-box' : undefined,
                  boxShadow: isActive ? `0 4px 14px rgba(0,0,0,0.08)` : '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                {/* Simple box to visually hint orientation */}
                <Box sx={{ width: 44, height: 44, borderRadius: 1, border: '2px solid', borderColor: isActive ? 'primary.main' : 'divider', aspectRatio: item.value ? `${item.value}` : undefined }} />
              </RatioTile>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                {item.sub || item.label}
              </Typography>
              {item.sub && (
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => {
            track('Download Button Click', {
              aspectRatio: aspectRatio,
              canDownload: canDownload,
              location: 'crop_sidebar',
            });
            onDownload();
          }}
          disabled={!canDownload}
          sx={{
            minWidth: 190,
            borderRadius: 999,
            px: { xs: 2.5, md: 3.5 },
            py: 1.25,
            fontWeight: 800,
            textTransform: 'none',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
            '&:hover': { backgroundColor: 'primary.dark', boxShadow: '0 10px 28px rgba(0,0,0,0.14)' },
          }}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            track('Reset Button Click', {
              aspectRatio: aspectRatio,
              location: 'crop_sidebar',
            });
            onReset();
          }}
          sx={{
            borderRadius: 999,
            px: { xs: 2.5, md: 3 },
            py: 1.15,
            fontWeight: 800,
            textTransform: 'none',
            borderColor: 'divider',
            color: 'primary.contrastText',
            backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
            '&:hover': { borderColor: 'text.disabled', backgroundColor: 'action.hover' },
          }}
        >
          New Image
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
          <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>Free to use</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
          <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>No credit card required</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CropSidebar;
