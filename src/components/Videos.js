import React, { Component } from 'react'

export class Videos extends Component {
    render(){
        return(
            <div class="vid-main">
                <iframe width="420" height="315" 
                title="messing around"
                src="https://www.youtube.com/embed/O0vhOuBPOIw"></iframe>
                <iframe width="420" height="315" 
                title="Just The Two Of Us Guitar"
                src="https://www.youtube.com/embed/fnHDmEPs9z4"></iframe>
                <iframe width="420" height="315"
                title="Bruno Major - Nothing (Sam Kim Cover)"
                src="https://www.youtube.com/embed/m380-v03W8I"></iframe>
                <iframe width="420" height="315" 
                title="i miss you"
                src="https://www.youtube.com/embed/dPNVJZP3i5g"></iframe>
                <iframe width="420" height="315" 
                title="The Phantom of the Opera - Sungha Jung"
                src="https://www.youtube.com/embed/vn9ev6gAHW8"></iframe>
                <iframe width="420" height="315" 
                title="Easily x Bruno Major (Cover)"
                src="https://www.youtube.com/embed/cTbi0wlVRyQ"></iframe>
            </div>
        )
    }
}

export default Videos;