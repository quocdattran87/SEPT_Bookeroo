import React, { Component } from 'react'
import { NavLink1, NavLink2 } from '../../Layout/HeaderElements'
import '../SignUp/Form.css'
import PropTypes from 'prop-types'
import { login } from '../../../actions/securityActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const initialState = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
}

class LogInPage extends Component {

    constructor(props){
        super(props)
        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    componentDidMount(){
        if(this.props.errors.loginError){
            let usernameError = this.props.errors.loginError
            this.setState({usernameError})
            this.props.errors.loginError = ''
        }
        this.forceUpdate()
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () => {
        let usernameError = ''
        let passwordError = ''

        if (!this.state.username.trim()) {
            usernameError = 'Username required'
        }
        if (!this.state.password) {
            passwordError = 'Password required'
        } 
        if (usernameError || passwordError) {
            this.setState({ usernameError, passwordError})
            return false
        }
        return true
    }

    onSubmit(e){
        e.preventDefault();
        const isValid = this.validate()

        if (isValid) {
            const LoginRequest = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.login(LoginRequest, this.props.history)
        }
    }

    render(){
        return(
            <div className='form-container'>
                <span className='close-btn'><NavLink1 to='/'>x</NavLink1> </span>
                <div className='form-content-left'>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                        <NavLink2 to='/'><h1>Bookeroo<i className='fas fa-book'></i></h1></NavLink2>
                    </div>
                </div>
                
                <div className='form-content-right'>
                    <form className='form' onSubmit={this.onSubmit}>
                        <h1>Log In</h1>
                        <div className='form-inputs'>
                            <label 
                                htmlFor='username' 
                                className='form-label'>
                                Username
                            </label>
                            <input 
                                id='username'
                                type='text' 
                                name='username' 
                                className='form-input' 
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={this.onChange}
                            /> 
                            <p>{this.state.usernameError}</p>
                        </div>
                        <div className='form-inputs'>
                            <label 
                                htmlFor='password' 
                                className='form-label'>
                                Password
                            </label>
                            <input 
                                id='password' 
                                type='password' 
                                name='password' 
                                className='form-input' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <p>{this.state.passwordError}</p>
                        </div>
                        
                        <button 
                            className='form-input-btn' 
                            type='submit'>
                            Log In
                        </button>
                        <span className='form-input-login'>
                            Don't have an account? Create one <Link to='/signup'>here</Link>
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}


LogInPage.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default connect(
    mapStateToProps,
    { login }
)(LogInPage)
