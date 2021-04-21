import React, { useEffect } from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Home = ({ user, userId }) => {

    const history = useHistory();

    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <div className=' wrapper home-wrapper'>
            <div className="home-item" style = {{flex : 1}}>
                <Navbar user={user} userId = {userId} />
            </div>
            <div className="home-item" style = {{flex : 15}}>
                <Products userId = {userId} />
            </div>
        </div>
    )
}
