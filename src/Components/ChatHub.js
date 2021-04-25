import React, { useEffect, useState, useContext, useRef} from 'react'
import { auth, db, adminId } from '../Config/Config'
import { Navbar } from './Navbar';
import { useHistory, useParams } from 'react-router-dom';
import { ProductsContext } from '../Global/ProductsContext';
import { ChatContext } from '../Global/ChatContext';
import { toast } from 'react-toastify';
toast.configure();



export const ChatHub = (props) => {
    const { conversation} = useContext(ChatContext);
    const history = useHistory();
    const messageRef = useRef(null);
    const {userId} = useParams(); 
    const {unRead, listMessageUnRead} = useContext(ChatContext)
    const text = (e) => {
        if(e.which === 13) message(e);
    }

    const message = (e) => {
        e.preventDefault(); 
        const messageContent = messageRef.current.value;
        if(!messageContent) return;
        const isAdmin = props.isAdmin ?  true : false;
        db.collection("ChatHub").add({
            avatar : props.avatar ? props.avatar : '',
            content: messageContent,
            isAdmin: isAdmin,
            userId: props.userId,
            from: (new Date()).getTime(),
            isRead: false
        })
        messageRef.current.value = '';
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
        console.log(listMessageUnRead);
    }, [conversation.length, listMessageUnRead.length, unRead]);

    return (
        <div className = "chat-wrapper">
            <div className="login" style = {{flex : 1}}>
                <Navbar user = {props.user} userId = {props.userId} avatar = {props.avatar} isAdmin = {props.isAdmin}/>
            </div>
            <div className='container chat-container' style ={{flex : 15}}>
                <div className="chat-content">
                    {conversation.map((m,i) => {
                        if ((m.userId !== userId && !m.isAdmin) || (userId !== adminId && m.isAdmin)){
                            return(
                                <div className="self-message" key = {i}>
                                    <div className="self-avatar">
                                        <img  className = "self-avatar-img" alt = "user" src = {props.avatar ? props.avatar : require('../images/user.png')}/>
                                    </div>
                                    <div className="self-text-message">
                                        <p className = "self-text-message-content">{m.content}</p>
                                    </div>
                                </div>

                            )
                        {/* if(!m.isAdmin) */}
                        }
                        else { 
                            return(
                                <div className="position-user-message" key = {i}>
                                    <div className="position-user-avatar">
                                        <img className = "position-user-avatar-img" alt = "user" src = { m.avatar ? m.avatar : require('../images/user.png')}/>
                                    </div>
                                    <div className="position-user-text-message">
                                        <p className = "position-user-text-message-content">{m.content}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="chat-input">
                    <div className="input-text">
                        <input ref = {messageRef} className = "input" placeholder="Message to admin" onKeyUp = {(e) => text(e)}/>
                        <button onClick = {(e) => message(e) } className = "btn btn-outline-primary">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
