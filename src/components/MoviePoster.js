import React, { Component } from 'react';

const axios = require('axios');

export class MoviePoster extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            year: "",
            rated: "",
            runtime: "",
            director: "",
            plot: "",
            poster: "",
            imdbRating: "",
            lightboxVisible: false
        }
    }

    componentDidMount = () => {
        axios.get('https://www.omdbapi.com/?apikey=748f0661&i=' + this.props.id)
            .then(response => {
                this.setState({
                    title: response.data.Title,
                    director: response.data.Director,
                    poster: response.data.Poster,
                    imdbRating: response.data.imdbRating,
                    plot: response.data.Plot
                })
            })
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
                <img src={this.state.poster} alt={this.state.title} onClick={() => this.openLightbox()}/>
                <div className='movie-lightbox-overlay' style={this.getOverlayStyle()} onClick={() => this.closeLightbox()}></div>
                <div className='movie-lightbox' style={this.getLightboxStyle()}>
                    <img src={this.state.poster} alt={this.state.title}/>
                    <div className='movie-lightbox-text'>
                        <h2>{this.state.title}</h2>
                        <p>IMDb Rating: {this.state.imdbRating}</p>
                        <p>{this.state.plot}</p>
                        <p>Directed by {this.state.director}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviePoster;