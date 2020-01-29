import React from 'react';
import { MDBInput, MDBModal, MDBModalBody } from 'mdbreact';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
import { Redirect } from 'react-router-dom';
// import Axios from 'axios'
// import RegisPopUp from './registerPopUp'

class LoginPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            alert1: false,
            alert2: false
        };
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleAlert1 = () => {
        this.setState({
            alert1: !this.state.alert1
        });
    }
    toggleAlert2 = () => {
        this.setState({
            alert2: !this.state.alert2
        });
    }

    loginUser = () => {
        var username = this.text.value
        var password = this.pass.value
        if (username === '' || password === '') {
            this.setState({
                alert1: !this.state.alert1
            });
        }
        else {
            if (username.includes("@") === false) {
                this.props.login(username, password)//masuk authAction.js
                if (this.props.username === null) {
                    this.setState({
                        alert2: !this.state.alert2
                    });
                } else {
                    return <Redirect to='/'></Redirect>
                }
            } else {
                this.props.login(username, password)//masuk authAction.js
                console.log(this.props.username)
                return <Redirect to='/'></Redirect>
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
                    <Alert color="warning" isOpen={this.state.alert1} toggle={this.toggleAlert1}>
                        Fill in on the form!
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert2} toggle={this.toggleAlert2}>
                        Username or password invalid!
                    </Alert>
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
                    <div id="sides">
                        <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.toggle}>Cancel</button>
                        <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.loginUser}>Login</button>
                    </div>
                </MDBModal>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStatetoProps, { login })(LoginPopUp)