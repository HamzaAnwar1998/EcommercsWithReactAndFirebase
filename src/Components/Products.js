import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { displayNumber, mobileTypeList } from '../Common';

export const Products = () => {

    const { products, productTypes } = useContext(ProductsContext);

    const { dispatch, shoppingCart } = useContext(CartContext);
    
    return (
        <>
            {/* {products.length !== 0 && <h1>Products</h1>} */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><h1>Products</h1></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    {productTypes && productTypes.length ? productTypes.map(type => 
                        <li className="nav-item active" key = {type.Type}>
                            <a className="nav-link" href="#">{type.Type}</a>
                        </li>
                    )
                    : null} 
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li> */}
                    </ul>
                </div>
                </nav>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            {displayNumber(product.ProductPrice)} VNĐ
                    </div>
                        {shoppingCart.find(c => c.ProductID === product.ProductID) ? 
                            <button  type = "button" className=' addcart-btn btn btn-secondary' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                            :
                            <button  type = "button" className=' addcart-btn btn btn-outline-primary' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}
