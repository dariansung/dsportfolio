import React, { Component } from 'react';

export class GuestBookMessage extends Component {
    getDesc = () => {
        if (this.props.message.desc !== "") {
            return <p className="gb-msg-desc">{this.props.message.desc}</p>;
        }
    }

    render() {
        if (this.props.message.sendTo === "owner") {
            return null;
        }
        return (
            <div className="gb-msg">
                <div className="gb-msg-header">
                    <h3>{this.props.message.name}</h3>
                    {this.getDesc()}
                </div>
                <p className="gb-msg-date">{this.props.message.date}</p>
                <p className="gb-msg-text">{this.props.message.message}</p>
            </div>
        )
    }
}

export default GuestBookMessage;