import React, { ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const AppRouterCacheProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};

export default AppRouterCacheProviderWrapper;
