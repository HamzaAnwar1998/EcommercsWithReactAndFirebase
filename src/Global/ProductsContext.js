import React, { createContext } from 'react'
import { db } from '../Config/Config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: [],
        productTypes: []
    }

    componentDidMount() {

        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                        ProductType: change.doc.data().ProductType
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

        const productTypes = this.state.productTypes;
        db.collection('ProductType').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    productTypes.push({
                        Type: change.doc.data().Type,
                    })
                }
                this.setState({
                    productTypes: productTypes
                })
            })
        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products], productTypes: [...this.state.productTypes] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

