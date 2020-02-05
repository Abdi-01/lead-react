import React from 'react';
import '../assets/css/modal.css'
import { Alert } from 'reactstrap';
import { MDBInput, MDBModal, MDBModalBody, MDBProgress } from 'mdbreact';
// import { connect } from 'react-redux'
// import { login } from '../redux/action'
import { Redirect } from 'react-router-dom';
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

class RegisPopUp extends React.Component {
    state = {
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
    }
    toggle = (a) => {
        if (a === 0) {
            this.setState({
                modal: !this.state.modal,
                num: false,
                spec: false,
                show: false,
                abjad: false,
                char: false
            })
        }
        if (a === 1) {
            this.setState({ alert1: !this.state.alert1 })
        }
        if (a === 2) {
            this.setState({ alert2: !this.state.alert2 })
        }
        if (a === 3) {
            this.setState({ alert3: !this.state.alert3 })
        }
        if (a === 4) {
            this.toggle(0)
            this.setState({ alert4: !this.state.alert4 })
            return <Redirect to='/'></Redirect>
        }
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
                return <MDBProgress className="my-2" material value={100} color="success">More than Stronger</MDBProgress>
            }
            if ((this.state.abjad && this.state.num) || (this.state.abjad && this.state.spec) || (this.state.num && this.state.spec)) {
                return <MDBProgress className="my-2" material value={75} color="info">Strong</MDBProgress>
            }
            else {
                return <MDBProgress className="my-2" material value={35} color="warning">Weak</MDBProgress>
            }
        } else {
            return <MDBProgress className="my-2" material value={100} color="danger">Minimum 8 Character</MDBProgress>
        }

    }

    render() {
        return (
            <div>
                <button id="rightRegis" className="element-BtRegis" onClick={() => this.toggle(0)}>Register</button>
                <MDBModal contentClassName="modalBG" isOpen={this.state.modal} toggle={this.toggle}>
                    <Alert color="warning" isOpen={this.state.alert1} toggle={() => this.toggle(1)}>
                        Username has been taken
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert2} toggle={() => this.toggle(2)}>
                        Invalid Password Confirmation
                    </Alert>
                    <Alert color="warning" isOpen={this.state.alert3} toggle={() => this.toggle(3)}>
                        Please fill in all the forms!
                    </Alert>
                    <Alert color="success" isOpen={this.state.alert4} toggle={() => this.toggle(4)}>
                        Successfully, please check your email to verification!
                    </Alert>
                    <div className="text-center headerModalBG" >
                        <img src={require('../image/lead.png')} style={{ padding: 3 }} width="40px" alt="leadlogo"></img>
                    </div>
                    <MDBModalBody>
                        <p className="h5 text-center mb-4">Register</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your username"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                inputRef={(text) => this.text = text}
                            />
                            <MDBInput
                                label="Type your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                inputRef={(email) => this.email = email}
                            />
                            <MDBInput
                                label="Type your phone"
                                icon="phone"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                inputRef={(phone) => this.phone = phone}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                onChange={this.handleChange}
                                onFocus={this.showReq}
                                type="password"
                                validate
                                inputRef={(pass) => this.pass = pass}
                                style={{ marginBottom: 0 }}
                            >
                                <div style={{ width: 150, marginLeft: 40 }}>
                                    {
                                        this.state.show
                                            ?
                                            this.passwordMeter()
                                            :
                                            null
                                    }
                                </div>
                            </MDBInput>
                            <MDBInput
                                label="Confirm your password"
                                icon="exclamation-triangle"
                                group
                                type="password"
                                validate
                                inputRef={(confpass) => this.confpass = confpass}
                            />
                        </div>
                    </MDBModalBody>
                    <div id="sidesModal">
                        <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.toggle(0)}>Cancel</button>
                        <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.regisUser}>Register</button>
                    </div>
                </MDBModal>
            </div>
        )
    }
}

export default RegisPopUp