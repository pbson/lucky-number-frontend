import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import { theme } from '../theme/index';
import '../../styles/globals.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider } from 'react-redux'

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const desiredChainId = 80001;

  return (
    <CacheProvider value={emotionCache}>
      <ThirdwebProvider desiredChainId={desiredChainId}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
      </ThirdwebProvider>
    </CacheProvider>
  );
};

export default MyApp;