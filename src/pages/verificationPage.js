import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle } from "mdbreact";
import { connect } from 'react-redux'
import { login } from '../redux/action'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        // const re = /\s*(?:;=&|$)\s*/
        console.log(this.props.location.search.split('?')[1])//akses data dari query/url
        console.log(this.props.location.search.split('?')[2])
        // this.props.location.search.split('&')[0].split('=')[1]
        // this.props.location.search.split('&')[1].split('=')[1]
    }
    verification = () => {
        var username = this.props.location.search.split('?')[1]
        var password = this.props.location.search.split('?')[2]
        Axios.post(`http://localhost:2000/users//emailVerification`, {
            username,
            password
        })
            .then((res) => {
                if (username.includes("@") === false) {
                    this.props.login(username, password)//masuk authAction.js
                } else {
                    this.props.login(username, password)//masuk authAction.js      
                }
                this.setState({ redirect: true })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { redirect } = this.state
        if(redirect){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBJumbotron style={{ padding: 0 }}>
                                <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage: `url(https://www.zastavki.com/pictures/1920x1080/2015/Backgrounds_Bias_orange_stripe_on_a_gray_background_110123_23.png)` }}>
                                    <MDBCol className="py-5">
                                        <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Verification Account</MDBCardTitle>
                                        <p className="mx-5 mb-5">Thank you for registering a Lead Project account. While using this account,
                                         you will get easy ordering until the promo that we will hold. Thank you for your trust.
                                        </p>
                                        <MDBBtn outline color="white" className="mb-5" onClick={this.verification}><i className="fas fa-check-double"></i> Verification My Account</MDBBtn>
                                    </MDBCol>
                                </MDBCol>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(null, { login })(VerificationPage)