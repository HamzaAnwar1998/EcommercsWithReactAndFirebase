import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { displayNumber, mobileTypeList } from '../Common';
import { Link } from 'react-router-dom'


export const Products = () => {
    
    const [category, setCategory] = useState('All');

    const [productCopy, setProductCopy] = useState([]);
    
    const { products, productTypes } = useContext(ProductsContext);
    
    const { dispatch, shoppingCart } = useContext(CartContext);

    const filterByType = (type) => {
        setCategory(type);
    }

    useEffect(()=> {
        if(category === 'All'){
            setProductCopy([...products]);
        }
        else{
            
            const clone = products.filter(p => p.ProductType === category);
            setProductCopy([...clone]);
        }
    }, [category])
    
    
    
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
                        {
                            category !== 'All' ? 
                            <li className="nav-item active">
                                <a className="nav-link btn btn-circle btn-secondary" type = "button" onClick = {(e) => filterByType('All')} style = {{color: 'white', marginRight: '15px'}}>All</a>
                            </li>
                            :
                            <li className="nav-item active">
                                <a className="nav-link btn btn-circle btn-success" type = "button" onClick = {(e) => filterByType('All')} style = {{color: 'white', marginRight: '15px'}}>All</a>
                            </li>
                        }


                        {productTypes && productTypes.length ? productTypes.map(type => 
                            category !== type.Type ? 
                            <li className="nav-item active" key = {type.Type}>
                                <a className="nav-link btn btn-circle btn-secondary" type = "button" onClick = {(e) => filterByType(type.Type)} style = {{color: 'white', marginRight: '15px'}}>{type.Type}</a>
                            </li>
                            :
                            <li className="nav-item active" key = {type.Type}>
                                <a className="nav-link btn btn-circle btn-success" type = "button" onClick = {(e) => filterByType(type.Type)} style = {{color: 'white', marginRight: '15px'}}>{type.Type}</a>
                            </li>
                        )
                        : null}
                         
                        <li className="nav-item active">
                            <Link className="nav-link btn btn-success add-type-product"  to = '/addproduct-type' style = {{color: 'white', marginRight: '15px'}}><i className="fa fa-plus-square" aria-hidden="true"></i></Link>
                        </li>

                    </ul>
                </div>
                </nav>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {productCopy && productCopy.length ? productCopy.map(product => (
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
                    
                ))
                : 
                <div className = "product-items">
                    No products of {category}
                </div>}
            </div>
            <div className="nav-item active">
                <Link className="nav-link btn btn-info add-product"  to = '/addproducts' style = {{color: 'white', marginRight: '15px'}}><i className="fa fa-plus" aria-hidden="true"></i></Link>
            </div>
        </>
    )
}
