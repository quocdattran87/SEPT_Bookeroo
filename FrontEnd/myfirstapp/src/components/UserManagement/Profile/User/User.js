import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../../actions/securityActions'
import { getUserOrders, getAllOrders } from '../../../../actions/orderActions'
import { getUsers, deleteUser } from '../../../../actions/userActions'
import { getAllBooks } from '../../../../actions/bookActions'
import { getAllReviews } from '../../../../actions/reviewActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import store from '../../../../store'


class User extends Component {

    onSubmit(e,input){
        e.preventDefault();
        if (input === 'pendingAccounts'){
            this.props.getUsers(this.props.history, 'toPending') 
        }
        else if (input === 'allAccounts'){
            this.props.getUsers(this.props.history, 'toAllUsers') 
        }
        else if (input === 'allTransactions'){
            this.props.getAllOrders(this.props.history) 
        }
        else if (input === 'allBooks'){
            this.props.getAllBooks(this.props.history) 
        }
        else if (input === 'allReviews'){
            this.props.getAllReviews(this.props.history) 
        }
        else if (input === 'orders'){
            const Orders = {
                username: store.getState().security.user.username
            }
            this.props.getUserOrders(Orders, this.props.history)
        }
        else if (input === 'delete'){
            if (window.confirm('Are you sure you want to delete your account?')) {
                this.props.deleteUser(store.getState().security.user.id)
                this.props.logout(this.props.history)
                alert('Account deleted')
            } else {} //Do nothing
        }
        else if (input === 'logout'){
            this.props.logout(this.props.history)
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='card card-body bg-light mb-3'>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={store.getState().security.user.image} alt=''/>
                            {
                                store.getState().security.user.accountType === 'Admin' 
                                ?
                                <ul className='list-group'>
                                    <br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'pendingAccounts')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-flag-checkered pr-1'>Pending Accounts</i>
                                        </li>
                                    </Link>
                                    <Link to='' onClick={e=>this.onSubmit(e,'allAccounts')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>All Accounts</i>
                                        </li>
                                    </Link>
                                    <Link to='' onClick={e=>this.onSubmit(e,'allTransactions')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>All Transactions</i>
                                        </li>
                                    </Link>
                                    <Link to='' onClick={e=>this.onSubmit(e,'allBooks')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>All Books</i>
                                        </li>
                                    </Link>
                                    <Link to='' onClick={e=>this.onSubmit(e,'allReviews')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>All Reviews</i>
                                        </li>
                                    </Link>
                                    <br/>
                                    <Link to='/edit'>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>Edit Account</i>
                                        </li>
                                    </Link>
                                    <br/><br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'logout')}>
                                        <li className='list-group-item board'>
                                            Log Out 
                                        </li>
                                    </Link>
                                </ul>
                                :
                            
                                <ul className='list-group'>
                                    <br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'orders')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-flag-checkered pr-1'>Transaction History</i>
                                        </li>
                                    </Link>
                                    <Link to='/edit'>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>Edit Account</i>
                                        </li>
                                    </Link>
                                    <br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'delete')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-minus-circle pr-1'>Delete Account</i>
                                        </li>
                                    </Link>
                                    <br/><br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'logout')}>
                                        <li className='list-group-item board'>
                                            Log Out 
                                        </li>
                                    </Link>
                                </ul>
                            }
                        </div>
                        <div className='col-lg-9 col-md-4 col-9'>
                            <h4>{store.getState().security.user.username.charAt(0).toUpperCase() + store.getState().security.user.username.slice(1).toLowerCase()}</h4><hr/>
                            {   
                                store.getState().security.user.firstName !== null && store.getState().security.user.firstName !== '' ?
                                <>{
                                    store.getState().security.user.lastName === null || store.getState().security.user.lastName === '' ?
                                    <p>Name: {store.getState().security.user.firstName.charAt(0).toUpperCase() + store.getState().security.user.firstName.slice(1)}</p> :
                                    <p>Name: {store.getState().security.user.firstName.charAt(0).toUpperCase() + store.getState().security.user.firstName.slice(1)} {store.getState().security.user.lastName.charAt(0).toUpperCase() + store.getState().security.user.lastName.slice(1).toLowerCase()}</p>
                                }</> : <>{
                                    store.getState().security.user.lastName !== null && store.getState().security.user.lastName !== '' ?
                                    <p>Name: {store.getState().security.user.lastName.charAt(0).toUpperCase() + store.getState().security.user.lastName.slice(1)}</p> : ''
                                }</>
                            }
                            <p>Email: {store.getState().security.user.email.toLowerCase()}</p>
                            {
                                store.getState().security.user.phone !== null && store.getState().security.user.phone !== '' ?
                                <p>Phone: {store.getState().security.user.phone}</p> : ''
                            }
                            {
                                store.getState().security.user.accountType === 'Publisher' ?
                                <>{
                                    store.getState().security.user.abn !== null && store.getState().security.user.abn !== '' ?
                                    <p>ABN: {store.getState().security.user.abn}</p> : ''

                                }</> : ''
                            }
                            {
                                store.getState().security.user.about !== null && store.getState().security.user.about !== '' ?
                                <p>About: {store.getState().security.user.about}</p> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
User.propTypes = {
    logout: PropTypes.func.isRequired,
    getUserOrders: PropTypes.func.isRequired,
    getAllOrders: PropTypes.func.isRequired,
    getAllBooks: PropTypes.func.isRequired,
    getAllReviews: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { logout, getUserOrders, getAllOrders, getAllBooks, getAllReviews, getUsers, deleteUser }
)(User))
