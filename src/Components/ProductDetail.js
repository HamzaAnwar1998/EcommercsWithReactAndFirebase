import React, { useEffect, useState, useContext} from 'react'
import { auth, db } from '../Config/Config'
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../Global/ProductsContext';



export const ProductDetail = (props) => {
    const history = useHistory();
    const [role, setRole] = useState('USER');
    const [productPrice, setProductPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productType, setProductType] = useState('');
    const [manHinh, setManHinh] = useState('');
    const [heDieuHanh, setHeDieuHanh] = useState('');
    const [cameraSau, setCameraSau] = useState('');
    const [cameraTruoc, setCameraTruoc] = useState('');
    const [chip, setChip] = useState('');
    const [ram, setRam] = useState('');
    const [boNhoTrong, setBoNhoTrong] = useState('');
    const [sim, setSim] = useState('');
    const [pin, setPin] = useState('');
    const [productSale, setProductSale] = useState(0);
    const [error, setError] = useState('');
    const query = history.location.pathname;
    const lastIndex  = query.lastIndexOf("/");
    const { productTypes, getProducts } = useContext(ProductsContext);
    const editProduct = (e) => {
        e.preventDefault();
        const productId = query.slice(lastIndex + 1, query.length);
        // console.log(productPrice, productName, productImg, productType, manHinh, heDieuHanh, cameraSau, cameraTruoc, chip, ram, boNhoTrong, sim, pin )
        let productRef = db.collection('Products').doc(productId)
        let result = productRef.update({
                    ProductName: productName,
                    ProductPrice: productPrice,
                    ProductImg: productImg,
                    ProductType: productType,
                    ManHinh: manHinh,
                    HeDieuHanh: heDieuHanh,
                    CameraSau: cameraSau,
                    CameraTruoc: cameraTruoc,
                    Chip: chip,
                    Ram: ram,
                    BoNhoTrong: boNhoTrong,
                    Sim: sim,
                    Pin: pin,
                    ProductSale: productSale
        }).then(()=>{
            getProducts()
            history.push('/')
        });   
    }
    
    useEffect(() => {
        const productId = query.slice(lastIndex + 1, query.length);
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
        db.collection("Products")
        .doc(productId)
        .get()
        .then(function(doc) {
        if (doc.exists) {
            const getDoc = doc.data();
            // eslint-disable-next-line no-unused-expressions
            getDoc.ProductName ? setProductName(getDoc.ProductName) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.ProductPrice ? setProductPrice(getDoc.ProductPrice) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.ProductImg ? setProductImg(getDoc.ProductImg) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.ProductType ? setProductType(getDoc.ProductType) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Ram ? setRam(getDoc.Ram) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Sim ? setSim(getDoc.Sim) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.ManHinh ? setManHinh(getDoc.ManHinh) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Pin ? setPin(getDoc.Pin) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.CameraSau ? setCameraSau(getDoc.CameraSau) :  null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.CameraTruoc ? setCameraTruoc(getDoc.CameraTruoc) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.HeDieuHanh ? setHeDieuHanh(getDoc.HeDieuHanh):null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.BoNhoTrong ? setBoNhoTrong(getDoc.BoNhoTrong) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.ProductSale ? setProductSale(getDoc.ProductSale) : null;
            // eslint-disable-next-line no-unused-expressions
            getDoc.Chip ? setChip(getDoc.Chip) : null;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });

    if(role === 'ADMIN')
        return (
            <div className = "login-wrapper">
                <div className="login" style = {{flex : 1}}>
                    <Navbar user = {props.user} />
                </div>
                <div className='container' style ={{flex : 10}}>
                    <br />
                    <h2>Product Detail</h2>
                    <br />
                    <form autoComplete="off" className='form-group' onSubmit={editProduct}>
                        <label htmlFor="productName">Product Name </label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductName(e.target.value)} value={productName} />
                        <br />
                        <label htmlFor="productPrice">Product Price</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                        <br />
                        <label htmlFor="productPrice">Product Image Link</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setProductImg(e.target.value)} value={productImg} />
                        <br />
                        <label htmlFor="productPrice">Sale</label>
                        <input type="number" className='form-control' 
                            onChange={(e) => setProductSale(e.target.value)} value={productSale} />
                        <br />
                        <label htmlFor="product-type">Product Type</label>
                        <select onChange = {(e) => {setProductType(e.target.value)}} value = {productType} className="form-select form-control" aria-label="Product Type" required>
                            {productTypes && productTypes.length ? productTypes.map((t,i) => {
                                return <option key = {i} value={t.Type}>{t.Type}</option>
                            }) : null}
                        </select>
                        <br />
                        <label htmlFor="manHinh">Screen</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setManHinh(e.target.value)} value={manHinh} />
                        <br />
                        <label htmlFor="heDieuHanh">Operate System</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setHeDieuHanh(e.target.value)} value={heDieuHanh} />
                        <br /><label htmlFor="cameraSau">Rear camera</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setCameraSau(e.target.value)} value={cameraSau} />
                        <br /><label htmlFor="cameraTruoc">Primary camera</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setCameraTruoc(e.target.value)} value={cameraTruoc} />
                        <br /><label htmlFor="chip">Chip</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setChip(e.target.value)} value={chip} />
                        <br /><label htmlFor="ram">RAM</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setRam(e.target.value)} value={ram} />
                        <br /><label htmlFor="boNhoTrong">Memory</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setBoNhoTrong(e.target.value)} value={boNhoTrong} />
                        <br /><label htmlFor="sim">SIM</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setSim(e.target.value)} value={sim} />
                        <br /><label htmlFor="pin">PIN</label>
                        <input type="text" className='form-control' 
                            onChange={(e) => setPin(e.target.value)} value={pin} />
                        <br />
                        <button type="submit" className='btn btn-success btn-md mybtn'>Edit</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                </div>
            </div>
        );
    else return (
        <div className = "login-wrapper">
                <div className="login" style = {{flex : 1}}>
                    <Navbar user = {props.user} />
                </div>
                <div className="container" style ={{flex : 10}}>
                    <div className="row">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">{productType}</li>
                        </ol>
                    </nav>
                    </div>
                    <div className='row border-bottom'>
                        <div className="col-md-8 col-sm-12">
                            <p style={{fontSize :'24px', color:'#212529', fontWeight:'bold'}}>{productName}</p>
                        </div>
                        <div className="col-md-4 col-sm-12 d-flex align-items-end">
                            {productSale > 0 ? (<>
                                <p style={{fontSize :'24px', fontWeight:'bold'}} class="text-success">{productPrice - productSale + 'đ'}</p>
                                <p style={{textDecorationLine:'line-through'}} class="text-secondary">{' ' + productPrice + 'đ'}</p></>
                            ) : ( <p style={{fontSize :'24px', fontWeight:'bold'}} class="text-success">{productPrice + 'đ'}</p>)}
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mt-3">
                            <div className="card shadow-sm bg-body rounded" style={{width: '100%'}}>
                                <img src = {productImg} alt="" className="card-img-top"/>
                                <div className="card-body d-flex justify-content-center">
                                <button class="btn btn-success">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 mt-3">
                            <div className="card shadow-sm bg-body rounded" style={{width: '100%'}}>
                            <div className="card-body">
                                <h5 className="card-title" style={{fontWeight: 'bold'}}>Thong So Ky Thuat</h5>
                                <table class="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>Screen</td>
                                        <td>{manHinh}</td>
                                    </tr>
                                    <tr>
                                        <td>Operate System</td>
                                        <td>{heDieuHanh}</td>
                                    </tr>
                                    <tr>
                                        <td>Rear Camera</td>
                                        <td>{cameraSau}</td>
                                    </tr>
                                    <tr>
                                        <td>Primary camera</td>
                                        <td>{cameraTruoc}</td>
                                    </tr>
                                    <tr>
                                        <td>Chip</td>
                                        <td>{chip}</td>
                                    </tr>
                                    <tr>
                                        <td>RAM</td>
                                        <td>{ram}</td>
                                    </tr>
                                    <tr>
                                        <td>Memory</td>
                                        <td>{boNhoTrong}</td>
                                    </tr>
                                    <tr>
                                        <td>SIM</td>
                                        <td>{sim}</td>
                                    </tr>
                                    <tr>
                                        <td>PIN</td>
                                        <td>{pin}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
