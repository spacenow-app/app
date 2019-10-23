import { combineReducers } from 'redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import account from './ducks/account'
import system from './ducks/system'
import location from './ducks/location'
import category from './ducks/category'
import listing from './ducks/listing'
import photo from './ducks/photo'
import integration from './ducks/integration'
import payment from './ducks/payment'
import mail from './ducks/mail'
import landing from './ducks/landing'
import search from './ducks/search'
import booking from './ducks/booking'
import message from './ducks/message'
import reviews from './ducks/reviews'

export default combineReducers({
  modal,
  system,
  auth,
  location,
  category,
  listing,
  photo,
  integration,
  payment,
  mail,
  landing,
  account,
  search,
  booking,
  message,
  reviews
})
