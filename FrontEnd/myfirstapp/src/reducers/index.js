import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import securityReducer from './securityReducer'
import orderReducer from './orderReducer'


const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer,
  security: securityReducer,
  orders: orderReducer
})

export default rootReducer
