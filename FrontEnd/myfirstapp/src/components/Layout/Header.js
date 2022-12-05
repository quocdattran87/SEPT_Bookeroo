import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { queryBooks } from '../../actions/bookActions'
import { getUser } from '../../actions/userActions'
import store from '../../store'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const initialState = {
    query: ''
}

 class Header extends Component {
    constructor(props){
        super(props)

        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        if (this.state.query.trim()) {
            const BookQuery = {
                query: this.state.query
            }
            this.props.queryBooks(BookQuery, this.props.history)
        }
    }

    componentDidMount(){
        console.log(store.getState())
        if (store.getState().security.validToken) {
            this.props.getUser(store.getState().security.user.id, this.props.history)
        }
        this.forceUpdate()
    }

    render(){
        return (
            <div>
            <nav className='navbar navbar-expand-sm navbar-dark mb-4'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    <h1>Bookeroo<i className='fas fa-book'></i></h1>
                </Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                    <span className='navbar-toggler-icon' />
                </button>
    
                <div className='collapse navbar-collapse' id='mobile-nav'>
                    <div className='navbar-nav mr-auto'>
                        <form className='searchForm' onSubmit={this.onSubmit}>
                            <div className='search'>
                                <input 
                                    id='query'
                                    className='searchBar' 
                                    name='query' 
                                    type='text' 
                                    placeholder='Search Title, Author, Genre or ISBN'
                                    value={this.state.query}
                                    onChange={this.onChange}/>
                                <button 
                                    className='searchIcon'
                                    type='submit'
                                    background-color='white'>
                                    <SearchIcon/>
                                </button>
                            </div>
                        </form>
                    </div>
                    {
                        store.getState().security.validToken ? 

                        <ul className='navbar-nav ml-auto'>
                            <li className='about-item'>
                                <Link className='nav-link ' to='/about'>
                                    About
                                </Link>
                            </li>
                            { store.getState().security.user.accountType !== 'Admin' ?
                            <li className='nav-item'>
                                <Link className='nav-link ' to='/sell'>
                                    Sell
                                </Link>
                            </li> : ''
                            }
                            <li className='nav-item'>
                                <Link className='nav-link ' to='/dashboard'>
                                    {store.getState().security.user.username.charAt(0).toUpperCase() + store.getState().security.user.username.slice(1)}
                                </Link>
                            </li>
                        </ul> 
                        :
                        <ul className='navbar-nav ml-auto'>
                            <li className='about-item'>
                                <Link className='nav-link ' to='/about'>
                                    About
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link ' to='/signup'>
                                    Sign Up
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/login'>
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
            </div>
        )
    }
}
Header.propTypes = {
    queryBooks: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { queryBooks, getUser }
)(Header))