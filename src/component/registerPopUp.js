import React from 'react';
import { Progress, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
// import { connect } from 'react-redux'
// import { login } from '../redux/action'
import { Redirect } from 'react-router-dom';
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

class RegisPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false,
            border: false,
            alert1: false,
            alert2: false,
            alert3: false,
            alert4: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleAlert1 = this.toggleAlert1.bind(this);
        this.toggleAlert2 = this.toggleAlert2.bind(this);
        this.toggleAlert3 = this.toggleAlert3.bind(this);
        this.toggleAlert4 = this.toggleAlert4.bind(this);
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
    toggleAlert3() {
        this.setState({
            alert3: !this.state.alert3
        });
    }
    toggleAlert4() {
        this.toggle()
        this.setState({
            alert4: !this.state.alert4
        });
        return <Redirect to='/'></Redirect>
    }

    regisUser = () => {
        var username = this.text.value
        var email = this.email.value
        var phone = this.phone.value
        var password = this.pass.value
        var confpassword = this.confpass.value
        if (username && email && password && confpassword && phone) {
            if (password !== confpassword) {
                this.setState({
                    alert2: !this.state.alert2
                });
            }
            else {
                Axios.get(API_URL + `/users/getSearchUsers?username=${username}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.length !== 0) {
                            this.setState({
                                alert1: !this.state.alert1
                            });
                        }
                        else if (password.length > 8) {
                            Axios.post(API_URL + `/users/register`, {
                                username: username,
                                password: password,
                                phone: phone,
                                email: email,
                                role: 'user'
                            })
                                .then((res) => {
                                    console.log('Regis Success' + res.data)
                                    this.setState({
                                        alert4: !this.state.alert4
                                    })
                                    Axios.get(API_URL + `/users/getAllUsers`)//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                        .then((res) => {
                                            console.log(res.data)
                                            this.setState({ data: res.data })//untuk mengubah isi state data
                                        })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        else {
                            alert('Passwordmu Kurang')
                        }

                    })
            }

        } else {
            this.setState({
                alert3: !this.state.alert3
            });
        }
    }

    ///cek password
    handleChange = (e) => {
        let pass = e.target.value
        let abjad = /[a-z]/
        let num = /[0-9]/
        let spec = /[$#@!%^&*()]/
        this.setState({
            abjad: abjad.test(pass),
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 7,
            border: (abjad.test(pass) && num.test(pass) && spec.test(pass) && (pass.length > 7))
        })
    }
    showReq = () => {
        this.setState({ show: true })
    }

    passwordMeter = () => {
        if (this.state.char) {
            if (this.state.abjad && this.state.num && this.state.spec) {
                return <Progress striped bar color="success" value="100">More than Stronger</Progress>
            }
            if ((this.state.abjad && this.state.num) || (this.state.abjad && this.state.spec) || (this.state.num && this.state.spec)) {
                return <Progress striped bar value="75">Strong</Progress>
            }
            else {
                return <Progress striped bar color="warning" value="25">Weak</Progress>
            }
        } else {
            return <Progress striped bar color="danger" value="100">Min. Password 8</Progress>
        }

    }

    render() {
        return (
            <div>
                <button id="rightRegis" className="element-BtRegis" onClick={this.toggle}>Register</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Register Your Account</ModalHeader>
                    <Alert color="warning" isOpen={this.state.alert1} toggle={this.toggleAlert1}>
                        Username has been taken
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert2} toggle={this.toggleAlert2}>
                        Invalid Password Confirmation
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert3} toggle={this.toggleAlert3}>
                        Please fill in all the forms!
                    </Alert>
                    <Alert color="success" isOpen={this.state.alert4} toggle={this.toggleAlert4}>
                        Successfully, please check your email to verification!
                    </Alert>
                    {/* <img src='' alt='ProfileImage'></img> */}
                    <ModalBody >
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Username
                                <Input type="username" name="username" innerRef={(text) => this.text = text} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Email
                                <Input type="email" name="email" innerRef={(email) => this.email = email} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Phone
                                <Input type="text" name="email" innerRef={(phone) => this.phone = phone} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                Password
                                <Input type="password" name="password" innerRef={(pass) => this.pass = pass} onChange={this.handleChange} onFocus={this.showReq} placeholder="Min. 8 Character" minLength="8" defaultValue="" />
                                <Progress multi style={{ width: 150 }}>
                                    {
                                        this.state.show
                                            ?
                                            this.passwordMeter()
                                            :
                                            null
                                    }
                                </Progress>
                                Confirm Your Password
                                <Input type="password" name="password" innerRef={(confpass) => this.confpass = confpass} placeholder="Confirmation Password" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="primary" onClick={this.regisUser}>Register</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegisPopUp