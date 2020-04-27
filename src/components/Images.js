import React, { Component } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import SAD2020Mendoba from '../images/SAD2020Mendoba.jpeg'
import beachstar from '../images/beachstar.jpeg'
import thanksgivingchapel2019 from '../images/thanksgivingchapel2019.jpeg'
import kayaking from '../images/kayaking.jpeg'
import uwu from '../images/uwu.jpg'
import banquet2019 from '../images/banquet2019.jpeg'

export class Images extends Component {
    render(){
        return(
            <SRLWrapper>
                <div className="img-main">
                    <div>
                        <img src={SAD2020Mendoba}
                        alt="SAD 2020 Mendoba"></img>
                    </div>
                    <div>
                        <img src={beachstar}
                        alt="Beach Star"></img>
                    </div>
                    <div>
                        <img src={thanksgivingchapel2019}
                        alt="Thanksgiving Chapel 2019"></img>
                    </div>
                    <div>
                        <img src={kayaking}
                        alt="Kayaking"></img>
                    </div>
                    <div>
                        <img src={uwu}
                        alt="uwu"></img>
                    </div>
                    <div>
                        <img src={banquet2019}
                        alt="Banquet 2019"></img>
                    </div>
                </div>
            </SRLWrapper>
        );
    }
}

export default Images;