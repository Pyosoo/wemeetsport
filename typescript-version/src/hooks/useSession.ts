import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/apis/userApi';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface atInterface {
  mobile: string;
  exp: string;
  iat: string;
  nickName: string;
  email: string;
}

const useSession = () => {
  const router = useRouter();
  const at = Cookies.get('WMS_accessToken');
  const rt = Cookies.get('WMS_refreshToken');

  useEffect(() => {
    try {
      if (!at || !rt) {
        router.push('/login');
      }
      if (at && rt) {
        const atDecoded: atInterface = jwtDecode(at);
        const cur = new Date().getTime();
        const sessionExpTime = parseInt(atDecoded.exp + '000');

        const refreshSession = async () => {
          const res = await refreshToken(at, rt);
          if (res && res.success) {
            Cookies.set('WMS_accessToken', res.data.accessToken);
            Cookies.set('WMS_refreshToken', res.data.refreshToken);
          } else {
            Cookies.remove('WMS_accessToken');
            Cookies.remove('WMS_refreshToken');
            router.push('/login');
          }
        };

        if (cur > sessionExpTime) {
          console.log('refreshToken!');
          refreshSession();
        } else {
          console.log('Token is alive.');
        }
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  }, [at, rt, router]);
};

export default useSession;
