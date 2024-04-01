import { atom } from 'recoil'

const nameState = atom({
  key: 'nameState',
  default: ''
})

const snackbarState = atom({
  key: 'snackbarState',
  default: {
    open: false,
    message: ''
  }
})

export { nameState, snackbarState }
