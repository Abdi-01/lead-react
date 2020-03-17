import React from "react";
import '../assets/css/modal.css'
import { MDBModal, MDBIcon, MDBModalBody } from 'mdbreact';
// import { Link } from "react-router-dom";

class JumbotronPage extends React.Component {
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
            <div className="text-white jumbotronBG" style={{ width: '100%', height: '450px' }}>
                {/* <Link to='/CustomOrder'> */}
                <button className="element-BtCustom" style={{ marginTop: '390px', float: 'right', right: '-1px' }} onClick={this.toggle}>
                    <MDBIcon icon="edit" className="mr-2"></MDBIcon>
                    Custom Order
            </button>
                {/* </Link> */}
                <MDBModal contentClassName="modalBG" isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody>
                        <div id="sidesModal">
                            <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.toggle}>Cancel</button>
                            <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.loginUser}>Login</button>
                        </div>
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default JumbotronPage;