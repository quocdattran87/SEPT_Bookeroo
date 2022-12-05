import React, { Component } from 'react'
import { NavLink1, NavLink2 } from '../../Layout/HeaderElements'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createNewUser } from '../../../actions/securityActions'
import * as PropTypes from 'prop-types'


const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    abn: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    accountTypeError: '',
    abnError: ''
}


class SignUpPage extends Component {
    constructor(props){
        super(props)
        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        if(this.props.errors.usernameError){
            let usernameError = this.props.errors.usernameError
            this.setState({usernameError})
            this.props.errors.usernameError = ''

        } else if (this.props.errors.emailError){
            let emailError = this.props.errors.emailError
            this.setState({emailError})
            this.props.errors.emailError = ''
        }
        this.forceUpdate()
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () => {
        let usernameError = ''
        let emailError = ''
        let passwordError = ''
        let confirmPasswordError = ''
        let accountTypeError = ''
        let abnError = ''

        if (!this.state.username.trim()){
            usernameError = 'Username required'
        }
        if (!this.state.email){
            emailError = 'Email required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email)){
            emailError = 'Invalid email'
        }
        if (!this.state.password){
            passwordError = 'Password required'
        } else if (this.state.password.length < 6){
            passwordError = 'Password needs to be 6 characters or more'
        } else if (!this.state.confirmPassword && !this.state.password){
            confirmPasswordError = 'Password required'
        } else if (!this.state.confirmPassword && this.state.password.length >= 6){
            confirmPasswordError = 'Confirmation required'
        } else if (this.state.confirmPassword !== this.state.password){
            passwordError = 'Passwords to not match'
        }
        if (!this.state.accountType){
            accountTypeError = 'Account type required'
        }
        if (!this.state.abn && this.state.accountType === 'Publisher'){
            abnError = 'ABN required'
        } else if ((this.state.abn.length !== 10 || (!/^[0-9\b]+$/.test(this.state.abn)))&&this.state.abn.length !== 0) {
            abnError = 'ABN must be 10 digits'
        }

        if (usernameError || emailError || passwordError || confirmPasswordError || accountTypeError || abnError) {
            this.setState({ usernameError, emailError, passwordError, confirmPasswordError, accountTypeError, abnError })
            return false
        }
        return true
    }

    onSubmit(e){
        e.preventDefault()
        const isValid = this.validate()
        let approved = true
        
        if (isValid){
            if (this.state.accountType === 'Publisher'){
                approved = false
            }
            const newUser = {
                username: this.state.username.toLowerCase(),
                email: this.state.email.toLowerCase(),
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                accountType: this.state.accountType,
                isActive: approved,
                abn: this.state.abn,
            }
            this.props.createNewUser(newUser, this.props.history)
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
                        <h1>Sign Up</h1>
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
                                htmlFor='email' 
                                className='form-label'>
                                Email
                            </label>
                            <input 
                                id='email' 
                                type='email' 
                                name='email' 
                                className='form-input' 
                                placeholder='Enter your email'
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <p>{this.state.emailError}</p>
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
                        <div className='form-inputs'>
                            <label 
                                htmlFor='confirmPassword' 
                                className='form-label'>
                                Confirm Password
                            </label>
                            <input 
                                id='confirmPassword' 
                                type='password' 
                                name='confirmPassword' 
                                className='form-input' 
                                placeholder='Confirm your password'
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            />
                            <p>{this.state.confirmPasswordError}</p>
                        </div>
                        <div className='form-inputs'>
                            <div className='account-type-inputs'>
                                <div>
                                    <label 
                                        htmlFor='accountType' 
                                        className='form-label'>
                                        Account Type
                                    </label>
                                    <div >
                                        <select 
                                            id='accountType'
                                            type='text' 
                                            name='accountType'
                                            onChange={this.onChange}>
                                            <option></option>
                                            <option>Regular</option>
                                            <option>Publisher</option>
                                        </select>
                                        <p>{this.state.accountTypeError}</p>
                                    </div>
                                </div>
                                {
                                    this.state.accountType === 'Publisher'
                                    ?
                                    <div className='abn-form-input'>
                                        <label 
                                            htmlFor='abn' 
                                            className='form-label'>
                                            ABN
                                        </label>
                                        <input 
                                            id='abn' 
                                            type='text' 
                                            name='abn' 
                                            className='form-input' 
                                            placeholder='Enter your ABN'
                                            value={this.state.abn}
                                            onChange={this.onChange}
                                        />
                                        <p>{this.state.abnError}</p>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                        <button
                            className='form-input-btn' 
                            type='submit'>
                            Create Account
                        </button>
                        <span className='form-input-login'>
                            Already have an account? Login <Link to='/login'>here</Link>
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}

SignUpPage.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
  
export default connect(
    mapStateToProps,
    { createNewUser }
)(SignUpPage)
