// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: '메인 화면',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: '계정 활동',
      icon: AccountCogOutline,
      path: '/account'
    },
    {
      sectionTitle: '농구'
    },
    {
      title: '시합 초청',
      icon: FormatLetterCase,
      path: '/basketball/invite'
    },
    {
      title: '팀원 모집',
      path: '/basketball/recruit',
      icon: GoogleCirclesExtended
    },
    {
      title: '대관 정보',
      icon: CreditCardOutline,
      path: '/basketball/rental'
    },
    {
      sectionTitle: '축구'
    },
    {
      title: '시합 초청',
      icon: FormatLetterCase,
      path: '/soccer/invite'
    },
    {
      title: '팀원 모집',
      path: '/soccer/recruit',
      icon: GoogleCirclesExtended
    },
    {
      title: '대관 정보',
      icon: CreditCardOutline,
      path: '/soccer/rental'
    }
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
