import React, { Component } from 'react';
import Home from './Home';
import Projects from './Projects';
import Images from './Images';
import Videos from './Videos';
import GuestBook from './GuestBook';
import Movies from './Movies';

export class Body extends Component {
    displayContent = () => {
        let activeTab = this.props.activeTab;
        if(activeTab === 1){
            return <Home/>
        }
        else if(activeTab === 2){
            return <Projects/>
        }
        else if(activeTab === 3){
            return <Images/>
        }
        else if(activeTab === 4){
            return <Videos/>
        }
        else if(activeTab === 5){
            return <GuestBook/>
        }
        else if(activeTab === 6){
            return <Movies/>
        }
    }
    
    render(){
        return(this.displayContent());
    }
}

export default Body;