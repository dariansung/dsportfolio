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
            imdbRating: ""
        }
    }

    componentDidMount = () => {
        axios.get('http://www.omdbapi.com/?apikey=748f0661&i=' + this.props.id)
            .then(response => {
                this.setState({
                    title: response.data.Title,
                    director: response.data.Director,
                    poster: response.data.Poster,
                    imdbRating: response.data.imdbRating
                })
            })
    }

    getDescription = () => {
        return this.state.title + ", Director: " + this.state.director + ", IMDb Rating: " + this.state.imdbRating;
    }
    
    render(){
        return (
            <img src={this.state.poster} alt={this.getDescription()} onClick={this.openLightbox()}/>
        )
    }
}

export default MoviePoster;