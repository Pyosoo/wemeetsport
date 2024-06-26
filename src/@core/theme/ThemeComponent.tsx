import { ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

import { Settings } from 'src/@core/context/settingsContext';

import themeConfig from 'src/configs/themeConfig';

import overrides from './overrides';
import typography from './typography';

import themeOptions from './ThemeOptions';

import GlobalStyling from './globalStyles';

interface Props {
  settings: Settings;
  children: ReactNode;
}

const ThemeComponent = (props: Props) => {
  const { settings, children } = props;
  const coreThemeConfig = themeOptions(settings);
  let theme = createTheme(coreThemeConfig);
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) }
  });

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme) as any} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
