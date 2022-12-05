import axios from 'axios'
import { GET_USER_ORDERS } from './types'

export const createNewOrder = (newOrder, history) => async dispatch => {
    try {
        await axios.post('http://ec2-13-210-206-21.ap-southeast-2.compute.amazonaws.com:8082/api/orders/createOrder', newOrder)
        history.push('/payment-success')
    }
    catch (err){
        alert('Create Order failed!')
        history.push('/')
    }
}

export const getAllOrders = (history) => async dispatch => {
    try {
        const res = await axios.get('http://ec2-13-210-206-21.ap-southeast-2.compute.amazonaws.com:8082/api/orders')
        localStorage.setItem('allOrders', JSON.stringify(res.data))
        history.push('/all-orders')
    } catch (error){
        alert('Failed to get orders')
    }
}

export const getUserOrders = (username, history) => async dispatch => {
    try {
        const res = await axios.post('http://ec2-13-210-206-21.ap-southeast-2.compute.amazonaws.com:8082/api/orders/userOrders', username)
        localStorage.setItem('orders', JSON.stringify(res.data))
        dispatch({
          type: GET_USER_ORDERS,
          payload: res.data
        })
        history.push('/user-orders')
  
    } catch (error){
        alert('Failed to get orders')
        history.push('/')
    }
}

export const orderUpdate = (orderId, status, history) => async dispatch => {
  try {
      const res = await axios.put(`http://ec2-13-210-206-21.ap-southeast-2.compute.amazonaws.com:8082/api/orders/${status}/${orderId}`)
      localStorage.setItem("orders", JSON.stringify(res.data))
      dispatch({
          type: GET_USER_ORDERS,
          payload: res.data
      });
      history.push('/')
      history.push('/user-orders')
  } catch (error){
      alert('Error updating order')
  }
}