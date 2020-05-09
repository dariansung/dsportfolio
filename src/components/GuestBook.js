import React, { Component } from 'react';
import GuestBookForm from './GuestBookForm';
import GuestBookMessageList from "./GuestBookMessageList"

export class GuestBook extends Component {
    render(){
        return(
            <div className="gb-main">
                <GuestBookForm/>
                <GuestBookMessageList/>
            </div>
        )
    }
}

export default GuestBook;