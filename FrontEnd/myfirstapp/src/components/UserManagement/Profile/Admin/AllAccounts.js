import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, getSeller } from '../../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Header from '../../../Layout/Header'
import store from '../../../../store'
import moment from 'moment'
import { CSVLink } from 'react-csv'

const headers = [
    {label: 'Id', key: 'id'},
    {label: 'Username', key: 'username'},
    {label: 'FirstName', key: 'firstName'},
    {label: 'LastName', key: 'lastName'},
    {label: 'Email', key: 'email'},
    {label: 'Phone', key: 'phone'},
    {label: 'ABN', key: 'abn'},
    {label: 'AccountType', key: 'accountType'},
    {label: 'AccountActive', key: 'isActive'},
    {label: 'About', key: 'about'},
    {label: 'Create_At', key: 'create_At'}
]



class AllAccounts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users : [],
            csvReport: {
                filename: 'AllAccounts.csv',
                headers: headers,
                data: JSON.parse(localStorage.users)
            }
        }
    }

    componentDidMount() {
        let users = []
        for (let i = 0; i < JSON.parse(localStorage.users).length; i++) {
            if (JSON.parse(localStorage.users)[i].isActive === true) {
                users.push(JSON.parse(localStorage.users)[i])
            }
        }
        this.setState({users})
    }
    
    onSubmit(e,input) {
        e.preventDefault();
        if (input === 'pendingAccounts') {
            this.props.getUsers(this.props.history, 'toPending') 
        } else if (input === 'allAccounts') {
            this.props.getUsers(this.props.history, 'toAllUsers') 
        } else {
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
                                    <Link to='' onClick={e=>this.onSubmit(e,'pendingAccounts')}>
                                        <br/>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-flag-checkered pr-1'>Pending Accounts</i>
                                        </li>
                                    </Link>
                                    <Link to='/dashboard'>
                                        <li className='list-group-item board'>
                                            Back 
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className='col-lg-9 col-md-4 col-8'>
                                <div className='container'>    
                                    <div className='csv-button'>
                                        <h4>All Accounts</h4>    
                                        <div className='csv-button-1'>
                                            <CSVLink {...this.state.csvReport}>Export to CSV</CSVLink>
                                        </div>
                                    </div>    
                                    <table className = 'table table-striped'>
                                        <thead>
                                            <tr>
                                                <td> Username</td>
                                                <td> Email</td>
                                                <td> Account Type</td>
                                                <td> Created</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            this.state.users.map(
                                                user =>
                                                <tr key = {user.id}>
                                                    <td> <Link to='' onClick={e=>this.onSubmit(e,user.username)}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</Link></td>
                                                    <td> {user.email}</td>
                                                    <td> {user.accountType}</td>
                                                    <td> {moment(user.create_At).fromNow()}</td>
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
AllAccounts.propTypes = {
    getUsers: PropTypes.func.isRequired,
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
    { getUsers, getSeller }
)(AllAccounts))