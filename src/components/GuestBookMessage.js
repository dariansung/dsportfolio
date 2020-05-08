import React, { Component } from 'react';

export class GuestBookMessage extends Component {
    getDesc = () => {
        if(this.props.desc){
            return <p>{this.props.desc}</p>
        }
    }

    render(){
        return(
            <div className="gb-msg">
                <h3>{this.props.message.name}</h3>
                <p>{this.props.message.date}</p>
                {this.getDesc()}
                <p>{this.props.message.message}</p>
            </div>
        )
    }
}

export default GuestBookMessage;