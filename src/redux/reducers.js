import { combineReducers } from 'redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import system from './ducks/system'
import location from './ducks/location'
import category from './ducks/category'
import listing from './ducks/listing'
import photo from './ducks/photo'
import partner from './ducks/partner'
import payment from './ducks/payment'

export default combineReducers({
  modal,
  system,
  auth,
  location,
  category,
  listing,
  photo,
  partner,
  payment
})
