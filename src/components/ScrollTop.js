import React, { Component } from 'react'

export class ScrollTop extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    
    componentDidMount = () => {
        document.addEventListener("scroll", (event) => {
            this.changeVisibity();
        })
    }

    addStyling = () => {
        if(this.state.visible){
            return {display: 'block'}
        }
        else{
            return {display: 'none'}
        }
    }

    changeVisibity = () => {
        let threshold = 300;
        if(window.pageYOffset > threshold){
            this.setState({visible: true})
        }
        else{
            this.setState({visible: false})
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    render(){
        return(
            <button className="scroll-top"
            style={this.addStyling()}
            onClick={() => this.scrollToTop()}>Scroll to Top</button>
        )
    }
}

export default ScrollTop;