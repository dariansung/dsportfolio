import React, { Component } from 'react'

export class Header extends Component {
    headerText = () => {
        let id = this.props.activeTab;
        if(id === 1){
            return <h2>Darian Sung</h2>
        }
        else if (id === 2){
            return <h2>Projects</h2>
        }
        else if (id === 3){
            return <h2>Images</h2>
        }
        else if (id === 4){
            return <h2>Videos</h2>
        }
        else if (id === 5){
            return <h2>Guest Book</h2>
        }
        else if (id === 6){
            return <h2>Movies</h2>
        }
        else if (id === 7){
            return <h2>Add Movie</h2>
        }
    }
    
    render(){
        return(
            <div className="header">
                {this.headerText()}
            </div>
        )
    }
}

export default Header;