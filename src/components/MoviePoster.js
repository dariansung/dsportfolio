import React, { Component } from 'react';
import config from '../config';
const firebase = require('firebase');

export class MoviePoster extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableLists: [],
            lightboxVisible: false
        }
    }

    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.loadAvailableLists();
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

    loadAvailableLists = () => {
        let listsRef = firebase.database().ref('lists');
        let allLists = [];
        listsRef.on('value', snapshot => {
            snapshot.forEach(child => {
                allLists.push(child.val());
            })
        })

        let ref = firebase.database().ref('movies/' + this.props.movie.imdbId + '/lists');
        ref.on('value', snapshot => {
            snapshot.forEach(child => {
                let removeIndex = allLists.indexOf(child.key, 0);
                if(removeIndex >= 0){
                    allLists.splice(removeIndex, 1);
                }
            })
        })
        this.setState({availableLists: allLists});
    }

    addToList = (list) => {
        let ref = firebase.database().ref('movies/' + this.props.movie.imdbId + '/lists');
        ref.update({[list]: true});
        this.loadAvailableLists();
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
                        <div className="movie-lightbox-btns">
                            <div className="add-to-list-dropdown">
                                <button className="add-to-list-btn">Add to List</button>
                                <div className="add-to-list-options">
                                    {this.state.availableLists.map(list => {
                                        return <p onClick={() => this.addToList(list)}>{list}</p>
                                    })}
                                    <p style={this.state.availableLists.length === 0 ? {display: 'block'} : {display:'none'}}>No lists to add to</p>
                                </div>
                            </div>
                            <button className="delete-movie-btn" onClick={this.deleteMovie}>Delete Movie</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoviePoster;