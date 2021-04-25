import React, { createContext } from 'react'
import { db , adminId} from '../Config/Config'

export const ChatContext = createContext();

export class ChatContextProvider extends React.Component {

    state = {
        conversation: [],
        unReadMessageCount: 0,
        listMessageUnRead: []
    }

    componentDidMount() {
        let conversationPrev = this.state.conversation;
        let unRead = 0;
        let listMessageUnRead = this.state.listMessageUnRead;
        db.collection('ChatHub').orderBy("from").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                     
                    if(change.doc.data().userId !==  adminId){
                        db.collection('SignedUpUsersData').doc(change.doc.data().userId)
                        .get().then((doc) => {
                            conversationPrev = [{
                                messageId: change.doc.id,
                                isAdmin: change.doc.data().isAdmin,
                                content: change.doc.data().content,
                                userId: change.doc.data().userId,
                                avatar: doc.data().avatar,
                                from: (new Date()).getTime(),
                                isRead: change.doc.data().isRead,
                                formName: doc.data().Name
                            },...conversationPrev];
                            if(!change.doc.data().isRead){
                                unRead += 1;
                                listMessageUnRead = [
                                    {
                                        messageId: change.doc.id,
                                        isAdmin: change.doc.data().isAdmin,
                                        content:  change.doc.data().content,
                                        userId: change.doc.data().userId,
                                        avatar: doc.data().avatar,
                                        from: (new Date()).getTime(),
                                        isRead: change.doc.data().isRead,
                                        formName: doc.data().Name
                                    },...listMessageUnRead
                                ];
                            }
                            this.setState({
                                conversation: conversationPrev,
                                unReadMessageCount: unRead,
                                listMessageUnRead: listMessageUnRead
                            })
                        })
                    }
                    else{
                        conversationPrev = [{
                            messageId: change.doc.id,
                            isAdmin: change.doc.data().isAdmin,
                            content: change.doc.data().content,
                            userId: adminId,
                            avatar: change.doc.data().avatar,
                            from: (new Date()).getTime(),
                            isRead: change.doc.data().isRead,
                            formName: 'Admin'
                        },...conversationPrev];
                        if(!change.doc.data().isRead){
                            unRead += 1;
                            listMessageUnRead = [
                                {
                                    messageId: change.doc.id,
                                    isAdmin: change.doc.data().isAdmin,
                                    content: change.doc.data().content,
                                    userId: adminId,
                                    avatar: change.doc.data().avatar,
                                    from: (new Date()).getTime(),
                                    isRead: change.doc.data().isRead,
                                    formName: 'Admin'
                                },...listMessageUnRead
                            ];
                        }
                        this.setState({
                            conversation: conversationPrev,
                            unReadMessageCount: unRead,
                            listMessageUnRead: listMessageUnRead
                        })
                    }
                }
            });
        });

        // const userProducts = this.state.userProducts;
        // db.collection('UserProduct').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if (change.type === 'added') {
        //             userProducts.push({
        //                 userProduct: change.doc.id,
        //                 userId: change.doc.data().UserId,
        //                 productId: change.doc.data().ProductId,
        //             })
        //         }
        //         this.setState({
        //             userProducts: userProducts
        //         })
        //     });
        // })

        
        // const prevProducts = this.state.products;
        // db.collection('Products').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if (change.type === 'added') {
        //             prevProducts.push({
        //                 ProductID: change.doc.id,
        //                 ProductName: change.doc.data().ProductName,
        //                 ProductPrice: change.doc.data().ProductPrice,
        //                 ProductImg: change.doc.data().ProductImg,
        //                 ProductType: change.doc.data().ProductType,
        //                 ProductSale: change.doc.data().ProductSale,
        //             })
        //         }
        //         this.setState({
        //             products: prevProducts
        //         })
        //     })
        // })

        // const productTypes = this.state.productTypes;
        // db.collection('ProductType').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if (change.type === 'added') {
        //             productTypes.push({
        //                 Type: change.doc.data().Type,
        //             })
        //         }
        //         this.setState({
        //             productTypes: productTypes
        //         })
        //     })
        // })
    }


    render() {
        return (
            <ChatContext.Provider  value={{ conversation: [...this.state.conversation], 
                    unRead: this.state.unReadMessageCount,
                    listMessageUnRead: this.state.listMessageUnRead
            }}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

