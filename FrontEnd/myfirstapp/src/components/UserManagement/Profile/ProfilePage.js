import React, { Component } from 'react'
import User from './User/User'
import Header from '../../Layout/Header'


class ProfilePage extends Component {

    render() {
        return (
            <div>
                <Header />
                <User/>      
            </div>
        )
    }
}
  
export default ProfilePage
