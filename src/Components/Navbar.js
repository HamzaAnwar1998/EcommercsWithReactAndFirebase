import React, { useContext, useEffect, useState } from 'react'
import logo from '../images/mobile.svg'
import { Link } from 'react-router-dom'
import { auth, db } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext';
import { ChatContext } from '../Global/ChatContext';

export const Navbar = ({ user, userId, avatar, isAdmin }) => {

    const history = useHistory();
    const { totalQty, dispatch} = useContext(CartContext);
    const { products, userProducts } = useContext(ProductsContext);
    const [isToggle, setIsToggle] = useState(false);
    const {unRead, listMessageUnRead, getData} = useContext(ChatContext)
    useEffect(() => {
        dispatch({type: 'SET_EXISTED_CART', products: products, userProducts: userProducts, userId : userId});
    }, [userId, products.length, userProducts.length, user, listMessageUnRead.length, unRead])

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    const goToOrders = () => {
        history.push('/orders')
    }

    const updateCheckMessage = (e, m) => {
        e.preventDefault();
        db.collection('ChatHub').where('toUserId', '==', m.userId).get()
        .then(snapshot => {
            snapshot.forEach(m => {
                db.collection('ChatHub').doc(m.id).update({
                    isRead: true
                }).then(()=>{
                    getData();
                })
                // console.log(m.id)
            })
        });
    }

    return (
        <div className='navbox'>
            <div className='leftside'>
                <Link to='/'>
                    {/* <img src={logo} alt="" /> */}
                    <img src="https://img.icons8.com/color/48/000000/ios-photos.png"/>
                </Link>
                <h1>Mobile Shopping Online</h1>
            </div>
            {!user && <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
                <span>
                    <img className="small-user-avatar" src = {avatar ? avatar : require('../images/user.png')} />
                    <Link to={`/user-detail/${userId}`} className='navlink'>{user}</Link>
                </span>
                <span style = {{position: 'relative'}} onClick = {(e) => setIsToggle(!isToggle)} className = "bell-icon"><i className="fa fa-bell-o bell" aria-hidden="true"></i>
                <span className='no-of-products'>{unRead}</span>
                </span>
                <span style = {{position: 'relative'}}><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link>
                <span className='no-of-products'>{totalQty}</span>
                </span>
                <span style = {{marginLeft: '10px'}}><button onClick = {goToOrders} type="button" className="btn btn-outline-dark">Orders <i className="fa fa-money" aria-hidden="true"></i></button></span>
                <span><button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button></span>
            </div>}
            <div className="noty-panel"  hidden = {!isToggle}>
                {listMessageUnRead ? listMessageUnRead.map((m, i) => {
                    if(isAdmin && !m.isAdmin){
                        return (
                            <div key = {i} className="noty-item">
                                <div className="noty-item-content" onClick = {(e) => updateCheckMessage(e, m)}>
                                    <Link to = {`/chat/${m.userId}`} className="noty-content">
                                        {m.formName} sent you a message
                                    </Link>
                                    <div className="noty-checked">

                                    </div>
                                </div>
                            </div>
                        )
                    }
                }): null}
            </div>
        </div>
    )
}
