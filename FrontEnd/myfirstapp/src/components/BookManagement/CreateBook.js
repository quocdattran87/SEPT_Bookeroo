import React, { Component } from 'react'
import Header from '../Layout/Header'
import { connect } from 'react-redux'
import { createNewBook } from '../../actions/securityActions'
import * as PropTypes from 'prop-types'
import store from '../../store'

const initialState = {
    title: '',
    isbn: '',
    author: '',
    genre: '',
    description: '',
    price: '',
    image: '',
    titleError: '',
    isbnError: '',
    authorError: '',
    genreError: '',
    descriptionError: '',
    priceError: '',
    imageError: ''
}

class CreateBook extends Component {

    constructor(props){
        super(props);
        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    validate = () => {
        let titleError = ''
        let isbnError = ''
        let authorError = ''
        let genreError = ''
        let descriptionError = ''
        let priceError = ''
        let imageError = ''

        if (!this.state.title.trim()) {
            titleError = 'Title required'
        }
        if (!this.state.isbn.trim()) {
            isbnError = 'ISBN required';
        } else if (this.state.isbn.length !== 13 || (!/^[0-9\b]+$/.test(this.state.isbn))) {
            isbnError = 'ISBN must be 13 digits'
        }
        if (!this.state.author.trim()) {
            authorError = 'Author required'
        } 
        if (!this.state.genre.trim()) {
            genreError = 'Genre required'
        }
        if (!this.state.description.trim()) {
            descriptionError = 'Description required'
        }
        if (!this.state.price.trim()) {
            priceError = 'Price required'
        } else if (!/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(this.state.price)) {
            priceError = 'Not a valid price'
        }
        if (this.state.image === null) {
            imageError = 'Image required'
        }
        if (titleError || isbnError || authorError || genreError || descriptionError || priceError || imageError) {
            this.setState({ titleError, isbnError, authorError, genreError, descriptionError, priceError, imageError })
            return false
        }
        return true
    }

    onSubmit(e){
        e.preventDefault()
        const isValid = this.validate()
        
        if (isValid) {
            const newBook = {
                title: this.state.title,
                isbn: this.state.isbn,
                author: this.state.author,
                genre: this.state.genre,
                description:this.state.description,
                price: this.state.price,
                image: this.state.image,
                seller: store.getState().security.user.username
            }
            this.props.createNewBook(newBook, this.props.history);
        }
    }

    render(){
        return (
        <>
            <div className='App'><Header/></div>
            <div className='book-form-container'>
            <form className='book-form' onSubmit={this.onSubmit}>
                <h2 className='book-form-heading'>Sell A Book</h2>
                <div className='create-book-field'>
                    <div>
                    <label 
                        htmlFor='title' 
                        className='book-form-label'>
                        Title
                    </label>
                    </div>
                    <div>
                    <input 
                        id='title'
                        type='text' 
                        name='title' 
                        className='book-form-input' 
                        placeholder='Enter title of the book'
                        value={this.state.title}
                        onChange={this.onChange}
                    /> 
                    <p>{this.state.titleError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='image' 
                            className='book-form-label'>
                            Image
                        </label>
                    </div>
                    <div>
                        <input 
                            id='image' 
                            type='text' //change to file to uplaod from computer
                            name='image' 
                            className='book-form-input' 
                            placeholder='URL of image'
                            value={this.state.image}
                            onChange={this.onChange}
                        />
                        <p>{this.state.imageError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='isbn' 
                            className='book-form-label'>
                            ISBN
                        </label>
                    </div>
                    <div>
                        <input 
                            id='isbn'
                            type='text'
                            name='isbn' 
                            className='book-form-input' 
                            placeholder='Enter isbn of the book'
                            value={this.state.isbn}
                            onChange={this.onChange}
                        /> 
                        <p>{this.state.isbnError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='author' 
                            className='book-form-label'>
                            Author
                        </label>
                    </div>
                    <div>
                        <input 
                            id='author' 
                            type='text' 
                            name='author' 
                            className='book-form-input' 
                            placeholder='Enter author of the book'
                            value={this.state.author}
                            onChange={this.onChange}
                        />
                        <p>{this.state.authorError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='genre' 
                            className='book-form-label'>
                            Genre
                        </label>
                    </div>
                    <div>
                        <input 
                            id='genre' 
                            type='text' 
                            name='genre' 
                            className='book-form-input' 
                            placeholder='Enter genre of the book'
                            value={this.state.genre}
                            onChange={this.onChange}
                        />
                        <p>{this.state.genreError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='price' 
                            className='book-form-label'>
                            Price
                        </label>
                    </div>
                    <div>
                        <input 
                            id='price' 
                            type='text' 
                            name='price' 
                            className='book-form-input' 
                            placeholder='Enter price for book'
                            value={this.state.price}
                            onChange={this.onChange}
                        />
                        <p>{this.state.priceError}</p>
                    </div>
                </div>
                <div className='create-book-field'>
                    <div>
                        <label 
                            htmlFor='description' 
                            className='book-form-label'>
                            Description
                        </label>
                    </div>
                    <div>
                        <textarea 
                            id='description' 
                            type='text' 
                            name='description' 
                            className='book-form-input' 
                            placeholder='Enter description for book'
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                        <p>{this.state.descriptionError}</p>
                    </div>
                </div>
                <br/>
                <button
                    className='buy-btn' 
                    type='submit'>
                    Sell Book
                </button>
            </form>
        </div>
        </>)
    }
}
CreateBook.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
  
export default connect(
    mapStateToProps,
    { createNewBook }
)(CreateBook)