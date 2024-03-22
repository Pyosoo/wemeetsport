// useSession.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { sessionState } from 'src/recoil/user'

const useSession = () => {
  const router = useRouter()
  const session = useRecoilValue(sessionState)

  useEffect(() => {
    if (!session.state) {
      router.push('/login') // 세션 만료시 로그인 페이지로 이동
    }
  }, [session.state, router])

  return session
}

export default useSession
