// ** MUI Imports
import Box from '@mui/material/Box';
import { Settings } from 'src/@core/context/settingsContext';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown';
import { useRecoilState } from 'recoil';
import { sessionState } from 'src/recoil/user';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { settings, saveSettings } = props;
  const [session, setSessionState] = useRecoilState(sessionState);
  console.log(session);

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <span>{session.nickName}</span>님
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
