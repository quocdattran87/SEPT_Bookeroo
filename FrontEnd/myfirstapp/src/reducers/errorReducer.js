import { EMAIL_EXISTS_ERROR, LOGIN_ERROR, USER_EXISTS_ERROR } from '../actions/types'

const initialState = {
  usernameError: '',
  emailError: '',
  loginError: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_EXISTS_ERROR:
      state.usernameError = action.payload
      return state
    case EMAIL_EXISTS_ERROR:
      state.emailError = action.payload
      return state
    case LOGIN_ERROR:
      state.loginError = action.payload
      return state
    default:
      return state
  }
}
