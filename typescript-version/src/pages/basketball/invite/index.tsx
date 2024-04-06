// ** MUI Imports
import Grid from '@mui/material/Grid'
import CustomSearchBar from 'src/components/customSearchBar'
import CustomTable from 'src/components/customTable'
import useSession from 'src/hooks/useSession'

const Invite = () => {
  const session = useSession()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <CustomSearchBar category='basketball' type='invite' />
        </div>
        <CustomTable />
      </Grid>
    </Grid>
  )
}

export default Invite
