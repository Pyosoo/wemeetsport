// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, useEffect } from 'react';

// ** Next Imports
import Link from 'next/link';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// ** Icons Imports
import Google from 'mdi-material-ui/Google';
import Github from 'mdi-material-ui/Github';
import Twitter from 'mdi-material-ui/Twitter';
import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import { useRecoilState } from 'recoil';
import { registerInfoState } from 'src/recoil/user';
import { useRecoilLogger } from 'src/hooks/useRecoilLogger';
import { signUpApi } from 'src/apis/userApi';
import { snackbarState } from 'src/recoil/states';
import router from 'next/router';

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });
  const [registerInfo, setRegisterInfoState] = useRecoilState(registerInfoState);
  const [snackbar, setSnackbarState] = useRecoilState(snackbarState);

  // ** Hook
  const theme = useTheme();

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChangeRegisterInfo = (key: string, val: string) => {
    setRegisterInfoState(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const signUp = async () => {
    const phoneNumberRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    console.log(phoneNumberRegex.test(registerInfo.mobile));
    if (!phoneNumberRegex.test(registerInfo.mobile)) {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '모바일 정보를 확인해주세요.',
        type: 'error'
      }));
      return;
    }

    const res = await signUpApi({
      email: registerInfo.email,
      password: registerInfo.password,
      nickName: registerInfo.nickName,
      mobile: registerInfo.mobile
    });
    if (res && res.success) {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '회원가입에 성공하였습니다. 로그인해주세요.',
        type: 'success'
      }));
      router.push('/login');
    } else {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '로그인에 실패했습니다.',
        type: 'error'
      }));
    }
  };
  useRecoilLogger();

  useEffect(() => {
    return () => {
      setRegisterInfoState(prev => ({
        email: '',
        password: '',
        nickName: '',
        mobile: ''
      }));
    };
  }, []);

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              회원 가입
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              WE MEET SPORT
            </Typography>
            <Typography variant='body2'>회원가입 후 많은 동호인들을 만나보세요!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='nickName'
              sx={{ marginBottom: 4 }}
              value={registerInfo.nickName}
              onChange={e => handleChangeRegisterInfo('nickName', e.target.value)}
            />
            <TextField
              fullWidth
              type='obile'
              label='Mobile'
              sx={{ marginBottom: 4 }}
              value={registerInfo.mobile}
              onChange={e => handleChangeRegisterInfo('mobile', e.target.value)}
            />
            <TextField
              fullWidth
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={registerInfo.email}
              onChange={e => handleChangeRegisterInfo('email', e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={registerInfo.password}
                onChange={e => handleChangeRegisterInfo('password', e.target.value)}
                id='auth-register-password'
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </Link>
                </Fragment>
              }
            /> */}
            <Button
              onClick={signUp}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7, marginTop: 10 }}
            >
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/login'>
                  <LinkStyled>Log In</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default RegisterPage;
