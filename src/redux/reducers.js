import { combineReducers } from 'redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import system from './ducks/system'
import location from './ducks/location'

export default combineReducers({
  modal,
  system,
  auth,
  location
})
