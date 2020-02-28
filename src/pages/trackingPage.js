import React, { Component } from 'react'
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBFormInline, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/modal.css'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

class TrackingPage extends Component {
    state = {
        userTransaction:[]    
    }

    componentDidMount() {
        this.getTransaction(localStorage.getItem('cartOwn'))
    }

    getTransaction = (id) => {
        Axios.get(API_URL + `/transactions/getTransaction/${id}`)
          .then((res) => {
            this.setState({ userTransaction: res.data })
            console.log(this.state.userTransaction)
          })
          .catch((err) => {
            console.log(err)
          })
      }

    render() {
        return (
            <div style={{}}>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5">
                        <MDBTable>
                            {/* <MDBTableBody> */}
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard>
                                        <MDBView className="gradient-card-header text-center orange" rounded >
                                            <h4 className="h4-responsive text-white" style={{ margin: 0 }}>Order Progress</h4>
                                        </MDBView>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBTable>
                    </main>
                </div>
            </div>
        )
    }
}

export default TrackingPage;