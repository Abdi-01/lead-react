import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle } from "mdbreact";
import { Col, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { accountVerification } from '../redux/action'
import { Redirect } from 'react-router-dom';
// import { API_URL } from '../support/Backend_URL';
// import Axios from 'axios';

class VerificationPage extends Component {
    state = {
        redirect: false
    }

    verification = () => {
        let token = this.props.location.search.split('?')[1]
        console.log(token)
        let obj = {
            token,
            otp: this.otp.value
        }
        this.props.accountVerification(obj)
        this.setState({ redirect: true })
    }

    render() {
        const { redirect } = this.state
        if (redirect) {
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
                                        <Col sm="5" md={{ size: 2, offset: 5 }}><Input className="text-center col align-self-center" type="username" name="username" placeholder="INPUT OTP" innerRef={(otp) => this.otp = otp} /></Col>
                                        <MDBBtn color="gray" className="mb-5" onClick={this.verification}><i className="fas fa-check-double"></i> Verification My Account</MDBBtn>
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

const makeStatetoProps = ({ user }) => {
    return {
        id: user.id
    }
}

export default connect(makeStatetoProps, { accountVerification })(VerificationPage)