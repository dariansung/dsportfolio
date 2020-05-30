import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');

export class CreateList extends Component{
    constructor(props){
        super(props);
        this.state = {
            listName: ""
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let ref = firebase.database().ref('lists');
        ref.push(this.state.listName);
        this.setState({listName: ""})
    }

    render(){
        return(
            <div className="create-list-main">
                <form className="create-list-form" onSubmit={this.handleSubmit}>
                    <p>Enter list name:</p>
                    <input type="text" name="listName" onChange={this.handleChange} value={this.state.listName}/>
                    <button className="create-list-btn">Create List</button>
                </form>
            </div>
        )
    }
}

export default CreateList;