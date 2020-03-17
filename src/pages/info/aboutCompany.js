import React, { Component } from 'react';
import { MDBCol, MDBRow } from 'mdbreact';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <img src={require('../../image/sablon-manualB.jpg')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                <div className="tagLine">
                    <div>
                        <h2>LEAD Project ID </h2>
                        <h4 className="grey-text">" We can design, make and produce clothing needs for the community, agency or personal identity "</h4>
                    </div>
                    <div style={{ marginTop: '5%' }}>
                        <h2>Collaboration</h2>
                        <h4 className="grey-text">We collaborate with one of the local convection businesses from Lamongan, East Java.</h4>
                        <h4 className="grey-text">To contribute to the development of local businesses.</h4>
                        <MDBRow>
                            <MDBCol>
                                <div style={{ textAlign: 'right' }}>
                                    <img src={require('../../image/logoblack.png')} style={{ marginTop: 30 }} width='30%' height='150px' alt="imageAbout"></img>
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <div style={{ textAlign: 'left', marginLeft: 60 }}>
                                    <img src={require('../../image/logopcsb.png')} width='30%' height='220px' alt="imageAbout"></img>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </div>
                        <h2>LEAD X PCSart.co </h2>
                    <div className="d-flex justify-content-around" style={{ marginTop: '5%' }}>
                        {/* <tr style={{ width: '100%' }}> */}
                            <div>
                                {/* <th> */}
                                    <img src={require('../../image/leadteam/IMG_9998.jpg P.jpg')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                                {/* </th> */}
                            </div>
                            <div>
                            {/* <th> */}
                                <img src={require('../../image/leadteam/IMG_9984.jpg P.jpg')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                            {/* </th> */}
                            </div>
                            <div>
                            {/* <th> */}
                                <img src={require('../../image/leadteam/IMG_5072B.png')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                            {/* </th> */}
                            </div>
                            <div>
                            {/* <th> */}
                                <img src={require('../../image/leadteam/IMG_0003.jpg P.jpg')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                            {/* </th> */}
                            </div>
                            <div>
                            {/* <th> */}
                                <img src={require('../../image/leadteam/IMG_9993.jpg P.jpg')} className="objectFit" width='100%' height='500px' alt="imageAbout"></img>
                            {/* </th> */}
                            </div>
                        {/* </tr> */}
                        {/* <p className="grey-text text-center w-responsive mx-auto mb-5">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                            error amet numquam iure provident voluptate esse quasi, veritatis
                            totam voluptas nostrum quisquam eum porro a pariatur veniam.
                        </p> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default About;