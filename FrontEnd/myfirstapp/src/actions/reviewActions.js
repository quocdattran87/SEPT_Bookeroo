import axios from 'axios'

export const postReview = (newReview, history) => async dispatch => {
    try {
        await axios.post('http://ec2-54-79-242-119.ap-southeast-2.compute.amazonaws.com:8083/api/reviews/review', newReview)
        history.push('/user-orders')
    }
    catch (err){
        alert('Review user failed!')
        history.push('/')
    }
}

export const getAllReviews = (history) => async dispatch => {
    try{
        const res = await axios.get('http://ec2-54-79-242-119.ap-southeast-2.compute.amazonaws.com:8083/api/reviews')
        localStorage.setItem('reviews', JSON.stringify(res.data))
        history.push('/all-reviews')
    }
    catch (err){
        alert('Get all reviews failed!')
        history.push('/')
    }
}