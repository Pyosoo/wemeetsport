import Head from 'next/head';
import { Router } from 'next/router';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import themeConfig from 'src/configs/themeConfig';
import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../styles/globals.css';

import { RecoilRoot } from 'recoil';
import CustomSnackbar from 'src/components/snackbar';
import CustomModal from 'src/components/customModal';
import CustomModal2 from 'src/components/customModal2';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>);

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>we meet sport</title>
        </Head>

        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  {getLayout(<Component {...pageProps} />)}
                  <CustomSnackbar />
                  <CustomModal />
                  <CustomModal2 />
                </ThemeComponent>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default App;
