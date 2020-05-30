import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');
const axios = require('axios');

export class AddMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            imdbId: ""
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
        axios.get('https://www.omdbapi.com/?apikey=748f0661&i=' + this.state.imdbId)
            .then(response => {
                let ref = firebase.database().ref('movies/' + this.state.imdbId);
                ref.set({
                    imdbId: this.state.imdbId,
                    title: response.data.Title,
                    director: response.data.Director,
                    poster: response.data.Poster,
                    imdbRating: response.data.imdbRating,
                    plot: response.data.Plot
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <div className="add-movie-main" onSubmit={this.handleSubmit}>
                <form className="add-movie-form">
                    <input type="text" name="imdbId" onChange={this.handleChange} value={this.state.imdbId} />
                    <button className="add-movie-btn">Add Movie</button>
                </form>
            </div>
        )
    }
}

export default AddMovie;