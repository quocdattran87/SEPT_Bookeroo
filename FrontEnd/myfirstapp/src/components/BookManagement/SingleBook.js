import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../../store'
import Header from '../Layout/Header'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeller } from '../../actions/userActions'
import { createNewOrder } from '../../actions/orderActions'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component'


let PayPalButton

class SingleBook extends Component {

    constructor(props){
        super(props)
        this.state = {
            book : JSON.parse(localStorage.book),
            reviews : JSON.parse(localStorage.bookReviews),
            paypalIsLoaded : false
        }
    }

    componentDidMount(){
        PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })
        this.setState({ paypalIsLoaded: true })
    }

    createOrder(data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: this.state.book.price.toFixed(2),
                    },
                },
            ],
        });
    }

    onApprove(data, actions){
        const newOrder = {
            seller: this.state.book.seller,
            buyer: store.getState().security.user.username,
            book: this.state.book.title,
            bookID: this.state.book.id,
            price: this.state.book.price.toFixed(2),
            status: 'Preparing'
        }
        this.props.createNewOrder(newOrder, this.props.history)
        return actions.order.capture()
    }

    onSubmit(e,sellerUserName){
        e.preventDefault()
        this.props.getSeller(sellerUserName, this.props.history)
    }

    render(){
        return (
          <div>
            <Header />
            <div className='single-book-row'>
                <div className='single-book-image-container'>
                    <img className='single-book-image' src={this.state.book.image} alt={this.state.book.title}/>
                </div>
                <div className='book-information-container'>
                    <div className='book-information'>
                        <h1 className = 'book-title-listing'>{this.state.book.title}</h1>
                        <h1 className = 'book-author-listing'><strong>By:</strong> {this.state.book.author}</h1>
                        <hr/>
                        <h1 className = 'book-genre-listing'><strong><strong>Genre:</strong></strong> {this.state.book.genre}</h1>
                        <h1 className = 'book-isbn-listing'><strong><strong>ISBN:</strong></strong> {this.state.book.isbn}</h1>
                        <br/>
                        <h1 className = 'book-description-listing'><strong><strong>Description:</strong></strong></h1>
                        <p>
                            {this.state.book.description}
                        </p>
                    </div>
                    <div className='book-buy-container'>
                        <h1 className = 'book-seller-listing'><strong><strong>Seller:</strong></strong> <Link to='' onClick={e=>this.onSubmit(e,this.state.book.seller)}>{this.state.book.seller.charAt(0).toUpperCase() + this.state.book.seller.slice(1)}</Link></h1>
                        <h1 className = 'book-price-listing'>${this.state.book.price.toFixed(2)}</h1>
                        {
                            store.getState().security.validToken 
                            ?   <>{ store.getState().security.user.accountType === 'Admin' 
                                ?   <p>Admin cannot buy</p> 
                                :   <>{
                                        this.state.book.seller.toLowerCase() === store.getState().security.user.username.toLowerCase()
                                        ? <p>Why would you want to buy your own book?</p>
                                        : this.state.paypalIsLoaded ? <>
                                        <div className='paypal-btn'>
                                            <PayPalButton
                                                createOrder={(data, actions) => this.createOrder(data, actions)}
                                                onApprove={(data, actions) => this.onApprove(data, actions)}/>
                                        </div></> : ""
                                    }</>
                                }</>
                            :   <p>Login to purchase</p>
                        }
                    </div>
                </div>
            </div>
            <hr/>
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
SingleBook.propTypes = {
    getSeller: PropTypes.func.isRequired,
    createNewOrder: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
  const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
  })
  
  export default connect(
    mapStateToProps,
    { getSeller, createNewOrder }
  )(SingleBook)