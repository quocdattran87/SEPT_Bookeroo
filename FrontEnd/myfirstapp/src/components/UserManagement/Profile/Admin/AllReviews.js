import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import Header from '../../../Layout/Header'
import moment from 'moment'


class AllReviews extends Component {
    constructor(props){
        super(props)
        this.state = {
            reviews : JSON.parse(localStorage.reviews)
        }
    }
    
    render(){
        return (
            <div>
                <Header/>
                <div className='container'>
                    <div className='card card-body bg-light mb-3'>
                        <div className='row'>
                            <div className='col-3'>
                                <img src={store.getState().security.user.image} alt=''/>
                                <ul className='list-group'>
                                    <Link to='/dashboard'>
                                        <br/>
                                        <li className='list-group-item board'>
                                            Back 
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className='col-lg-9 col-md-4 col-8'>
                                <div className='container'>    
                                <h4>All Reviews</h4>         
                                    <table className = 'table table-striped'>
                                    <thead>
                                        <tr>
                                            <td> User</td>
                                            <td> Book ID</td>
                                            <td> Score</td>
                                            <td> By</td>
                                            <td> Review</td>
                                            <td> Posted</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.reviews.map(
                                            review =>
                                            <tr key = {review.id}>
                                                <td> {review.userReviewed}</td>
                                                <td> {review.bookReviewedID}</td>
                                                <td> {review.score}</td>
                                                <td> {review.reviewer}</td>
                                                <td> {review.review}</td>
                                                <td> {moment(review.create_At).fromNow()}</td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                    </table>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default AllReviews