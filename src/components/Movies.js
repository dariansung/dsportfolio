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
            currentList: "All",
            lists: ["All"],
            movieSearch: "",
            movies: []
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.loadLists();
        this.loadMovies();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.loadMovies());
    }

    loadLists = () => {
        let ref = firebase.database().ref('lists');
        ref.on('value', snapshot => {
            let dbLists = ["All"];
            snapshot.forEach(child => {
                dbLists.push(child.val());
            })
            this.setState({lists: dbLists});
        })
    }

    loadMovies = () => {
        let ref = firebase.database().ref('movies');
        ref.orderByChild('title').on('value', snapshot => {
            let dbMovies = [];
            snapshot.forEach(child => {
                let inList = false;
                child.child('lists').forEach(listChild => {
                    if(this.state.currentList === listChild.key) inList = true;
                })
                let matchesSearch = false;
                if(this.state.movieSearch === "" || child.val().title.toLowerCase().includes(this.state.movieSearch.toLowerCase())) 
                    matchesSearch = true;
                if((this.state.currentList === "All" || inList) && matchesSearch){
                    dbMovies.push({
                        imdbId: child.val().imdbId,
                        title: child.val().title,
                        director: child.val().director,
                        poster: child.val().poster,
                        imdbRating: child.val().imdbRating,
                        plot: child.val().plot
                    })
                }
            })
            this.setState({movies: dbMovies});
        })
    }
    
    render(){
        return(
            <div className="movies-main">
                <div className="movies-bar">
                    <select name="currentList" onChange={this.handleChange}>
                        {this.state.lists.map(list => {
                            return <option value={list}>{list}</option>
                        })}
                    </select>
                    <input type="text" name="movieSearch" onChange={this.handleChange} value={this.state.movieSearch}/>
                </div>
                <div className="movies-gallery">
                    {this.state.movies.map(item => {
                        return <MoviePoster movie={item}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Movies;