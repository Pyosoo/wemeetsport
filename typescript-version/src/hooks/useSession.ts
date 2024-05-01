import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/apis/userApi';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRecoilValue } from 'recoil';
import { sessionState } from 'src/recoil/user';

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
  const session = useRecoilValue(sessionState);

  console.log(session);

  useEffect(() => {
    try {
      if (!at || !rt) {
        router.push('/login');
      }
      if(!session.accessToken || session.accessToken.length === 0){
        console.log('session state가 올바르지 않음')
        Cookies.remove('WMS_accessToken');
        Cookies.remove('WMS_refreshToken');
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
  }, [at, rt, router, session]); // Recoil 상태를 의존성으로 추가

  return session; // 이 부분은 필요에 따라 변경 가능합니다.
};

export default useSession;
