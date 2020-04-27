import React, { Component } from 'react';
import profile from '../images/profile.png'

export class Home extends Component {
    render(){
        return(
            <div className="home-main">
                <div className="profile-img">
                    <img src={profile} alt="Profile"/>
                </div>
                <div>
                    <h2>About Me</h2>
                    <p>Hello! My name is Darian Sung and I am a second year computer science major at UCSB. In my free time, I like to play the guitar and watch bad movies.</p>
                </div>
            </div>
        );
    }
}

export default Home;