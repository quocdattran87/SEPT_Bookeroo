import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import Header from '../../../Layout/Header'
import moment from 'moment'
import { getBook } from '../../../../actions/bookActions'
import { getSeller } from '../../../../actions/userActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { CSVLink } from 'react-csv'


const headers = [
    {label: 'Id', key: 'id'},
    {label: 'ISBN', key: 'isbn'},
    {label: 'Title', key: 'title'},
    {label: 'Author', key: 'author'},
    {label: 'Genre', key: 'genre'},
    {label: 'Description', key: 'description'},
    {label: 'Price', key: 'price'},
    {label: 'Seller', key: 'seller'},
    {label: 'Create_At', key: 'create_At'}
]

class AllBooks extends Component {

    constructor(props){
        super(props)
        this.state = {
            books : JSON.parse(localStorage.books),
            csvReport: {
                filename: 'BookReport.csv',
                headers: headers,
                data: JSON.parse(localStorage.books)
            }
        }
    }

    onSubmit(e,input, option){
        e.preventDefault()
        if (option === 'getBook'){
            this.props.getBook(input, this.props.history)
        } else if (option === 'getSeller'){
            this.props.getSeller(input, this.props.history)
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
                                    <Link to='/dashboard'>
                                        <br/>
                                        <li className='list-group-item board'>
                                            Back 
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            <div className='col-lg-9 col-md-4 col-8'>
                                <div className='container'>    
                                    <div className='csv-button'>
                                        <h4>All Books</h4>    
                                        <div className='csv-button-1'>
                                            <CSVLink {...this.state.csvReport}>Export to CSV</CSVLink>
                                        </div>
                                    </div> 
                                    <table className = 'table table-striped'>
                                    <thead>
                                        <tr>
                                            <td> Title</td>
                                            <td> Author</td>
                                            <td> ISBN</td>
                                            <td> Seller</td>
                                            <td> Price</td>
                                            <td> Listed</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.books.map(
                                            book =>
                                            <tr key = {book.id}>
                                                <td> <Link to='' onClick={e=>this.onSubmit(e,book.id,'getBook')}>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</Link></td>
                                                <td> {book.author.charAt(0).toUpperCase() + book.author.slice(1)}</td>
                                                <td> {book.isbn}</td>
                                                <td> <Link to='' onClick={e=>this.onSubmit(e,book.seller,'getSeller')}>{book.seller.charAt(0).toUpperCase() + book.seller.slice(1)}</Link></td>
                                                <td> {book.price.toFixed(2)}</td>
                                                <td> {moment(book.create_At).fromNow()}</td>
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
AllBooks.propTypes = {
    getBook: PropTypes.func.isRequired,
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
    { getBook, getSeller }
)(AllBooks))