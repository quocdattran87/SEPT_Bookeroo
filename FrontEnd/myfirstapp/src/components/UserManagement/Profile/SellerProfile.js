import React, { Component } from 'react'
import Header from '../../Layout/Header'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component'

class SellerProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            seller : JSON.parse(localStorage.seller),
            reviews : JSON.parse(localStorage.userReviews)
        }
    }

    render(){
        return(
            <div>
                <Header/>
                <div className='container'>
                    <div className='card card-body bg-light mb-3'>
                        <div className='row'>
                            <div className='col-3'>
                                <img src={this.state.seller.image} alt=''/>
                            </div>
                            <div className='col-lg-9 col-md9 col-9'>
                            <h4>{this.state.seller.username.charAt(0).toUpperCase() + this.state.seller.username.slice(1).toLowerCase()}</h4><hr/>
                            {
                                this.state.seller.firstName !== null && this.state.seller.firstName !== '' ?
                                <>{
                                    this.state.seller.lastName === null || this.state.seller.lastName === '' ?
                                    <p>Name: {this.state.seller.firstName.charAt(0).toUpperCase() + this.state.seller.firstName.slice(1)}</p> :
                                    <p>Name: {this.state.seller.firstName.charAt(0).toUpperCase() + this.state.seller.firstName.slice(1)} {this.state.seller.lastName.charAt(0).toUpperCase() + this.state.seller.lastName.slice(1).toLowerCase()}</p>
                                }</> : <>{
                                    this.state.seller.lastName !== null && this.state.seller.lastName !== '' ?
                                    <p>Name: {this.state.seller.lastName.charAt(0).toUpperCase() + this.state.seller.lastName.slice(1)}</p> : ''
                                }</>
                            }
                            <p>Email: {this.state.seller.email.toLowerCase()}</p>
                            {
                                this.state.seller.phone !== null && this.state.seller.phone !== '' ?
                                <p>Phone: {this.state.seller.phone}</p> : ''
                            }
                            {
                                this.state.seller.accountType === 'Publisher' ?
                                <>{
                                    this.state.seller.abn !== null && this.state.seller.abn !== '' ?
                                    <p>ABN: {this.state.seller.abn}</p> : ''

                                }</> : ''
                            }
                            {
                                this.state.seller.about !== null && this.state.seller.about !== '' ?
                                <p>About: {this.state.seller.about}</p> : ''
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <>{ this.state.reviews.length > 0 ?
                <div className='review-container'>
                    <h1 className='review-heading'>Reviews</h1>
                    {
                        this.state.reviews.map(
                        review =>
                        <div key={review.id} className='user-reviews'>
                            <label className='review-time-label'>
                                -  {moment(review.create_At).fromNow()}
                            </label><br/>
                            <StarRatingComponent 
                                className='star-rating' 
                                starCount={5}
                                value={review.score}
                                /><br/>
                            <label className='review-review-label'>
                                {review.review}
                            </label><br/>
                            <label className='review-reviewer-label'>
                                {review.reviewer.charAt(0).toUpperCase()+review.reviewer.slice(1)}
                            </label><br/><br/>
                        </div>
                        )}
                </div> : ''
                }</>
            </div>
        )
    }
}
  
export default SellerProfile
