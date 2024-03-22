import { useEffect } from 'react'
import { nameState } from 'src/recoil/stats'
import { useRecoilState } from 'recoil'
import useSession from 'src/hooks/useSession'

const Dashboard = () => {
  const session = useSession()

  const [name, setNameState] = useRecoilState(nameState)

  useEffect(() => {
    console.log(name)
  }, [])

  return <div>index.tsx</div>
}

export default Dashboard
