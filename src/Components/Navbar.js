import React, { useContext, useEffect } from 'react'
import logo from '../images/mobile.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext';

export const Navbar = ({ user, userId, avatar }) => {

    const history = useHistory();
    const { totalQty, dispatch} = useContext(CartContext);
    const { products, userProducts } = useContext(ProductsContext);

    useEffect(() => {
        dispatch({type: 'SET_EXISTED_CART', products: products, userProducts: userProducts, userId : userId});
        
    }, [userId, products.length, userProducts.length, user])

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
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
                <span style = {{position: 'relative'}}><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link>
                <span className='no-of-products'>{totalQty}</span>
                </span>
                <span><button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}
