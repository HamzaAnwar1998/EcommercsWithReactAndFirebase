import React, { useState, useEffect , useContext} from 'react'
import { db, auth } from '../Config/Config';
import { Navbar } from '../Components/Navbar';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../Global/ProductsContext';
import { toast } from 'react-toastify';
toast.configure();



export const AddProductType = ({user}) => {

    const [productType, setProductType] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const { productTypes } = useContext(ProductsContext);
    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })
    // add product
    const addProductType = (e) => {
        e.preventDefault();
        const check = productTypes.find(t => t.Type === productType); 
        if(check){
            toast.error('This product type is already existed', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return;
        }
        else{
            db.collection('ProductType').add({
                Type: productType
            }).then(() => {
                setProductType('');
                setError('');
            }).catch(err => setError(err.message));
            history.push('/')
            return;
        }
        
    }

    return (
        <>
            <div className='wrapper'>
                <Navbar user={user} />
                <div className='container add-product-container'>
                    <br />
                    <h2>ADD PRODUCT TYPE</h2>
                    <hr />
                    <form autoComplete="off" className='form-group' onSubmit={addProductType}>
                        <label htmlFor="product-type">Product Type</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductType(e.target.value)} value={productType} />
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>Save</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                </div>
            </div>
        </>
    )
}
