import React from "react";
import '../assets/css/footer.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

const FooterPage = () => {
    return (
        <div>
            <MDBFooter className="font-small pt-4 mt-4" style={{ backgroundColor: "#5F5D5D" }}>
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow >
                        {/* <MDBCol md="4" style={{ textAlign: "center" }}> */}
                        <MDBCol md="3" style={{ textAlign: "right" }}>
                            <img src={require('../image/logowhite.png')} width="150px" alt="leadlogo"></img>
                        </MDBCol>
                        <MDBCol md="1" style={{ textAlign: "center" }}>
                            <img src={require('../image/logopcsb.png')} width="120px" alt="leadlogo"></img>
                        </MDBCol>
                        <MDBCol md="2">
                            <h5 className="title">Information</h5>
                            <ul>
                                <li className="list-unstyled">
                                    <Link to="/HowToOrder">How to order </Link>
                                </li>
                                <li className="list-unstyled">
                                    <Link to="/SizeCart">Size Cart</Link>
                                </li>
                                <li className="list-unstyled">
                                    <Link to="/PrivacyFAQ">Privacy, Police and FAQ</Link>
                                </li>
                                {/* <li className="list-unstyled">
                                <a href="#!">FAQ</a>
                            </li> */}
                            </ul>
                        </MDBCol>
                        <MDBCol md="2">
                            <h5 className="title">About</h5>
                            <ul>
                                <li className="list-unstyled">
                                    <Link to="/AboutPage">Profile</Link>
                                </li>
                                <li className="list-unstyled">
                                    <Link to="/LeadSquad">LEAD Squad</Link>
                                </li>
                            </ul>
                        </MDBCol>
                        <MDBCol md="3">
                            <h5 className="title">Contact</h5>
                            <ul>
                                <li className="list-unstyled">Whatsapp : +62 821-4292-8301</li>
                                <li className="list-unstyled">Email : leadwear01@gmail.com</li>
                                <li className="list-unstyled">Instagram : @leadproject.id</li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3 footerBG">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> Lead Project Indonesia </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    );
}

export default FooterPage;