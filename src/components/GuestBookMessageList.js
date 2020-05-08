import React, { Component } from 'react';
import GuestBookMessage from './GuestBookMessage';
import config from '../config';
const firebase = require('firebase');

export class GuestBookMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.loadMessages();
    }

    loadMessages = () => {
        let ref = firebase.database().ref('data');
        ref.orderByChild("dateMilli").on("value", snapshot => {
            const state = snapshot.val();
            let initialMessages = [];
            for(let item in state){
                initialMessages.push({
                    name: state[item].name,
                    desc: state[item].desc,
                    message: state[item].message,
                    sendTo: state[item].sendTo,
                    email: state[item].email,
                    date: state[item].date
                });
            }
            this.setState({messages: initialMessages});
        })
    }

    render(){
        return(
            <div className="msg-list">
                {this.state.messages.map((item) => {
                    return <GuestBookMessage message={item}/>
                })}
            </div>
        );
    }
}

export default GuestBookMessages;