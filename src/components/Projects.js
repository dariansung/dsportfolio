import React, { Component } from 'react'
import spotifyndfriends from '../images/spotifyndfriends.png'

export class Projects extends Component {
    render(){
        return(
            <div className="proj-main">
                <div className="proj-link">
                    <div className="proj-img">
                        <a href="https://spotifynd-friends.herokuapp.com/">
                            <img src={spotifyndfriends} 
                            alt="Spotifynd Friends"></img>
                        </a>
                    </div>
                    <div className="proj-textbox">
                        <div className="proj-text">
                            <p>This webapp analyzes Spotify playlists and measures their compatability which can then be used to make friends and find people to go to concerts with.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects;