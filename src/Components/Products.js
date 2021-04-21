import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { displayNumber } from '../Common';
import { Link } from 'react-router-dom'


export const Products = ({userId}) => {
    
    const [category, setCategory] = useState('All');

    const [productCopy, setProductCopy] = useState([]);
    
    const { products, productTypes, userProducts, deleteProduct } = useContext(ProductsContext);
    
    const { dispatch, shoppingCart } = useContext(CartContext);

    const filterByType = (type) => {
        setCategory(type);
    };

    const _delete = (e, p) => {
        e.preventDefault();
        deleteProduct(p);
    }

    useEffect(()=> {
        products.map(p => {
            
            const checkAdd  = userProducts.find(up => (up.productId === p.ProductID && userId === up.userId))
            if(checkAdd) p.isAdded = true;
            else p.isAdded = false;
            return p;
        })
        if(category === 'All'){
            setProductCopy([...products]);
        }
        else{
            
            const clone = products.filter(p => p.ProductType === category);
            setProductCopy([...clone]);
        }
    }, [category, userProducts.length, userId, shoppingCart.length, products.length])
    
    
    
    return (
        <>
            {/* {products.length !== 0 && <h1>Products</h1>} */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><h1 style= {{padding: 0}}>Products</h1></a>
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


                        {productTypes && productTypes.length ? productTypes.map((type, i) => 
                            category !== type.Type ? 
                            <li className="nav-item active" key = {i}>
                                <a className="nav-link btn btn-circle btn-secondary" type = "button" onClick = {(e) => filterByType(type.Type)} style = {{color: 'white', marginRight: '15px'}}>{type.Type}</a>
                            </li>
                            :
                            <li className="nav-item active" key = {i}>
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
                    <div key={product.ProductID}>
                        <div className='product-card'>
                            <div className='product-img'>
                                <img src={product.ProductImg} alt="not found" />
                                {product.ProductSale ? 
                                    <div className = "discount">
                                        Sale {displayNumber(product.ProductSale)}đ
                                    </div>
                                : null}
                            </div>
                            <div className='product-name'>
                                {product.ProductName}
                            </div>
                            <div className='product-price'>
                                {displayNumber(product.ProductPrice) }  VNĐ
                                
                            </div>
                             
                            <button className="btn btn-danger delete-product" onClick = {(e) => _delete(e, product)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                            
                            <div className="button-group row" style = {{width: '100%'}}>
                                {shoppingCart.find(c => c.ProductID === product.ProductID) || product.isAdded ? 
                                    <button  type = "button" className=' addcart-btn btn btn-secondary col col-sm-12 col-md-6' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product, userId: userId })}>ADD TO CART</button>
                                    :
                                    <button  type = "button" className=' addcart-btn btn btn-outline-primary col col-sm-12 col-md-6' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product, userId: userId })}>ADD TO CART</button>
                                }
                                    <Link type="button" className="addcart-btn btn btn-outline-warning col col-sm-12 col-md-6" to = {`/product-detail/${product.ProductID}`}> OPEN </Link>
                            </div>
                        </div>
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
