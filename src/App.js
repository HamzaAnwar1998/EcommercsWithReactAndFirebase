import React, { Component } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import { NotFound } from './Components/NotFound'
import { auth, db } from './Config/Config'
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './Components/Cart'
import { AddProducts } from './Components/AddProducts'
import { Cashout } from './Components/Cashout'
import { AddProductType } from './Components/AddProductType';
import { ProductDetail } from './Components/ProductDetail';

export class App extends Component {

    state = {
        user: null,
        userId: null
    }

    componentDidMount() {

        // getting user info for navigation bar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        userId: user.uid,
                        user: snapshot.data().Name
                    })
                })
            }
            else {
                this.setState({
                    user: null
                })
            }
        })

    }

    render() {
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Switch>
                            {/* home */}
                            <Route exact path='/' component={() => <Home user={this.state.user} userId ={this.state.userId}/>} />
                            {/* signup */}
                            <Route path="/signup" component={() => <Signup history = {this.state} user={this.state.user} />} />
                            {/* login */}
                            <Route path="/login" component={() => <Login history = {this.state} user={this.state.user}/>} />
                            {/* cart products */}
                            <Route path="/cartproducts" component={() => <Cart user={this.state.user} userId = {this.state.userId} />} />
                            {/* add products */}
                            <Route path="/addproducts" component={() => <AddProducts user={this.state.user} userId ={this.state.userId} />} />
                            {/* add product type */}
                            <Route path="/addproduct-type" component={() => <AddProductType user={this.state.user} />} />
                            {/* cashout */}
                            <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                            {/* product detail */}
                            <Route path="/product-detail/:productId" component={() => <ProductDetail history = {this.state} user={this.state.user} userId ={this.state.userId}/> } />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        )
    }
}

export default App
