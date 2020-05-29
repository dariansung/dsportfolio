import React, { Component } from 'react';
import config from '../config';
import MoviePoster from './MoviePoster';
const firebase = require('firebase');
let oldIds = ['tt0111161', 'tt1375666', 'tt6751668', 'tt0816692', 'tt2582802',
    'tt0364569', 'tt0119217', 'tt1049413', 'tt5323662', 'tt8946378',
    'tt7286456', 'tt1431045', 'tt4154756', 'tt0245429', 'tt0266543'];

export class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.loadMovies();
    }

    loadMovies = () => {
        let ref = firebase.database().ref('movies');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            let dbMovies = [];
            for(let id in state){
                dbMovies.push({
                    imdbId: state[id].imdbId,
                    title: state[id].title,
                    director: state[id].director,
                    poster: state[id].poster,
                    imdbRating: state[id].imdbRating,
                    plot: state[id].plot
                })
            }
            this.setState({movies: dbMovies});
        })
    }
    
    render(){
        return(
            <div className="movies-main">
                <div className="movies-bar">

                </div>
                <div className="movies-gallery">
                    {this.state.movies.map(item => {
                        return <MoviePoster movie={item} delete={this.handleDelete}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Movies;