import axios from 'axios'
import { GET_USERS, GET_USER, EMAIL_EXISTS_ERROR, SET_CURRENT_USER } from './types'


export const getUsers = (history, to) => async dispatch => {
    try {
        const res = await axios.get('http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users')
        localStorage.setItem('users', JSON.stringify(res.data))
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
        if (to === 'toPending') {
            history.push('/pending')
        } else if (to === 'toAllUsers') {
            history.push('/allUsers')
        }
    } catch (error) {
        alert('Failed to get all users')
    }
}

export const getUser = (id, history) => async dispatch => {
    try {
      const res = await axios.get(`http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/${id}`)
      dispatch({
          type: GET_USER,
          payload: res.data
      });

    } catch (error) {
        alert('Failed to get user')
        history.push('/')
    }
}

export const getSeller = (username, history) => async dispatch => {
    try {
        const res = await axios.get(`http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/seller/${username}`)
        localStorage.setItem('seller', JSON.stringify(res.data))
        const res2 = await axios.get(`http://ec2-54-79-242-119.ap-southeast-2.compute.amazonaws.com:8083/api/reviews/user/${username}`)
        localStorage.setItem('userReviews', JSON.stringify(res2.data))
        history.push('/seller')
    } catch (error) {
        alert('Failed to get seller')
        history.push('/')
    }
}

export const deleteUser = (id) => async dispatch => {
    try {
        await axios.delete(`http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/${id}`)
    } catch (error) {
        alert('Failed to delete user')
        alert(error)
    }
}

export const approveUser = (id) => async dispatch => {
  try {
      await axios.put(`http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/approve/${id}`)
  } catch (error) {
    alert('Approve error')
  }
}

export const editUser = (id,user,history) => async dispatch => {
    try {
        const res = await axios.put(`http://ec2-13-210-248-68.ap-southeast-2.compute.amazonaws.com:8081/api/users/${id}`, null, { params: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            abn: user.abn,
            about: user.about,
            image: user.image
        }})
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
      
        history.push('/dashboard')
    } catch (error) {
      if (error.response.status === 400) {
          dispatch({
              type: EMAIL_EXISTS_ERROR,
              payload: error.response.data.username
          })
      } else {
          alert('Failed to save profile')
      }
      history.push('/')
      history.push('/edit')
    }
}
