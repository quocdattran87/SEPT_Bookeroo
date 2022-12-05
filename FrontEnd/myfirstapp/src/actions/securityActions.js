import axios from 'axios'
import {LOGIN_ERROR, USER_EXISTS_ERROR, EMAIL_EXISTS_ERROR, SET_CURRENT_USER} from './types'
import setJWTToken from '../securityUtils/setJWTToken'
import jwt_decode from 'jwt-decode'


export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post('http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/register', newUser)
        history.push('/login')
        if (newUser.accountType === 'Regular') {
            alert('Account created! Please log in.')
        } else if (newUser.accountType === 'Publisher') {
            alert('Account created. Please wait to be verified by an admin.')
        }
    } 
    catch (err) {
        if (err.response.status === 400) {
            dispatch({
                type: EMAIL_EXISTS_ERROR,
                payload: err.response.data.username
            })
        }
        if (err.response.status === 406) {
            dispatch({
                type: USER_EXISTS_ERROR,
                payload: err.response.data.username
            })
        }
        history.push('/')
        history.push('/signup')
    }
}

export const login = (LoginRequest, history) => async dispatch => {
    try {
        const res = await axios.post('http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/login', LoginRequest)
        const { token } = res.data;
        const decoded = jwt_decode(token)

        if (decoded.isActive === false) {
            throw new Error('Awaiting Approval')
        } else {
            localStorage.setItem('jwtToken', token)
            setJWTToken(token); 
            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            })
            history.push('/')
        }
    }
    catch (err)
    {
        if (typeof err.response === 'undefined') {
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Account is awaiting approval by admin'
            })
        } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Invalid username and password combination'
            })
        }
        history.push('/')
        history.push('/login')
    }

}

export const logout = (history) => dispatch => {
    localStorage.removeItem('jwtToken')
    setJWTToken(false)
    dispatch({
        type: SET_CURRENT_USER,
        payload: null
    })
    history.push('/')
}

export const createNewBook = (newBook, history) => async dispatch => {
    try {
        await axios.post('http://ec2-13-55-218-209.ap-southeast-2.compute.amazonaws.com:8080/api/books/sell', newBook)
        history.push('/')
        alert('Book listed!')
    } 
    catch (err){
        history.push('/')
        alert('Failed to list book!')
    }
}