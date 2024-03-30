import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { sessionState, userState, registerInfoState, loginState } from 'src/recoil/user'

export function useRecoilLogger() {
  const session = useRecoilValue(sessionState)
  const user = useRecoilValue(userState)
  const registerInfo = useRecoilValue(registerInfoState)
  const loginInfo = useRecoilValue(loginState)

  useEffect(() => {
    console.log('Recoil State:', {
      session,
      user,
      registerInfo,
      loginInfo
    })
  }, [session, user, registerInfo])
}
