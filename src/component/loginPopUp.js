import React from 'react';
import '../assets/css/modal.css'
import '../assets/css/alert.css'
import { MDBInput, MDBModal, MDBModalBody, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { login, getCart } from '../redux/action'
import Swal from 'sweetalert2'

class LoginPopUp extends React.Component {
    state = {
        modal: false,
        formPass: 'password'
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    loginUser = () => {
        var username = this.text.value
        var password = this.pass.value
        if (username === '' || password === '') {
            Swal.fire({
                text: 'Fill in on the form !',
                imageUrl: require('../image/ilustration/authentication.svg'),
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Custom image',
                width: 200,
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            // if (username.includes("@") === false) {
            //     this.props.login(username, password)//masuk authAction.js

            //     // this.setState({ redirect: true })
            // } else {
                this.props.login(username, password)//masuk authAction.js
                // if (this.props.username) { //DELETE KALO FIX GAG GUNA
                //     this.props.getCart()
                // }
                // this.setState({ redirect: true })
            // }
        }
    }

    visiblePass = (a) => {
        if (a === 'show') {
            this.setState({ formPass: 'text' })
        } else if (a === 'hide') {
            this.setState({ formPass: 'password' })
        }
    }

    render() {
        return (
            <div style={{ marginRight: 10 }}>
                {/* <div id="leftLogin"> */}
                    <button id="leftLogin" className="element-BtLogin" onClick={this.toggle}>Login</button>
                {/* </div> */}
                <MDBModal contentClassName="modalBG" isOpen={this.state.modal} toggle={this.toggle}>
                    <div className="text-center headerModalBG" >
                        <img src={require('../image/lead.png')} style={{ padding: 3 }} width="40px" alt="leadlogo"></img>
                    </div>
                    <MDBModalBody>
                        <p className="h5 text-center mb-4">Login</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your username or email"
                                icon="user"
                                group
                                type="text"
                                inputRef={(text) => this.text = text}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type={this.state.formPass}
                                inputRef={(pass) => this.pass = pass}
                            >
                                <p style={{ marginTop: -34, cursor: 'pointer' }} className="font-small grey-text d-flex justify-content-end text-center">
                                    {this.state.formPass === 'password'
                                        ?
                                        <span onClick={() => this.visiblePass('show')} className="material-icons">
                                            visibility</span>
                                        :
                                        <span onClick={() => this.visiblePass('hide')} className="material-icons">
                                            visibility_off</span>
                                    }
                                </p>
                            </MDBInput>
                        </div>
                    </MDBModalBody>
                    <div id="sidesModal">
                        <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.toggle}>Cancel</button>
                        <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.loginUser}>Login</button>
                    </div>
                </MDBModal>
            </div>
        )
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        ...user
    }
}

export default connect(mapStatetoProps, { login, getCart })(LoginPopUp)