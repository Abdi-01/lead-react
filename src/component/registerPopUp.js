import React from 'react';
import '../assets/css/modal.css'
import { MDBInput, MDBModal, MDBModalBody, MDBProgress } from 'mdbreact';
// import { connect } from 'react-redux'
// import { login } from '../redux/action'
import Swal from 'sweetalert2'
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
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            num: false,
            spec: false,
            show: false,
            abjad: false,
            char: false
        })
    }

    regisUser = () => {
        var username = this.text.value
        var email = this.email.value
        var phone = this.phone.value
        var password = this.pass.value
        var confpassword = this.confpass.value
        if (username && email && password && confpassword && phone) {
            if (password !== confpassword) {
                Swal.fire({
                    text: 'Invalid password confirmation',
                    imageUrl: require('../image/ilustration/password.png'),
                    imageWidth: 220,
                    imageHeight: 150,
                    imageAlt: 'Custom image',
                    width: 230,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Axios.get(API_URL + `/users/getSearchUsers/${username}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.length !== 0) {
                            Swal.fire({
                                text: 'Username has been taken',
                                imageUrl: require('../image/ilustration/user_statusWrong.png'),
                                imageWidth: 220,
                                imageHeight: 130,
                                imageAlt: 'Custom image',
                                width: 230,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        else if (password.length > 8) {
                            Swal.fire({
                                imageUrl: require('../image/ilustration/loading_.png'),
                                imageWidth: 220,
                                imageHeight: 130,
                                imageAlt: 'Custom image',
                                width: 230,
                                showConfirmButton: false
                            });
                            Axios.post(API_URL + `/users/register`, {
                                username: username,
                                password: password,
                                phone: phone,
                                email: email,
                                role: 'user'
                            })
                                .then((res) => {
                                    console.log('Regis Success' + res.data)
                                    Swal.fire({
                                        text: 'Successfully, please check your email to verification!',
                                        imageUrl: require('../image/ilustration/new_message.png'),
                                        imageWidth: 220,
                                        imageHeight: 150,
                                        imageAlt: 'Custom image',
                                        width: 230,
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        else {
                            Swal.fire({
                                text: 'Your password is fail',
                                imageUrl: require('../image/ilustration/user_statusWrong.png'),
                                imageWidth: 190,
                                imageHeight: 150,
                                imageAlt: 'Custom image',
                                width: 210,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }

        } else {
            Swal.fire({
                text: 'Please fill in all the forms!',
                imageUrl: require('../image/ilustration/checklist_.png'),
                imageWidth: 220,
                imageHeight: 150,
                imageAlt: 'Custom image',
                width: 230,
                showConfirmButton: false,
                timer: 1500
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
        if (this.state.redirect) {
            return <Redirect to='/'>
            </Redirect>
        }
        return (
            <div>
                <button id="rightRegis" className="element-BtRegis" onClick={this.toggle}>Register</button>
                <MDBModal contentClassName="modalBG" isOpen={this.state.modal} toggle={this.toggle}>
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