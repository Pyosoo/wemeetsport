// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp';

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig';

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types';

// ** Components
import AppBar from './components/vertical/appBar';
import Navigation from './components/vertical/navigation';
import ScrollToTop from 'src/@core/components/scroll-to-top';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
});

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  overflow: 'auto', // 이 부분을 추가하여 스크롤이 생기도록 설정합니다.
  backgroundColor: '#fbfbfb',
  borderRadius: '5px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { settings, children, scrollToTop } = props;

  // ** Vars
  const { contentWidth } = settings;
  const navWidth = themeConfig.navigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        {/* Navigation Menu */}
        <Navigation
          navWidth={navWidth}
          navVisible={navVisible}
          setNavVisible={setNavVisible}
          toggleNavVisibility={toggleNavVisibility}
          {...props}
        />
        <MainContentWrapper className='layout-content-wrapper'>
          {/* AppBar Component */}
          <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

          {/* Content */}
          <ContentWrapper
            className='layout-page-content'
            style={{
              backgroundColor: '#fbfbfb',
              borderRadius: '5px'
            }}
            sx={{
              ...(contentWidth === 'boxed' && {
                mx: 'auto',

                maxWidth: '95%'
                // '@media (min-width:1440px)': { maxWidth: 1440 },
                // '@media (min-width:1200px)': { maxWidth: '95%' }
              })
            }}
          >
            {children}
          </ContentWrapper>

          {/* Portal for React Datepicker */}
          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id='react-datepicker-portal'></Box>
          </DatePickerWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  );
};

export default VerticalLayout;
