import React, { createContext } from 'react'
import { db , adminId} from '../Config/Config'

export const ChatContext = createContext();

export class ChatContextProvider extends React.Component {

    state = {
        conversation: [],
        unReadMessageCount: 0,
        listMessageUnRead: []
    }
    getData(){
        let conversationPrev = [];
        let unRead = 0;
        let listMessageUnRead = [];
        db.collection('ChatHub').orderBy("from").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                     
                    if(change.doc.data().userId !==  adminId){
                        db.collection('SignedUpUsersData').doc(change.doc.data().userId)
                        .get().then((doc) => {
                            conversationPrev = [{
                                messageId: change.doc.id,
                                isAdmin: change.doc.data().isAdmin  ,
                                content: change.doc.data().content,
                                userId: change.doc.data().userId,
                                avatar: doc.data().avatar,
                                from: (new Date()).getTime(),
                                isRead: change.doc.data().isRead,
                                formName: doc.data().Name,
                                toUserId: change.doc.data().toUserId
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
                                        formName: doc.data().Name,
                                        toUserId: change.doc.data().toUserId
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
                            formName: 'Admin',
                            toUserId: change.doc.data().toUserId
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
                                    formName: 'Admin',
                                    toUserId: change.doc.data().toUserId
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
    }
    componentDidMount() {
        this.getData = this.getData.bind(this);
        this.getData();
    }


    render() {
        return (
            <ChatContext.Provider  value={{ conversation: [...this.state.conversation], 
                    unRead: this.state.unReadMessageCount,
                    listMessageUnRead: this.state.listMessageUnRead,
                    getData: this.getData
            }}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

