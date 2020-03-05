import React, { Component } from 'react'
import { CustomInput, Modal, ModalBody, Form, FormGroup } from 'reactstrap';
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBFormInline, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/trackingOrder.css'
import '../assets/css/modal.css'
import Axios from 'axios'
import { getUserTransaction } from '../redux/action'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';

class TrackingPage extends Component {
    state = {
        userTransaction: [],
        userCart:[]
    }

    componentDidUpdate() {
        if (this.props.transaction) {
            console.log(this.props.transaction)
        }
        // this.setState({ userTransaction: this.props.transaction })
        // console.log(this.state.userTransaction)
    }

    componentDidMount() {
        this.props.getUserTransaction()
    }

    renderTrackOrder = () => {
        return this.props.transaction.map((item, index) => {
            return (
                <MDBCard key={item.id} style={{ marginTop: 5 }}>
                    <MDBRow>
                        <MDBCol md='3'>
                            <div className="invoiceTag">
                                <span><h4 style={{ margin: 0, paddingLeft: 10, paddingRight: 5 }}>{item.invoice}</h4></span>
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <p style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>02 Februari 2020</p>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <p style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>Payment : IDR. {item.payment.toLocaleString()}</p>
                        </MDBCol>
                        <MDBCol sm='2' >
                            {item.imgpayment===null ? <img src={API_URL + item.imgpayment} id='imgpreview' style={{ width: 100, verticalAlign: 'middle' }}></img>
                                : <p style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>Waiting Payment</p>}
                        </MDBCol>
                        <MDBCol >
                            <select style={{ margin: 2, marginTop: 6, padding: 0, color: 'gray' }} className="form-control form-control-sm">
                                <option value={0}>{item.status}</option>
                                <option value={1}>Paid</option>
                                <option value={2}>Delivered</option>
                            </select>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            )
        })
    }

    renderDetail = () => {
        let { data } = this.state;
        return data.map((val) => {
          if (this.state.selectedId === val.id) {
            return (
              <Modal contentClassName="modalBG" isOpen={this.state.editModal} toggle={() => this.toggle(2)}>
                <div className="text-center headerModalBG" >
                  <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Edit Product</h4>
                </div>
                <ModalBody key={val.id}>
                  <div style={{ textAlign: 'center' }}>
                    <img src={API_URL + val.imagepath} id='imgpreview' alt="imgpreview" style={{ width: 100, verticalAlign: 'middle' }}></img>
                  </div>
                  <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      Product Name
                      <input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameEdit' defaultValue={val.name} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      Material
                      <select className="form-control form-control-sm" value={this.state.addMaterialID}
                        onChange={this.onChangeSelectMaterial}>
                        <option value={0}>Choose Material</option>
                        {this.renderListMaterial()}
                      </select>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      Description
                      <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" ref='descriptionEdit' defaultValue={val.description} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      Price
                      <input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceEdit' defaultValue={val.price} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      Image
                      <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
                    </FormGroup>
                  </Form>
                </ModalBody>
                <div id="sidesModal">
                  <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.noEdit}>No</button>
                  <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.yesEdit(val.id)}>Yes</button>
                </div>
              </Modal>
            )
          }else{
            return null
          }
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
                                    {this.renderTrackOrder()}
                                </MDBCol>
                            </MDBRow>
                        </MDBTable>
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ transaction, user }) => {
    return {
        user,
        transaction
    }
}

export default connect(mapStateToProps, { getUserTransaction })(TrackingPage);