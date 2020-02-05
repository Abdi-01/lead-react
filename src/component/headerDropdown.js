import React, { Component } from 'react';
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import {
    MDBIcon, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDropdown
} from "mdbreact";
import { connect } from 'react-redux' //harus ada untuk terhubung dengan global state
import { logout } from '../redux/action' //mengakses function dari action
import { Link, Redirect } from 'react-router-dom'

class UserDropdown extends Component {
    logoutUser = () => {
        this.props.logout()
    }
    componentDidMount() {
    }
    render() {
        console.log(this.props.username)
        return (
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />  Hi, {this.props.username}
                </MDBDropdownToggle>
                <MDBDropdownMenu right basic>
                    <MDBDropdownItem >
                        <i className="far fa-user-circle"></i>
                        <Link to='/ProfilePage'>
                            Profile
                        </Link>
                    </MDBDropdownItem>
                    {this.props.role === 'admin'
                        ?
                        <>
                            <MDBDropdownItem>
                                <i className="far fa-list-alt"></i>
                                <Link to='/ProductPage'>
                                    Product List
                        </Link>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <i className="fas fa-chart-line" />
                                <Link to='/AdminPage'>
                                    Market Results
                                </Link>
                            </MDBDropdownItem>
                        </>
                        :
                        <>
                            <MDBDropdownItem>
                                <i className="fas fa-history" />
                                <Link to='/UserPage'>
                                    History
                            </Link>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                                <i className="fas fa-truck" />
                                <Link to='/UserPage'>
                                    Track Order
                            </Link>
                            </MDBDropdownItem>
                        </>
                    }
                    <MDBDropdownItem divider />
                    <MDBDropdownItem onClick={this.logoutUser}>
                        <i className="fas fa-sign-out-alt" />
                         &nbsp;   Logout
                        <Redirect to='/'>
                    </Redirect>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
            // <UncontrolledDropdown style={{ marginRight: 15 }}>
            //     <DropdownToggle caret>
            //         <MDBIcon icon="user" />  Hi, {this.props.username}
            //     </DropdownToggle>
            //     <DropdownMenu right>
            //         <Link to='/ProfilePage'>
            //             <DropdownItem >Profile</DropdownItem>
            //         </Link>
            //         {/* <DropdownItem>Contact</DropdownItem>
            //         <DropdownItem>Setting</DropdownItem> */}
            //         {this.props.role === 'admin'
            //             ?
            //             <div>
            //                 <Link to='/AdminPage'>
            //                     <DropdownItem>Movies List</DropdownItem>
            //                 </Link>
            //                 <Link to='/ReportPage'>
            //                     <DropdownItem>Report Transaction</DropdownItem>
            //                 </Link>
            //             </div>
            //             :
            //             <Link to='/UserPage'>
            //                 <DropdownItem>My Ticket Cart <Badge color="success">0</Badge></DropdownItem>
            //             </Link>
            //         }
            //         <DropdownItem divider />
            //         <Link to='/'>
            //             <DropdownItem onClick={this.logoutUser}>Logout</DropdownItem>
            //         </Link>
            //     </DropdownMenu>
            // </UncontrolledDropdown>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        idusers: state.user.idusers, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
        username: state.user.username, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
        role: state.user.role, //state.user mengarah ke reducer/index.js, state.user.username mengarah ke authreducer.js
    }
}

export default connect(mapStatetoProps, { logout })(UserDropdown)
