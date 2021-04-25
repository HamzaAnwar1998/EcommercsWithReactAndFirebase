import React, { useEffect, useState, useContext} from 'react'
import { auth, db } from '../Config/Config'
import { Navbar } from './Navbar';
import { useHistory, useParams } from 'react-router-dom';
import { ProductsContext } from '../Global/ProductsContext';
import { toast } from 'react-toastify';
toast.configure();



export const UserDetail = (props) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');
    const query = history.location.pathname;
    const lastIndex  = query.lastIndexOf("/");
    const { productTypes, getProducts, userProducts } = useContext(ProductsContext);
    const {userId} = useParams(); 
    const updatedUser = (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            toast.error('Password not match!!!');
            return;
        }
        let userRef = db.collection('SignedUpUsersData').doc(userId);
        userRef.update({
            Name: name,
            Email: email,
            Password: password,
            Avatar: avatar
        }).then(()=>{
            props.reGetUser();
            history.push(`/`)
        });
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
        
        db.collection("SignedUpUsersData")
        .doc(userId)
        .get()
        .then(function(doc) {
        if (doc.exists) {
            const getDoc = doc.data();
            // eslint-disable-next-line no-unused-expressions
            getDoc.Name ? setName(getDoc.Name) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Email ? setEmail(getDoc.Email) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Password ? setPassword(getDoc.Password) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Avatar ? setAvatar(getDoc.Avatar) : null;
            // eslint-disable-next-line no-unused-expressions
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }, [userProducts.length]);

    return (
        <div className = "login-wrapper">
            <div className="login" style = {{flex : 1}}>
                <Navbar user = {props.user} userId = {props.userId} avatar = {avatar} isAdmin = {props.isAdmin}/>
            </div>
            <div className='container user-container' style ={{flex : 10}}>
                <br />
                <h2>User Detail</h2>
                <br />
                <div className="user-information">
                    <div className="avatar">
                        <div className="avatar-img">
                            {!avatar ? 
                                <img src = {require('../images/user.png')} alt = "user"/>
                               :
                                <img src = {avatar} alt = "avatar" />
                            }
                        </div>
                    </div>
                    <div className="form-user">
                        <form autoComplete="off" className='form-group user-form' onSubmit={(e) => updatedUser(e)}>
                            <label htmlFor="name">Name</label>
                            <input type="text" className='form-control' required
                                onChange={(e) => setName(e.target.value)} value={name} />
                            <br />
                            <label htmlFor="email">Email</label>
                            <input type="email" className='form-control' required
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                            <br />
                            <label htmlFor="passowrd">Password</label>
                            <input type="password" className='form-control' required
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <br />
                            <label htmlFor="confirmPassowrd">Confirm Password</label>
                            <input type="password" className='form-control' required
                                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                            <br />
                            <label htmlFor="avatar">Avatar Link</label>
                            <input type="text" className='form-control' required
                                onChange={(e) => setAvatar(e.target.value)} value={avatar} />
                            <br />
                            <button type="submit" className='btn btn-success btn-md mybtn'>Save</button>
                        </form>
                    </div>

                </div>
                {/* {error && <span className='error-msg'>{error}</span>} */}
            </div>
        </div>
    )
}
