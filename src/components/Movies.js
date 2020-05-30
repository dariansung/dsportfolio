import React, { Component } from 'react';
import config from '../config';
import MoviePoster from './MoviePoster';
const firebase = require('firebase');

export class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentList: "All",
            lists: ["All"],
            loadLimit: 8,
            loadMoviesStyle: {display: 'block'},
            numLoaded: 0,
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
            [e.target.name]: e.target.value,
            loadLimit: 8
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
        if(this.state.currentList === "All"){
            ref.limitToFirst(this.state.loadLimit).on('value', snapshot => {
                let dbMovies = [];
                let numLoaded = 0;
                snapshot.forEach(child => {
                    let matchesSearch = false;
                    if(this.state.movieSearch === "" || child.val().title.toLowerCase().includes(this.state.movieSearch.toLowerCase())) 
                        matchesSearch = true;
                    if(matchesSearch){
                        dbMovies.push({
                            imdbId: child.val().imdbId,
                            title: child.val().title,
                            director: child.val().director,
                            poster: child.val().poster,
                            imdbRating: child.val().imdbRating,
                            plot: child.val().plot
                        })
                        numLoaded++;
                    }
                })
                this.setState({movies: dbMovies});
                firebase.database().ref('movies').on('value', snapshot => {
                    let numMovies = 0;
                    snapshot.forEach(child => {
                        numMovies++;
                    })
                    if(numLoaded >= numMovies)
                        this.setState({loadMoviesStyle: {display: 'none'}});
                    else
                        this.setState({loadMoviesStyle: {display: 'block'}})
                })
            })
        }
        else{
            ref.on('value', snapshot => {
                let dbMovies = [];
                snapshot.forEach(child => {
                    let inList = false;
                    child.child('lists').forEach(listChild => {
                        if(this.state.currentList === listChild.key) 
                            inList = true;
                    })
                    let matchesSearch = false;
                    if(this.state.movieSearch === "" || child.val().title.toLowerCase().includes(this.state.movieSearch.toLowerCase())) 
                        matchesSearch = true;
                    if(inList && matchesSearch){
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
                this.setState({
                    movies: dbMovies,
                    loadMoviesStyle: {display: 'none'}
                })
            })
        }
    }

    loadMore = () => {
        this.setState({
            loadLimit: this.state.loadLimit + 8
        }, () => this.loadMovies());
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
                    <p>Search:</p>
                    <input type="text" name="movieSearch" onChange={this.handleChange} value={this.state.movieSearch}/>
                </div>
                <div className="movies-gallery">
                    {this.state.movies.map(item => {
                        return <MoviePoster movie={item}/>
                    })}
                </div>
                <button className="load-movies-btn" onClick={this.loadMore} style={this.state.loadMoviesStyle}>Load More</button>
            </div>
        )
    }
}

export default Movies;