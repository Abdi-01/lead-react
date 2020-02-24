import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBNavbarBrand
} from "mdbreact";// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBDropdown,
import '../assets/css/navbar.css'
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
            <MDBNavbar className="navbarBGAdmin" dark expand="md" >
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
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem style={{ padding: 8 }}>
                            {this.props.username
                                ?
                                <UserDropdown></UserDropdown>
                                :
                                <div id="sidesBt-navbar" style={{ width: 130 }}>
                                    <LoginPopUp ></LoginPopUp>
                                    <RegisPopUp ></RegisPopUp>
                                </div>
                            }
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
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