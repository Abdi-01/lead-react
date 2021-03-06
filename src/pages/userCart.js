import React, { Component } from 'react'
import { FormGroup } from 'reactstrap';
import { MDBCard, MDBView, MDBRow, MDBCol, MDBTable, MDBBtn } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/modal.css'
import { connect } from 'react-redux'
import Axios from 'axios'
import { getCart } from '../redux/action'
import { API_URL } from '../support/Backend_URL';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

class TransactionPage extends Component {
  state = {
    redirect: false
  }

  renderData = () => {
    return this.props.cartUsers.map((val, index) => {
      return (
        <Link to={`/ProductDetail?id=${val.productID}`}>
          <MDBCard key={val.id}>
            <MDBRow>
              <MDBCol md='3'>
                <img src={API_URL + val.imagepath} style={{ margin: '4%' }} width='100%' alt="product" />
              </MDBCol>
              <MDBCol md='7'>
                <p className="h5" style={{ margin: 0, color: 'orange' }}>{val.name}</p>
                <p style={{ margin: 0, color: 'dimgrey' }}>Detail : Size {val.size} (Qty : {val.qty} x {val.productPrice.toLocaleString()}) </p>
                <p style={{ margin: 0, color: 'gray' }}>IDR. {val.price.toLocaleString()}</p>
              </MDBCol>
              <span style={{ margin: 0, color: 'gray', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => this.deleteCart(val.id)}>x Delete</span>
            </MDBRow>
          </MDBCard>
        </Link>
      )
    })
  }

  deleteCart = (id) => {
    console.log(id)
    Axios.delete(API_URL + `/carts/deleteCart/${id}`)
      .then((res) => {
        console.log(res.data)
        this.props.getCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  toCheckoutPage = () => {
    if (this.props.cartUsers.length > 0) {
      this.setState({ redirect: true })
      localStorage.setItem('noteOrder', this.refs.noteOrder.value)
    } else {
      Swal.fire({
        text: 'Please order first',
        imageUrl: require('../image/ilustration/ui_design_.png'),
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        width: 200,
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/CheckoutPage'>
      </Redirect>
    }
    return (
      <div style={{}}>
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5" style={{ minHeight: 720 }}>
            <MDBTable>
              {/* <MDBTableBody> */}
              <MDBRow>
                <MDBCol>
                  <MDBCard>
                    <MDBView className="gradient-card-header text-center orange" rounded >
                      <h4 className="h4-responsive text-white" style={{ margin: 0 }}>Shopping Cart</h4>
                    </MDBView>
                  </MDBCard>
                  {this.renderData()}
                </MDBCol>
                <MDBCol md="5">
                  <p className="h4 font-weight-bold" style={{ color: "gray" }}>Total Price : IDR. {this.props.cartUsers ? parseInt(this.props.cartUsers.totalPrice).toLocaleString() : 0}</p>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    Notes :
                  <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" ref='noteOrder' />
                  </FormGroup>
                  <div style={{ textAlign: 'center' }}>
                    <MDBBtn outline color="warning" onClick={this.toCheckoutPage}>
                      <i style={{ verticalAlign: 'middle' }} className="material-icons">next_week</i> Checkout
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBTable>
          </main>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = ({ cartUsers, user }) => {
  return { ...cartUsers, user }
}

export default connect(mapStatetoProps, { getCart })(TransactionPage);