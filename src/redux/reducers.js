import { combineReducers } from 'redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import system from './ducks/system'

export default combineReducers({
  modal,
  system,
  auth
})
