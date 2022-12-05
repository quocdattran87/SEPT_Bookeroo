import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import Header from '../../../Layout/Header'
import moment from 'moment'
import { getSeller } from '../../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { CSVLink } from 'react-csv'

const headers = [
    {label: 'Id', key: 'id'},
    {label: 'Seller', key: 'seller'},
    {label: 'Buyer', key: 'buyer'},
    {label: 'Book', key: 'book'},
    {label: 'BookID', key: 'bookID'},
    {label: 'Price', key: 'price'},
    {label: 'Status', key: 'status'},
    {label: 'Create_At', key: 'create_At'}
]

class AllTransactions extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : JSON.parse(localStorage.allOrders),
            csvReport: {
                filename: 'AllTransactions.csv',
                headers: headers,
                data: JSON.parse(localStorage.allOrders)
            }
        }
    }

    onSubmit(e,input, option){
        e.preventDefault()
        if (option === 'getSeller') {
            this.props.getSeller(input, this.props.history)
        } else if (option === 'getBuyer') {
            this.props.getSeller(input, this.props.history)
        }
    }
    
    render() {
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
                                    <div className='csv-button'>
                                        <h4>All Transactions</h4>    
                                        <div className='csv-button-1'>
                                            <CSVLink {...this.state.csvReport}>Export to CSV</CSVLink>
                                        </div>
                                    </div>     
                                    <table className = 'table table-striped'>
                                    <thead>
                                        <tr>
                                            <td> Book</td>
                                            <td> Price</td>
                                            <td> Seller</td>
                                            <td> Status</td>
                                            <td> Purchased</td>
                                            <td> Buyer</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.orders.map(
                                            order =>
                                            <tr key = {order.id}>
                                                <td> {order.book.charAt(0).toUpperCase() + order.book.slice(1)}</td>
                                                <td> ${order.price.toFixed(2)}</td>
                                                <td> <Link to='' onClick={e=>this.onSubmit(e,order.seller,'getSeller')}>{order.seller.charAt(0).toUpperCase() + order.seller.slice(1)}</Link></td>
                                                <td> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                                                <td> {moment(order.create_At).fromNow()}</td>
                                                <td> <Link to='' onClick={e=>this.onSubmit(e,order.buyer,'getBuyer')}>{order.buyer.charAt(0).toUpperCase() + order.buyer.slice(1)}</Link></td>
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
AllTransactions.propTypes = {
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
    { getSeller }
)(AllTransactions))