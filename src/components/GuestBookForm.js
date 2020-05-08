import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');

export class GuestBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            message: "",
            sendTo: "owner",
            email: "",
            errorMessage: ""
        }
    }

    componentDidMount = () => {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      } 
    }

    getCurrentDate(){
        let d = new Date();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let year = d.getFullYear();
        let hour = d.getHours();
        let minutes = d.getMinutes();
        let meridian;
        if(hour > 11){
            meridian = "PM";
            if(hour !== 12)
                hour -= 12;
        } else{
            meridian = "AM";
            if(hour === 0)
                hour = 12;
        }
        return month + "/" + day + "/" + year + " " + hour + ":" + minutes + " " + meridian;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleError = () => {
        if(this.state.name.length <= 5){
            this.setState({errorMessage: "Name must be longer than 5 characters"});
            return true;
        }
        else if(this.state.name.length >= 20){
            this.setState({errorMessage: "Name must be less than 19 characters"});
            return true;
        }
        else if(this.state.message.length <= 15){
            this.setState({errorMessage: "Message must have more than 15 characters"});
            return true;
        }
        else if(this.state.message.length >= 500){
            this.setState({errorMessage: "Message must be shorter than 500 characters"});
            return true;
        }
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let hasError = this.handleError();
        if(hasError) return;

        let date = this.getCurrentDate();
        let dateMilli = new Date().getTime() * -1;
        const submission = {
            name: this.state.name,
            desc: this.state.desc,
            message: this.state.message,
            sendTo: this.state.sendTo,
            email: this.state.email,
            date: date,
            dateMilli: dateMilli
        }
        let ref = firebase.database().ref('data');
        ref.push(submission);
        this.setState({
            name: "",
            desc: "",
            message: "",
            sendTo: "owner",
            email: ""
        })
        alert("Message sent!");
    }

    render() {
        return (
            <div className="msg-form">
                <form onSubmit={this.handleSubmit}>
                    <p>Name:</p>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                    <p>Brief Description of Yourself:</p>
                    <input type="text" name="desc" onChange={this.handleChange} value={this.state.desc}/>
                    <p>Message:</p>
                    <input type="text" name="message" onChange={this.handleChange} value={this.state.message}/>
                    <p>Who would you like to see this message?</p>
                    <select name="sendTo" onChange={this.handleChange} value={this.state.sendTo}>
                        <option value="owner">Site owner(Darian Sung)</option>
                        <option value="public">All website visitors</option>
                    </select>
                    <p>Email:</p>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                    <p></p>
                    <button>Submit</button>
                </form>
                <p>{this.state.errorMessage}</p>
            </div>
        )
    }
}

export default GuestBookForm;