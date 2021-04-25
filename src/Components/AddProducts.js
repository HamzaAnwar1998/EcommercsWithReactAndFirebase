import React, { useState, useEffect , useContext} from 'react'
import { db, auth } from '../Config/Config';
import { Navbar } from '../Components/Navbar';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../Global/ProductsContext';



export const AddProducts = ({user, userId, avatar, isAdmin}) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState('');
    const [productType, setProductType] = useState('Iphone');
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


    // const productImgHandler = (e) => {
    //     let selectedFile = e.target.files[0];
    //     if (selectedFile && types.includes(selectedFile.type)) {
    //         setProductImg(selectedFile);
    //         setError('')
    //     }
    //     else {
    //         setProductImg(null);
    //         setError('Please select a valid image type (jpg or png)');
    //     }
    // }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        // const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        // uploadTask.on('state_changed', snapshot => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log(progress);
        // }, err => setError(err.message)
        //     , () => {
        //         storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
        //             db.collection('Products').add({
        //                 ProductName: productName,
        //                 ProductPrice: Number(productPrice),
        //                 ProductImg: url
        //             }).then(() => {
        //                 setProductName('');
        //                 setProductPrice(0)
        //                 setProductImg('');
        //                 setError('');
        //                 document.getElementById('file').value = '';
        //             }).catch(err => setError(err.message))
        //         })
        //     })

        db.collection('Products').add({
            ProductName: productName,
            ProductPrice: Number(productPrice),
            ProductImg: productImg,
            ProductType: productType
        }).then(() => {
            setProductName('');
            setProductPrice(0)
            setProductImg('');
            setError('');
            document.getElementById('file').value = '';
        }).catch(err => setError(err.message));
        history.push('/');
    }

    return (
        <>

            <div className='wrapper'>
                <Navbar user={user} userId = {userId} avatar = {avatar} isAdmin = {isAdmin}/>
                <div className='container add-product-container'>
                    <br />
                    <h2>ADD PRODUCTS</h2>
                    <hr />
                    <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                        <label htmlFor="product-name">Product Name</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductName(e.target.value)} value={productName} />
                        <br />
                        <label htmlFor="product-price">Product Price</label>
                        <input type="number" className='form-control' required
                            onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                        <br />
                        <label htmlFor="product-img">Product Image</label>
                        <input type="text" className='form-control' id="file" required
                            onChange={(e) => setProductImg(e.target.value)} value = {productImg} />
                        <br />
                        <label htmlFor="product-type">Product Type</label>
                        <select onChange = {(e) => {setProductType(e.target.value)}} defaultValue = 'Iphone' className="form-select form-control" aria-label="Product Type" required>
                            {productTypes && productTypes.length ? productTypes.map((t,i) => {
                                return <option key = {i} value={t.Type}>{t.Type}</option>
                            }) : null}
                        </select>
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>Save</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                </div>
            </div>
        </>
    )
}
