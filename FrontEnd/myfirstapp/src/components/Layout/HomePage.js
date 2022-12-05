import axios from 'axios'
import React, { Component } from 'react'
import { getBook } from '../../actions/bookActions'
import '../BookManagement/Book.css'
import Header from './Header'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      books : []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    axios.get('http://ec2-13-55-218-209.ap-southeast-2.compute.amazonaws.com:8080/api/books').then((response) => {
      this.setState({ books: response.data })
    })
  }

  componentWillUnmount(){
    this.setState = (state,callback) => {
      return
    }
  }

  onSubmit(e,id){
    e.preventDefault();
    this.props.getBook(id, this.props.history)
  }

  render(){
    return(
      <>
        <div className='App'><Header/></div>

        <div className='wrapper-row'>
          <h1 className='popular-heading'>Popular</h1>
          <div className='book-row'>
          {
              this.state.books.map(
              book =>
              <Link 
                key={book.id} className='book-card' to='/book' type='submit' onClick={e=>this.onSubmit(e,book.id)}>
                <div className='bookCover'>
                  <img key={book.id} src={book.image} alt={book.title} className='book-image'/>
                </div>
                <h1 className='book-price'>${book.price.toFixed(2)}</h1>
                <h1 className='book-title'>{book.title}</h1>
              </Link>
            )}
          </div>
        </div>

        <hr />
             
        <div className='wrapper-row'>
          <h1 className='popular-heading'>Highest Rated</h1>
          <div className='book-row'>
          {
              this.state.books.map(
              book =>
              <Link 
                key={book.id} className='book-card' to='/book' type='submit' onClick={e=>this.onSubmit(e,book.id)}>
                <div className='bookCover'>
                  <img key={book.id} src={book.image} alt={book.title} className='book-image'/>
                </div>
                <h1 className='book-price'>${book.price.toFixed(2)}</h1>
                <h1 className='book-title'>{book.title}</h1>
              </Link>
            )}
          </div>
        </div>

        <hr />
      </>
    )
  }
}

HomePage.propTypes = {
  getBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getBook }
)(HomePage)