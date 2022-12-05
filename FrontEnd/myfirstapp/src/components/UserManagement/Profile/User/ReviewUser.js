import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postReview } from '../../../../actions/reviewActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import store from '../../../../store'
import Header from '../../../Layout/Header'
import StarRatingComponent from 'react-star-rating-component'


class ReviewUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviewer: '',
            review: '',
            userReviewed: '',
            score: '',
            reviewError: '',
            scoreError: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        let userReviewed = ''
        if (this.props.location.state.userReviewed) {
            userReviewed = this.props.location.state.userReviewed
        }
        if (userReviewed){
            this.setState({ userReviewed })
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () => {
        let reviewError = ''
        let scoreError = ''

        if (!this.state.review) {
            reviewError = 'Review required'
        } 
        if (!this.state.score) {
            scoreError = 'Star rating required'
        }
        if (reviewError || scoreError ) {
            this.setState({ reviewError, scoreError })
            return false
        }
        return true
    }

    onStarClick(nextValue){
        this.setState({score: nextValue})
    }

    onSubmit(e){
        e.preventDefault();
        const isValid = this.validate()
        if (isValid) {
            const review = {
                reviewer: store.getState().security.user.username,
                review: this.state.review,
                userReviewed: this.state.userReviewed,
                score: this.state.score
            }
            this.props.postReview(review, this.props.history)
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
                                    <Link to='/user-orders'>
                                        <br/>
                                        <li className='list-group-item board'>
                                            Back 
                                        </li>
                                    </Link>
                                    <Link to='' onClick={e=>this.onSubmit(e)}>
                                        <br/>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-flag-checkered pr-1'>Post review</i>
                                        </li>
                                    </Link>
                                </ul>
                                
                            </div>
                            <div className='col-lg-9 col-md-4 col-9'>
                                <h4>{this.state.userReviewed.charAt(0).toUpperCase()+this.state.userReviewed.slice(1)}</h4><hr/>
                                <div>
                                    <div className='star-rating-input'>
                                        <StarRatingComponent 
                                            id='score'
                                            name='score' 
                                            starCount={5}
                                            value={this.state.score}
                                            onStarClick={this.onStarClick.bind(this)}
                                        />
                                        <p>{this.state.scoreError}</p>
                                    </div>
                                    <div className='review-input'>
                                        <textarea 
                                            id='review' 
                                            type='text' 
                                            name='review' 
                                            className='text-area-input' 
                                            placeholder='Write a review'
                                            value={this.state.review}
                                            onChange={this.onChange}
                                        />
                                        <p>{this.state.reviewError}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReviewUser.propTypes = {
    postReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { postReview }
)(ReviewUser))