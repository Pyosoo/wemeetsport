import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useSession from 'src/hooks/useSession';

const Dashboard = () => {
  const session = useSession();

  useEffect(() => {
    console.log('main /');
  }, []);

  return <div>index.tsx</div>;
};

export default Dashboard;
