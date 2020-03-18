import React, { Component } from 'react';
import '../assets/css/home.css'
import '../assets/css/modal.css'
import { MDBModal, MDBIcon } from 'mdbreact';
import { Link } from "react-router-dom";
import Carousle from '../component/carousle'
import DivCard from '../component/leadDivision'
import Collection from '../component/collectionPreview'

class HomePage extends Component {
    state = {
        modal: false,
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div style={{ marginBottom: "3%" }}>
                <div>
                    <div id='sides' className="col">
                        <div className="element-jumbotron " id="left" style={{ width: '55%' }} >
                            <div className="text-white jumbotronBG" style={{ width: '100%', height: '450px' }}>
                                <button className="element-BtCustom" style={{ marginTop: '390px', float: 'right', right: '-1px' }} onClick={this.toggle}>
                                    <MDBIcon icon="edit" className="mr-2"></MDBIcon>
                                                Custom Order
                                </button>
                            </div>
                        </div>
                        <div id="right" className='element-carousle ' style={{ width: '65%' }}>
                            <Carousle></Carousle>
                        </div>
                    </div>
                </div>
                <div className="container tagLine">
                    <div>
                        <h2>Design, Create and Produce What You Need </h2>
                    </div>
                    <div style={{ marginTop: '5%' }}>
                        <DivCard></DivCard>
                    </div>
                </div>
                <div className="container text-center">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Our bestsellers
                    </h2>
                    <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p>
                    <div>
                        <Collection></Collection>
                    </div>
                </div>
                <MDBModal centered contentClassName="modalBG" isOpen={this.state.modal} toggle={this.toggle}>
                    <div id="sidesModal">
                        <Link to='/CustomOrder'>
                            <button className="element-FormCancel text-center" id="leftForm" style={{ height: "200px", width: "54%", padding: '0' }} onClick={this.toggle}>
                                <i className="fas fa-upload fa-6x"></i><p>Upload Design</p></button>
                        </Link>
                        {/* <Link to='/CustomDesign'> */}
                        <button className="element-FormLogin text-center" id="rightForm" style={{ height: "200px", width: "54%", padding: '0' }} onClick={this.loginUser}>
                            <i className="fas fa-edit fa-6x"></i><p>Make Your Design</p></button>
                        {/* </Link> */}
                    </div>
                </MDBModal>
            </div>
        );
    }
}

export default HomePage;