import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBIcon, MDBNavbarBrand, MDBFormInline, MDBBadge
} from "mdbreact";// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBDropdown,
import RegisPopUp from './registerPopUp'
import { connect } from 'react-redux'
import LoginPopUp from './loginPopUp'
import UserDropdown from './headerDropdown'
import { Link } from "react-router-dom";

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    

    render() {
        console.log(this.props.username)
        return (
            <div className='fluid headerBG'>
                <MDBNavbar className="navbarBG" dark expand="md" >
                    {/* <MDBRow className="mb-1"> */}
                    <MDBNavbarBrand style={{ marginLeft: "2%" }}>
                        <Link to='/'>
                            <img src={require('../image/logowhiteB.png')} alt='logo' height='40'></img>
                        </Link>
                    </MDBNavbarBrand>
                    {/* </MDBRow> */}
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar style={{ padding: 0 }}>
                        <MDBNavbarNav style={{ marginLeft: "2%" }} left>
                            <MDBNavItem className="navItem" >
                                {/* <Link to='/HowToOrder'> */}
                                <MDBNavLink to='/Collection' style={{ fontWeight: 'bold' }}>Our Collection</MDBNavLink>
                                {/* </Link> */}
                            </MDBNavItem>
                            <MDBNavItem className="navItem">
                                <MDBNavLink to='/HowToOrder' style={{ fontWeight: 'bold' }}>Order</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="navItem">
                                <MDBNavLink to='/AboutPage' style={{ fontWeight: 'bold' }}>About</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="waves-effect waves-light" to="#!" style={{ bottom: 0, top: 5 }}>
                                    <MDBIcon icon="shopping-cart" >
                                        <MDBBadge pill color="primary" className="ml-1">0</MDBBadge>
                                    </MDBIcon>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem style={{ padding: 8 }}>
                                {this.props.username
                                    ?
                                    <UserDropdown></UserDropdown>
                                    :
                                    <div id="sides" style={{ width: 130 }}>
                                        <LoginPopUp ></LoginPopUp>
                                        <RegisPopUp ></RegisPopUp>
                                    </div>
                                }
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(NavbarPage);