import React, { Component } from 'react'
import { CustomInput, Modal, ModalBody } from 'reactstrap';
import { MDBCard, MDBView, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/trackingOrder.css'
import '../assets/css/modal.css'
import Axios from 'axios'
import { getUserTransaction, getDetailTransaction, getCustomDetailTransaction } from '../redux/action'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';
import moment from 'moment'

class HistoryPage extends Component {
  state = {
    selectedInvoice: '',
    statusVerification: '',
    modal1: false,
    modal2: false
  }

  toggle = (a) => {
    if (a === 1) {
      console.log(a)
      this.setState({
        modal1: !this.state.modal1
      })
    }
    else if (a === 2) {
      console.log(a)
      this.setState({
        modal2: !this.state.modal2
      })
    }
  }

  componentDidMount() {
    this.props.getUserTransaction('Paid')
    this.props.getDetailTransaction('Paid')
    this.props.getCustomDetailTransaction('Paid')
  }

  onChangeSelectStatus = (e) => {
    console.log("Status Choose", e.target.value)
    this.setState({ statusVerification: e.target.value })
  }

  verifieTrans = (id) => {
    let { statusVerification } = this.state;
    const token = localStorage.getItem('token')
    Axios.put(API_URL + `/transactions/verifieOrder?id=${id}`, { status: statusVerification }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        this.props.getUserTransaction('Paid')
        this.props.getDetailTransaction('Paid')
        this.props.getCustomDetailTransaction('Paid')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderTrackOrder = (type) => {
    return this.props.userTransReducer.map((item, index) => {
      if (item.orderType === type) {
        return (
          <MDBCard key={item.id} style={{ marginTop: 5 }}>
            <MDBRow>
              <MDBCol sm='3'>
                <button className="invoiceTag" onClick={() => this.transactionDetail(item.invoice, item.orderType)} style={{ margin: 0, paddingLeft: 10, width: 210 }}>{item.invoice}</button>
              </MDBCol>
              <MDBCol sm='2'>
                <p style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>{moment(item.time).format('DD MMMM YYYY')}</p>
              </MDBCol>
              <MDBCol sm='3'>
                <p style={{ margin: 2, marginRight: 0, marginTop: 10, padding: 0, color: 'gray' }}>Payment : IDR. {item.payment.toLocaleString()}</p>
              </MDBCol>
              {this.props.user.role === 'admin' ?
                <>
                  <MDBCol sm='2' >
                    {item.imgpayment === null ?
                      <p className="text-center" style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>Waiting Payment</p>
                      : <div style={{ textAlign: 'center' }}>
                        <img src={API_URL + item.imgpayment} alt="preview" id='imgpreview' style={{ width: 100 }}></img>
                      </div>}
                  </MDBCol>
                  <MDBCol>
                    <select style={{ margin: 2, marginTop: 6, padding: 0, color: 'gray' }} className="form-control form-control-sm" value={item.status}
                      onChange={this.onChangeSelectStatus}>
                      <option value={item.status !== 'Unpaid' ? 'Unpaid' : item.status}>{item.status !== 'Unpaid' ? 'Unpaid' : item.status}</option>
                      <option value='Paid'>Paid</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </MDBCol>
                  <MDBCol>
                    <button className="btVerifie" style={{ margin: 2, marginTop: 6, padding: 3 }}
                      onChange={this.onChangeSelectMaterial} onClick={() => this.verifieTrans(item.id)}>Verifie</button>
                  </MDBCol>
                </>
                :
                <>
                  <MDBCol sm='2' >
                    {item.imgpayment === null ?
                      <p style={{ margin: 2, marginTop: 10, padding: 0 }}>
                        <span style={{ cursor: 'pointer', marginTop: 30, color: 'gray', fontWeight: 'bold', textDecoration: 'underline' }} onClick={() => this.uploadTransferReceipt(item.invoice)}>Upload Payment</span>
                      </p>
                      : <img src={API_URL + item.imgpayment} alt="imgReceipt" id='imgReceiptFix' style={{ width: 100, verticalAlign: 'middle' }}></img>}
                  </MDBCol>
                  <MDBCol>
                    <p style={{ margin: 2, marginTop: 10, padding: 0, color: 'gray' }}>{item.status}</p>
                  </MDBCol>
                </>
              }
            </MDBRow>
          </MDBCard >
        )
      }else{
        return null
      }
    })
  }

  transactionDetail = (invoice, orderType) => {
    this.setState({ selectedInvoice: invoice, selectedorderType: orderType })
    this.toggle(1)
  }

  renderDetail = () => {
    if (this.state.selectedorderType === 'General') {
      return this.props.getDetailReducer.map((val, index) => {
        if (this.state.selectedInvoice === val.invoice) {
          return (
            <tr key={val.id}>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                <img src={API_URL + val.imagepath} alt='imagePoster' style={{ width: '100%', verticalAlign: 'middle' }}></img>
                {/* <span><MDBIcon icon="edit" />Edit</span> */}
              </td>
              <td style={{ verticalAlign: 'middle', paddingLeft: 0, paddingRight: 0 }}>{val.name}</td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.size}</td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.qty}</td>
              <td style={{ verticalAlign: 'middle' }}>IDR. {val.productPrice.toLocaleString()}</td>
              <td style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}</td>
            </tr>
          )
        }else{return null}
      })
    } else {
      return this.props.getCustomDetailReducer.map((val, index) => {
        if (this.state.selectedInvoice === val.invoice) {
          return (
            <tr key={val.id}>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                <img src={API_URL + val.imagepath} alt='imagePoster' style={{ width: '100%', verticalAlign: 'middle' }}></img>
              </td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.detail}</td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.qty}</td>
              <td style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}/pcs</td>
              <td style={{ verticalAlign: 'middle' }}>IDR. {(val.qty * val.price).toLocaleString()}</td>
            </tr>
          )
        }else{return null}
      })
    }
  }

  renderShipping = () => {
    return this.props.userTransReducer.map((val, index) => {
      if (this.state.selectedInvoice === val.invoice) {
        return (
          <MDBRow key={val.id}>
            {/* <MDBRow> */}
            <MDBCol md='8' ><p style={{ fontWeight: 'bold' }}>Shipping ({val.courier})</p></MDBCol>
            <MDBCol><p style={{ textAlign: 'right', marginRight: 22 }}>IDR. {val.shippingPrice.toLocaleString()}</p></MDBCol>
            {/* </MDBRow> */}
            <MDBCol md='8'><p style={{ fontWeight: 'bold' }}>Amount</p></MDBCol>
            <MDBCol ><p style={{ textAlign: 'right', marginRight: 22 }}>IDR. {val.payment.toLocaleString()}</p></MDBCol>
            <MDBCol>
              Name : {val.username}
              <br />
              Address : {val.address}
            </MDBCol>
            <MDBCol>
              Note : {val.note}
              <p style={{ textAlign: 'center', fontWeight: 'bold', verticalAlign: 'middle', border: '3px solid orange', borderRadius: 45, marginTop: 10 }}>Status : {val.status}</p>
            </MDBCol>
          </MDBRow>
        )
      } else {
        return null
      }
    })
  }

  renderTransfer = () => {
    return (
      <Modal contentClassName="modalBG" isOpen={this.state.modal2} toggle={() => this.toggle(2)}>
        <div className="text-center headerModalBG" >
          <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Upload Your Transfer</h4>
        </div>
        <ModalBody>
          <img id="imgReceipt" className="img-fluid" alt="receipt" width="200px" />
          < CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageReceipt} label={this.state.addImageReceiptName} type='file' />
        </ModalBody>
        <button onClick={() => this.uploadTransfer(this.state.selectedInvoice)}>Upload</button>
      </Modal>
    )
  }

  renderDetailModals = () => {
    return (
      <Modal contentClassName="modalBG" isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
        <div className="text-center headerModalBG" >
          <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Order Detail</h4>
        </div>
        <ModalBody>
          <MDBTable>
            <MDBTableHead>{
              this.state.selectedorderType === 'General' ?
                <tr style={{ textAlign: 'center' }}>
                  <td style={{ width: 200 }}>Product</td>
                  <td style={{ width: 70 }}>Name</td>
                  <td style={{ width: 30 }}>Size</td>
                  <td style={{ width: 30 }}>Qty</td>
                  <td style={{ width: 300 }}>Price</td>
                  <td style={{ width: 300 }}>Total</td>
                </tr>
                :
                <tr style={{ textAlign: 'center' }}>
                  <td style={{ width: 200 }}>Product</td>
                  <td style={{ width: 30 }}>Detail</td>
                  <td style={{ width: 30 }}>qty</td>
                  <td style={{ width: 300 }}>Price</td>
                  <td style={{ width: 300 }}>Total</td>
                </tr>
            }
            </MDBTableHead>
            <MDBTableBody>
              {this.renderDetail()}
            </MDBTableBody>
          </MDBTable>
          {this.renderShipping()}
        </ModalBody>
      </Modal>
    )
  }

  render() {
    return (
      <div style={{}} >
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5" style={{ minHeight: 670 }}>
            <MDBTable>
              <MDBRow>
                <MDBCol>
                  <MDBCard>
                    <MDBView className="gradient-card-header text-center orange" rounded >
                      <h4 className="h4-responsive text-white" style={{ margin: 0 }}>Order Progress</h4>
                    </MDBView>
                  </MDBCard>
                  {this.renderTrackOrder('General')}
                </MDBCol>
              </MDBRow>
            </MDBTable>
            <MDBTable>
              <MDBRow>
                <MDBCol>
                  <MDBCard>
                    <MDBView className="gradient-card-header text-center orange" rounded >
                      <h4 className="h4-responsive text-white" style={{ margin: 0 }}>Custom Order Progress</h4>
                    </MDBView>
                  </MDBCard>
                  {this.renderTrackOrder('Custom')}
                </MDBCol>
              </MDBRow>
            </MDBTable>
          </main>
          {this.renderTransfer()}
          {this.renderDetailModals()}
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ transaction, user }) => {
  console.log('cek', transaction)
  return {
    user,
    ...transaction
  }
}

export default connect(mapStateToProps, { getUserTransaction, getDetailTransaction, getCustomDetailTransaction })(HistoryPage);