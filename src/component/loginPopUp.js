import React from 'react';
import { Alert, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../redux/action'
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

        this.toggle = this.toggle.bind(this);
        this.toggleAlert1 = this.toggleAlert1.bind(this);
        this.toggleAlert2 = this.toggleAlert2.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleAlert1() {
        this.setState({
            alert1: !this.state.alert1
        });
    }
    toggleAlert2() {
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
            } else {
                this.props.login(username, password)//masuk authAction.js      
            }
        }
    }

    render() {
        return (
            <div style={{ marginRight: 10 }}>
                <div id="leftLogin">
                    <button className="element-BtLogin" onClick={this.toggle}>Login</button>
                    {/* <RegisPopUp></RegisPopUp> */}
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <div><h2 style={{textAlign:"center",paddingTop:10}}>Login Your Account</h2></div>
                    <Alert color="warning" isOpen={this.state.alert1} toggle={this.toggleAlert1}>
                        Fill in on the form!
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert2} toggle={this.toggleAlert2}>
                        Username or password invalid!
                    </Alert>
                    <ModalBody >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="username" name="email" innerRef={(text) => this.text = text} id="exampleEmail" placeholder="Username or Password" />
                            </FormGroup>
                            &nbsp;
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} id="examplePassword" placeholder="Password" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <a style={{textAlign:"center"}} href="aaa">Forgot Your Password ?</a>
                    <ModalFooter >
                        <Button color="primary" size ="sm" onClick={this.loginUser}>Login</Button>
                        <Button color="danger" size ="sm" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { login })(LoginPopUp)