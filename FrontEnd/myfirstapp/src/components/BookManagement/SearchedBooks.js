import React, { Component } from 'react'
import Header from '../Layout/Header'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBook } from '../../actions/bookActions'

class SearchedBooks extends Component {

    constructor(props){
        super(props)
        this.state = {
            books : JSON.parse(localStorage.books),
            query: localStorage.query
        }
    }

    onSubmit(e,id){
        e.preventDefault();
        this.props.getBook(id, this.props.history)
    }

    render(){
        return (
          <>
            <div className='App'><Header/></div>
            {
                this.state.books.length === 0 ?
                <h1 className = 'search-results'> No results for '{this.state.query}'</h1> :
                <h1 className = 'search-results'>{this.state.books.length} books containing '{this.state.query}'</h1>
            }
            <div className='grid-container'>
            <Grid container spacing={3}>
            {
                this.state.books.map(
                book =>
                <Grid item xs={3} key={book.id}>
                    <Link
                        className='searched-book-card' to='/book' type='submit' onClick={e=>this.onSubmit(e,book.id)}>
                        <img key={book.id} src={book.image} alt={book.title} className='book-image'/>
                        <h1 className='book-title'>{book.title}</h1>
                        <div className='book-info'>
                        <h1 className='book-author'>Author: {book.author}</h1>
                        <h1 className='book-price'>Price: {book.price.toFixed(2)}</h1>
                        </div>
                    </Link>
                </Grid>
                )}
            </Grid>
            </div>
          </>
        )
    }
}

SearchedBooks.propTypes = {
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
  )(SearchedBooks)
