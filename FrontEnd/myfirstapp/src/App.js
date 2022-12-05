import './App.css'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import HomePage from './components/Layout/HomePage'
import LogInPage from './components/UserManagement/LogIn/LogInPage'
import SignUpPage from './components/UserManagement/SignUp/SignUpPage'
import SearchedBooks from './components/BookManagement/SearchedBooks'
import ProfilePage from './components/UserManagement/Profile/ProfilePage'
import SellerProfile from './components/UserManagement/Profile/SellerProfile'

import jwt_decode from 'jwt-decode'
import setJWTToken from './securityUtils/setJWTToken'
import { SET_CURRENT_USER } from './actions/types'
import { logout } from './actions/securityActions'
import SingleBook from './components/BookManagement/SingleBook'
import PaymentSuccess from './components/PaymentManagement/PaymentSuccess'
import CreateBook from './components/BookManagement/CreateBook'
import PendingAccounts from './components/UserManagement/Profile/Admin/PendingAccounts'
import AllAccounts from './components/UserManagement/Profile/Admin/AllAccounts'
import UserOrders from './components/UserManagement/Profile/User/UserOrders'
import Edit from './components/UserManagement/Profile/Edit'
import About from './components/Layout/About'
import AllTransactions from './components/UserManagement/Profile/Admin/AllTransactions'
import AllBooks from './components/UserManagement/Profile/Admin/AllBooks'
import ReviewUser from './components/UserManagement/Profile/User/ReviewUser'
import ReviewBook from './components/UserManagement/Profile/User/ReviewBook'
import AllReviews from './components/UserManagement/Profile/Admin/AllReviews'


const jwtToken = localStorage.jwtToken

if (jwtToken){
  setJWTToken(jwtToken);  
  const decoded_jwtToken = jwt_decode(jwtToken)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  })

  const currentTime = Date.now() / 1000
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout)
    // window.location.href = '/'
  }
}

class App extends Component {

  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
            <div className='App'>
              {
                //Public Routes//
              }
            
              <Route exact path='/' component={HomePage} />
              <Route exact path='/search' component={SearchedBooks} />
              <Route exact path='/book' component={SingleBook} />
              <Route exact path='/seller' component={SellerProfile} />
              <Route exact path='/about' component={About} />
              <Route exact path='/signup' component={SignUpPage} />
              <Route exact path='/login' component={LogInPage} />

              {
                //Private Routes
              }
              <Route exact path='/dashboard' component={ProfilePage} />
              <Route exact path='/edit' component={Edit} />
              <Route exact path='/sell' component={CreateBook} />
              <Route exact path='/payment-success' component={PaymentSuccess} />
              <Route exact path='/pending' component={PendingAccounts} />
              <Route exact path='/allUsers' component={AllAccounts} />
              <Route exact path='/user-orders' component={UserOrders} />
              <Route exact path='/all-orders' component={AllTransactions} />
              <Route exact path='/all-books' component={AllBooks} />
              <Route exact path='/all-reviews' component={AllReviews} />
              <Route exact path='/review-user' component={ReviewUser} />
              <Route exact path='/review-book' component={ReviewBook} />

            </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App