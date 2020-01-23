import React, { Component } from 'react';
import logo from "../image/logoblack.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="sidebar-fixed position-absolute">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" width="100px" src={logo} />
            </a>
            <MDBListGroup className="list-group-flush">

                <NavLink to="/ProfilePage" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3" />
                        Profile
                    </MDBListGroupItem>
                </NavLink>
                {this.props.role === "admin"
                    ?
                    <NavLink to="/ProductPage" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="table" className="mr-3" />
                            Product
                    </MDBListGroupItem>
                    </NavLink>
                    :
                    <NavLink to="/TransactionPage" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="table" className="mr-3" />
                            Transaction
                    </MDBListGroupItem>
                    </NavLink>
                }
                <NavLink to="/maps" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map" className="mr-3" />
                        Maps
                    </MDBListGroupItem>
                </NavLink>
                {/* <NavLink exact={true} to="/ResultPage" activeClassName="activeClass"> */}
                <NavLink to="/ResultPage" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3" />
                        Market Result
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3" />
                        404
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
         );
    }
}
 
const makeStatetoProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(makeStatetoProps)(SideNav);
