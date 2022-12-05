import React, { Component } from 'react'
import Header from '../Layout/Header'

class PaymentSuccess extends Component {

    render(){
        return(
            <div>
                <Header/>
                <div className='payment-success'>
                    <h1>Payment Success!</h1>
                    <h2>Thank you for your purchase.</h2>
                    <h2>Check the status of your order in your profile.</h2>
                </div>
            </div>
        )
    }
}

export default PaymentSuccess