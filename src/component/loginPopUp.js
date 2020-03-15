import React from 'react';
import '../assets/css/modal.css'
import '../assets/css/alert.css'
import { MDBInput, MDBModal, MDBModalBody } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login, getCart } from '../redux/action'
import Swal from 'sweetalert2'

class LoginPopUp extends React.Component {
    state = {
        modal: false,
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
            if (username.includes("@") === false) {
                this.props.login(username, password)//masuk authAction.js

                // this.setState({ redirect: true })
            } else {
                this.props.login(username, password)//masuk authAction.js
                if (this.props.username) {
                    this.props.getCart()
                }
                // this.setState({ redirect: true })
            }
        }
    }
    render() {
        return (
            <div style={{ marginRight: 10 }}>
                <div id="leftLogin">
                    <button className="element-BtLogin" onClick={this.toggle}>Login</button>
                </div>
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
                                validate
                                error="wrong"
                                success="right"
                                inputRef={(text) => this.text = text}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                inputRef={(pass) => this.pass = pass}
                            />
                        </div>
                        <p style={{ margin: 0 }} className="font-small grey-text d-flex justify-content-end text-center">
                            Forgot
                            <a
                                href="#!"
                                className="dark-grey-text font-weight-bold ml-1"
                            >
                                Password?
                            </a>
                        </p>
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