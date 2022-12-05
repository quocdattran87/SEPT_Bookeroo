import axios from 'axios'

export const queryBooks = (query, history) => async dispatch => {
    try {
        const res = await axios.post('http://ec2-13-55-218-209.ap-southeast-2.compute.amazonaws.com:8080/api/books/search', query)
        localStorage.setItem('books', JSON.stringify(res.data))
        localStorage.setItem('query', query.query)
        history.push('/')
        history.push('/search')
    } 
    catch (err){
        alert('Search error')
        history.push('/')
    }
};

export const getAllBooks = (history) => async dispatch => {
    try {
        const res = await axios.get('http://ec2-13-55-218-209.ap-southeast-2.compute.amazonaws.com:8080/api/books')
        localStorage.setItem('books', JSON.stringify(res.data))
        history.push('/all-books')
    } 
    catch (err){
        alert('Failed to get single book')
        history.push('/')
    }
};

export const getBook = (bookID, history) => async dispatch => {
    try {
        const res = await axios.get(`http://ec2-13-55-218-209.ap-southeast-2.compute.amazonaws.com:8080/api/books/${bookID}`)
        localStorage.setItem('book', JSON.stringify(res.data))
        const res2 = await axios.get(`http://ec2-54-79-242-119.ap-southeast-2.compute.amazonaws.com:8083/api/reviews/book/${bookID}`)
        localStorage.setItem('bookReviews', JSON.stringify(res2.data))
        history.push('/book')
    } 
    catch (err){
        alert('Failed to get single book')
        history.push('/')
    }
};