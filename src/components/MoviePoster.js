import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');

export class MoviePoster extends Component {
    constructor(props){
        super(props);
        this.state = {
            lightboxVisible: false
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    deleteMovie = () => {
        let ref = firebase.database().ref('movies/' + this.props.movie.imdbId);
        ref.remove()
            .then(() => {
                console.log(this.props.movie.imdbId + " removed");
            })
            .catch(error => {
                console.log("Removal error: " + error.message);
            })
        this.closeLightbox();
    }

    getOverlayStyle = () => {
        let disp = 'none';
        if(this.state.lightboxVisible)
            disp = 'flex';
        return ({
            display: disp,
            position: 'fixed',
            zIndex: 100,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.5})`,
            justifyContent: 'center',
            alignItems: 'center'
        })
    }

    getLightboxStyle = () => {
        let disp = 'none';
        if(this.state.lightboxVisible)
            disp = 'flex';
        return ({
            display: disp
        })
    }

    openLightbox = () => {
        let scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        window.onscroll = function(){
            this.window.scrollTo(scrollX, scrollY);
        }
        this.setState({
            lightboxVisible: true
        })
    }

    closeLightbox = () => {
        window.onscroll = function(){}
        this.setState({
            lightboxVisible: false
        })
    }
    
    render(){
        return (
            <div className='poster'>
                <img src={this.props.movie.poster} alt={this.props.movie.title} onClick={() => this.openLightbox()}/>
                <div className='movie-lightbox-overlay' style={this.getOverlayStyle()} onClick={() => this.closeLightbox()}></div>
                <div className='movie-lightbox' style={this.getLightboxStyle()}>
                    <img src={this.props.movie.poster} alt={this.props.movie.title}/>
                    <div className='movie-lightbox-text'>
                        <h2>{this.props.movie.title}</h2>
                        <p>IMDb Rating: {this.props.movie.imdbRating}</p>
                        <p>{this.props.movie.plot}</p>
                        <p>Directed by {this.props.movie.director}</p>
                        <button className="delete-movie-btn" onClick={this.deleteMovie}>Delete Movie</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviePoster;