import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, getSeller, deleteUser, approveUser } from '../../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Header from '../../../Layout/Header'
import store from '../../../../store'
import moment from 'moment'

class PendingAccounts extends Component {
    constructor(props){
        super(props)
        this.state = {
            users : []
        }
    }

    componentDidMount(){
        let users = []
        for (let i = 0; i < JSON.parse(localStorage.users).length; i++) {
            if (JSON.parse(localStorage.users)[i].isActive === false) {
                users.push(JSON.parse(localStorage.users)[i])
            }
        }
        this.setState({ users })
    }

    removeFromTable = (contactId) => {
        const newUsers = [...this.state.users]
        const index = this.state.users.findIndex((contact)=> contact.id === contactId)
        newUsers.splice(index, 1)
        this.setState({ users: newUsers })
    }

    onSubmit(e,input, id){
        e.preventDefault()
        if (input === 'pendingAccounts') {
            this.props.getUsers(this.props.history, 'toPending') 
        } else if (input === 'allAccounts') {
            this.props.getUsers(this.props.history, 'toAllUsers') 
        } else if (input === 'decline') {
            this.props.deleteUser(id) 
            this.removeFromTable(id)
        } else if (input === 'approve') {
            this.props.approveUser(id) 
            this.removeFromTable(id)
        } else if (input === 'getUser') {
            this.props.getSeller(id, this.props.history)
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
                                    <br/>
                                    <Link to='' onClick={e=>this.onSubmit(e,'allAccounts')}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-edit pr-1'>All Accounts</i>
                                        </li>
                                    </Link>
                                    <Link to='/dashboard'>
                                        <li className='list-group-item board'>
                                            Back 
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className='col-lg-9 col-md-4 col-9'>
                            { this.state.users.length > 0 ?
                                <><div className='container'>             
                                    <h4>Pending Accounts</h4>
                                    <table className = 'table table-striped'>
                                        <thead>
                                            <tr>
                                                <td> Username</td>
                                                <td> Email</td>
                                                <td> Created</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users.map(
                                                user =>
                                                <tr key = {user.id}>
                                                    <td> <Link to='' onClick={e=>this.onSubmit(e,'getUser',user.username)}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</Link></td>
                                                    <td> {user.email}</td>
                                                    <td> {moment(user.create_At).fromNow()}</td>
                                                    <td><button onClick={e=>this.onSubmit(e,'approve',user.id)}>Approve</button></td>
                                                    <td><button onClick={e=>this.onSubmit(e,'decline',user.id)}>Decline</button></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>   
                                </div></> : <h4>No pending accounts</h4>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
PendingAccounts.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getSeller: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    approveUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { getUsers, getSeller, deleteUser, approveUser }
)(PendingAccounts))