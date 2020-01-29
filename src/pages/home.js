import React, { Component } from 'react';
import Jumbotron from '../component/jumbotron'
import Carousle from '../component/carousle'
import DivCard from '../component/leadDivisionCard'
import Collection from '../component/collectionPreview'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{marginBottom:"3%"}}>
                <div>
                    <div id='sides' className="col">
                        <div className="element-jumbotron " id="left" style={{ width: '55%' }} >
                            <Jumbotron></Jumbotron>
                        </div>
                        <div id="right" className='element-carousle ' style={{ width: '65%' }}>
                            <Carousle></Carousle>
                        </div>
                        {/* <div style={{maxWidth:'50%'}}>
                </div> */}
                    </div>
                </div>
                <div className="container tagLine">
                    <div>
                        <h2>Design, Create and Produce What You Need </h2>
                    </div>
                    <div style={{marginTop:'5%'}}>
                        <DivCard></DivCard>
                    </div>
                </div>
                <div className="container">
                    <Collection></Collection>
                </div>
            </div>
        );
    }
}

export default HomePage;