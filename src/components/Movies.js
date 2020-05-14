import React, { Component } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import MoviePoster from './MoviePoster';

export class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            ids: ['tt0111161', 'tt1375666', 'tt6751668', 'tt0816692', 'tt2582802',
                'tt0364569', 'tt0119217', 'tt1049413', 'tt5323662', 'tt8946378',
                'tt7286456', 'tt1431045', 'tt4154756', 'tt0245429', 'tt0266543']
        }
    }
    
    render(){
        return(
            <SRLWrapper>
                <div className="movies-main">
                    {this.state.ids.map(id => {
                        return <MoviePoster id={id}/>
                    })}
                </div>
            </SRLWrapper>
        )
    }
}

export default Movies;