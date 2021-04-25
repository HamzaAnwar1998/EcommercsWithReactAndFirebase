import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'
import { displayNumber } from '../Common';
import { ProductsContext } from '../Global/ProductsContext';
import { ChatContext } from '../Global/ChatContext';

export const Cart = ({ user, userId, avatar, isAdmin }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const { products, userProducts } = useContext(ProductsContext);
    const {unRead, listMessageUnRead} = useContext(ChatContext)


    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        });
        dispatch({type: 'SET_EXISTED_CART', products: products, userProducts: userProducts, userId : userId});
    }, [products.length, userProducts.length, userId]);

    return (
        <>
            <Navbar user={user} userId = {userId} avatar = {avatar} isAdmin={isAdmin}/>
            <>
                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to="/">Return to Home page</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.length > 0 ?  shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>{displayNumber(cart.ProductPrice)} VNĐ</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                {displayNumber(cart.TotalProductPrice)} VNĐ
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart, userId: userId })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    )) : null
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-outline-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Cash on delivery
                        </button>
                        </Link>
                    </div>}
                    <div className="nav-item active">
                        <Link className="nav-link btn btn-warning chat"  to = {`/chat/a31b82e2-a571-11eb-bcbc-0242ac130002`} style = {{color: 'white', marginRight: '15px'}}><i className="fa fa-commenting-o" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </>
        </>
    )
}