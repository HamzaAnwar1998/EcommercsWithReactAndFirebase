import React, { useState } from 'react'
import { auth } from '../Config/Config'
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'


export const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            history.push('/');
        }).catch(err => setError(err.message));
    }

    return (
        <div className = "login-wrapper">
            <div className="login" style = {{flex : 2}}>
                <Navbar user = {props.user} />
            </div>
            <div className='container' style ={{flex : 8}}>
                <br />
                <h2>Login</h2>
                <br />
                <form autoComplete="off" className='form-group' onSubmit={login}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' required
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
                <br/>
                <span>Don't have an account? Register
                    <Link to="signup"> Here</Link>
                </span>
            </div>
        </div>
    )
}
