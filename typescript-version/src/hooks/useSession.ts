// useSession.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sessionState } from 'src/recoil/user'
import { refreshToken } from 'src/apis/userApi'

const useSession = () => {
  const router = useRouter()
  const [session, setSessionState] = useRecoilState(sessionState)

  useEffect(() => {
    let cur = new Date().getTime()
    const sessionExpTime = parseInt(session.exp + '000')

    const refreshSession = async () => {
      const res = await refreshToken(session.accessToken, session.refreshToken)
      if (res && res.success) {
        setSessionState(prev => ({
          ...prev,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        }))
      } else {
        // Handle error or invalid response
      }
    }

    if (cur > sessionExpTime) {
      refreshSession()
    }

    // const res = refreshToken(session.accessToken, session.refreshToken)
    // if (
    //   res
    //   // && res.success
    // ) {
    //   setSessionState(prev => ({
    //     ...prev,
    //     accessToken: res.accessToken,
    //     refreshToken: res.refreshToken
    //   }))
    // }

    // }

    // if (!session.state) {
    //   router.push('/login') // 세션 만료시 로그인 페이지로 이동
    // }
  }, [session.state, router])

  return session
}

export default useSession
