// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react';

// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import { useRecoilState } from 'recoil';
import { sessionState, loginState } from 'src/recoil/user';
import { useRecoilLogger } from 'src/hooks/useRecoilLogger';
import { loginApi } from 'src/apis/userApi';
import { jwtDecode } from 'jwt-decode';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const LoginPage = () => {
  // ** State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);

  const [session, setSessionState] = useRecoilState(sessionState);
  const [loginInfo, setLoginState] = useRecoilState(loginState);

  // ** Hook
  const router = useRouter();

  useRecoilLogger();

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  interface sessionInterface {
    state: boolean;
    email: string;
    nickName: string;
    mobile: string;
    exp: string;
    iat: string;
    accessToken: string;
    refreshToken: string;
  }

  const handleLogIn = async () => {
    const res = await loginApi(loginInfo.email, loginInfo.password);
    if (res && res.success) {
      const resData: sessionInterface = jwtDecode(res.data.accessToken);
      setSessionState(prev => ({
        ...prev,
        state: true,
        email: resData.email,
        nickName: resData.nickName,
        mobile: resData.mobile,
        exp: resData.exp,
        iat: resData.iat,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      }));
      router.push('/');
    } else {
      console.log(res);
    }
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          logo
          <Box sx={{ mb: 6 }}>
            <Typography
              variant='h5'
              sx={{ fontWeight: 600, marginBottom: 1.5, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              WE MEET SPORT
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              value={loginInfo.email}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                setLoginState(prev => ({
                  ...prev,
                  email: event.target.value
                }))
              }
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                id='auth-login-password'
                label='Password'
                value={loginInfo.password}
                onKeyDown={event => {
                  if (event.key === 'Enter') handleLogIn();
                }}
                onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  setLoginState(prev => ({
                    ...prev,
                    password: event.target.value
                  }))
                }
                type={passwordHide ? 'password' : 'text'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setPasswordHide(!passwordHide)}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {passwordHide ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              {/* <FormControlLabel control={<Checkbox />} label='Remember Me' /> */}
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleLogIn}>
              로그인
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                회원이 아니신가요?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  <LinkStyled>회원가입</LinkStyled>
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

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
