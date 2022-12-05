import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { editUser } from '../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import store from '../../../store'
import Header from '../../Layout/Header'


class Edit extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            about: '',
            abn: '',
            image: '',
            emailError: '',
            abnError: '',
            phoneError: '',
            imageSelected: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        let firstName = ''
        let lastName = ''
        let email = ''
        let phone = ''
        let about = ''
        let abn = ''
        let image = ''
        if (store.getState().security.user.firstName) {
            firstName = store.getState().security.user.firstName.charAt(0).toUpperCase() + store.getState().security.user.firstName.slice(1)
        }
        if (store.getState().security.user.lastName) {
            lastName = store.getState().security.user.lastName.charAt(0).toUpperCase() + store.getState().security.user.lastName.slice(1)
        }
        if (store.getState().security.user.email) {
            email = store.getState().security.user.email
        }
        if (store.getState().security.user.phone) {
            phone = store.getState().security.user.phone
        }
        if (store.getState().security.user.about) {
            about = store.getState().security.user.about
        }
        if (store.getState().security.user.abn) {
            abn = store.getState().security.user.abn
        }
        if (store.getState().security.user.image) {
            image = store.getState().security.user.image
        }
        if (firstName || lastName || email || phone || about || abn || image) {
            this.setState({ firstName, lastName, email, phone, about, abn, image })
        }
        if (this.props.errors.emailError){
            let emailError = this.props.errors.emailError
            this.setState({emailError})
            this.props.errors.emailError = ''
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () => {
        let emailError = ''
        let abnError = ''
        let phoneError = ''

        if (!this.state.email) {
            emailError = 'Email required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email)){
            emailError = 'Invalid email'
        }
        if (!this.state.abn && store.getState().security.user.accountType === 'Publisher') {
            abnError = 'ABN required'
        } else if ((this.state.abn.length !== 10 || (!/^[0-9\b]+$/.test(this.state.abn)))&&this.state.abn.length !== 0) {
            abnError = 'ABN must be 10 digits'
        }
        if ((this.state.phone.length !== 10 || (!/^[0-9\b]+$/.test(this.state.phone)))&&this.state.phone.length !== 0) {
            phoneError = 'Phone number must be 10 digits'
        }
        if (emailError || abnError || phoneError) {
            this.setState({ emailError, abnError, phoneError })
            return false
        }
        return true
    }

    onSubmit(e){
        e.preventDefault()
        const isValid = this.validate()
        if (isValid) {
            const updateUser = {
                firstName: this.state.firstName.toLowerCase(),
                lastName: this.state.lastName.toLowerCase(),
                email: this.state.email.toLowerCase(),
                phone: this.state.phone,
                about: this.state.about,
                abn: this.state.abn,
                image: this.state.image
            }
            this.props.editUser(store.getState().security.user.id, updateUser, this.props.history)
        }
    }

    render(){
        return (
            <>
                <Header/>
                <div className='container'>
                    <div className='card card-body bg-light mb-3'>
                        <div className='row'>
                            <div className='col-3'>
                                <img src={this.state.image} alt=''/>
                                <br/>
                                <label 
                                    htmlFor='firstName' 
                                    className='name-label'>
                                    Image link
                                </label>
                                <input 
                                        id='image'
                                        type='text' 
                                        name='image' 
                                        className='form-input' 
                                        placeholder='Link to image'
                                        value={this.state.image}
                                        onChange={this.onChange}
                                    />  
                                {
                                    this.state.imageSelected ?
                                    <div>
                                    <button onClick={this.fileUploadHandler}>Upload</button>
                                    <img id='thumbnail' alt='profile-preview'/>
                                    </div> : ''
                                }
                                <ul className='list-group'>
                                    <br/>
                                    <Link to='' onClick={e=>this.onSubmit(e)}>
                                        <li className='list-group-item board'>
                                            <i className='fa fa-flag-checkered pr-1'>Save and return</i>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className='col-lg-9 col-md-4 col-9'>
                                <h4>Edit Profile</h4><hr/>
                                <div className='edit-name-labels'>
                                    <label 
                                        htmlFor='firstName' 
                                        className='name-label'>
                                        First Name
                                    </label>
                                    <label 
                                        htmlFor='lastName' 
                                        className='name-label'>
                                        Last Name
                                    </label>
                                </div>
                                <div className='edit-name-inputs'>
                                    <input 
                                        id='firstName'
                                        type='text' 
                                        name='firstName' 
                                        className='name-input' 
                                        placeholder='Enter your first name'
                                        value={this.state.firstName}
                                        onChange={this.onChange}
                                    /> 
                                    <input 
                                        id='lastName'
                                        type='text' 
                                        name='lastName' 
                                        className='name-input' 
                                        placeholder='Enter your last name'
                                        value={this.state.lastName}
                                        onChange={this.onChange}
                                    /> 
                                </div>
                                <br/>
                                <div className='edit-inputs'>
                                    <label 
                                        htmlFor='email' 
                                        className='edit-label'>
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
                                    <br/>
                                </div>
                                <div className='edit-inputs'>
                                    <label 
                                        htmlFor='phone' 
                                        className='edit-label'>
                                        Phone
                                    </label>
                                    <input 
                                        id='phone' 
                                        type='text' 
                                        name='phone' 
                                        className='form-input' 
                                        placeholder='Enter your phone'
                                        value={this.state.phone}
                                        onChange={this.onChange}
                                    />
                                    <p>{this.state.phoneError}</p>
                                    <br/>
                                </div>
                                {
                                store.getState().security.user.accountType === 'Publisher' ?
                                
                                    <div className='edit-inputs'>
                                        <label 
                                            htmlFor='abn' 
                                            className='edit-label'>
                                            Abn
                                        </label>
                                        <input 
                                            id='abn' 
                                            type='text' 
                                            name='abn' 
                                            className='form-input' 
                                            placeholder='Enter your abn'
                                            value={this.state.abn}
                                            onChange={this.onChange}
                                        />
                                        <p>{this.state.abnError}</p>
                                        <br/>
                                    </div>
                                    : ''
                                }
                                <div>
                                    <label 
                                        htmlFor='about' 
                                        className='edit-label'>
                                        About
                                    </label>
                                    <textarea 
                                        id='about' 
                                        type='text' 
                                        name='about' 
                                        className='text-area-input' 
                                        placeholder='Tell us about yourself'
                                        value={this.state.about}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
Edit.propTypes = {
    editUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})
  
export default withRouter(connect(
    mapStateToProps,
    { editUser }
)(Edit))