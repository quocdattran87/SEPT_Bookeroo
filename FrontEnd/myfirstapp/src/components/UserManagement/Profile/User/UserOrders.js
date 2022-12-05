import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import Header from '../../../Layout/Header'
import { orderUpdate } from '../../../../actions/orderActions'
import { getSeller } from '../../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'


class UserOrders extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : JSON.parse(localStorage.orders)
        }
    }

    onSubmit(e,input, option, id){
        e.preventDefault()
        if (option === 'getSeller'){
            this.props.getSeller(input, this.props.history)
        } else if (option === 'getBuyer'){
            this.props.getSeller(input, this.props.history)
        } else if (option === 'orderUpdate'){
            this.props.orderUpdate(id, input, this.props.history) 
        } else if (option === 'reviewBook'){
            this.props.reviewBook(id, input, this.props.history) 
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
                            <h4>Purchases</h4>         
                                <table className = 'table table-striped'>
                                    <thead>
                                        <tr>
                                            <td> Book</td>
                                            <td> Price</td>
                                            <td> Seller</td>
                                            <td> Status</td>
                                            <td> Bought</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.orders.map(
                                            order => 
                                            <tr key = {order.id}>
                                            { order.buyer.toLowerCase() === store.getState().security.user.username.toLowerCase() 
                                                ?
                                                <><td> <Link to={{pathname: 'review-book',
                                                            state: {
                                                                bookReviewedID: order.bookID,
                                                                bookReviewedTitle: order.book
                                                            }}}>{order.book}</Link></td>
                                                <td> ${order.price.toFixed(2)}</td>
                                                <td> <Link to={{pathname: 'review-user',
                                                            state: {
                                                                userReviewed: order.seller
                                                            }}}>{order.seller.charAt(0).toUpperCase()+order.seller.slice(1).toLowerCase()}</Link></td>
                                                <td> {order.status}</td>
                                                <td> {moment(order.create_At).fromNow()}</td>

                                                { // If purchase was under two hours ago
                                                    moment().diff(order.create_At, 'minutes') < 120 && order.status !== 'CANCELLED'? 
                                                    <td><button onClick={e=>this.onSubmit(e,'cancelled', 'orderUpdate', order.id)}>Cancel order</button></td>
                                                    :
                                                    <></>
                                                }</>
                                                :''
                                            }
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>   
                                <br/>
                                <h4>Sales</h4>         
                                <table className = 'table table-striped'>
                                    <thead>
                                        <tr>
                                            <td> Book</td>
                                            <td> Price</td>
                                            <td> Buyer</td>
                                            <td> Status</td>
                                            <td> Sold</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.orders.map(
                                            order => 
                                            <tr key = {order.id}>
                                            { order.seller.toLowerCase() === store.getState().security.user.username.toLowerCase() 
                                                ?
                                                <><td> {order.book}</td>
                                                <td> ${order.price.toFixed(2)}</td>
                                                <td> <Link to={{pathname: 'review-user',
                                                                state: {
                                                                    userReviewed: order.buyer
                                                                }}}>{order.buyer}</Link></td>
                                                <td> {order.status}</td>
                                                <td> {moment(order.create_At).fromNow()}</td>

                                                { // If order status is preparing, show the mark as shipped button
                                                    order.status === 'Preparing' ? 
                                                    <td><button onClick={e=>this.onSubmit(e,'shipped', 'orderUpdate', order.id)}>Mark as shipped</button></td>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    order.status === 'Shipped' ? 
                                                    <td><button onClick={e=>this.onSubmit(e,'delivered', 'orderUpdate', order.id)}>Mark as delivered</button></td>
                                                    :
                                                    <></>
                                                }</>:''
                                            }
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
UserOrders.propTypes = {
    orderUpdate: PropTypes.func.isRequired,
    getSeller: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { orderUpdate, getSeller }
)(UserOrders))