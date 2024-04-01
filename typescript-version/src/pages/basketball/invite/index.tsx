// ** MUI Imports
import Grid from '@mui/material/Grid'
import useSession from 'src/hooks/useSession'

const Invite = () => {
  const session = useSession()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        invite page
      </Grid>
    </Grid>
  )
}

export default Invite
