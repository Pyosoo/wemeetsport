import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { sessionState, userState, registerInfoState } from 'src/recoil/user'

export function useRecoilLogger() {
  const session = useRecoilValue(sessionState)
  const user = useRecoilValue(userState)
  const registerInfo = useRecoilValue(registerInfoState)

  useEffect(() => {
    console.log('Recoil State:', {
      session,
      user,
      registerInfo
    })
  }, [session, user, registerInfo])
}
