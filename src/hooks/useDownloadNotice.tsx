'use client';

import React, { useCallback, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type UseDownloadNoticeReturn = {
  showDownloaded: (fileName?: string) => void;
  DownloadNotice: React.ReactNode;
};

export function useDownloadNotice(): UseDownloadNoticeReturn {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showDownloaded = useCallback((fileName = 'image.jpg') => {
    const isiOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const msg = isiOS ? 'Downloaded. Open Files → Downloads to find it. To add to Photos: open file, Share → Save Image.' : `Downloaded as '${fileName}' (check your Downloads folder).`;
    setMessage(msg);
    setOpen(true);
  }, []);

  const DownloadNotice = (
    <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showDownloaded, DownloadNotice };
}
