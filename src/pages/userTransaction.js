import React, { Component } from 'react'
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBFormInline, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/modal.css'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

// import { Link } from 'react-router-dom'

class TransactionPage extends Component {
  state = {
    addImageFileName: 'Select File',
    addImageFile: undefined,
    data: [],
    size: [],
    sizeQty: [],
    stock: [],
    material: [],
    modal: false,
    editModal: false,
    sizeModal: false,
    selectedId: null
  }
  toggle = (a) => {
    if (a === 1) {
      this.setState({
        modal: !this.state.modal
      });
    }
    else if (a === 2) {
      this.setState({
        editModal: !this.state.editModal
      });
    }
    else if (a === 3) {
      console.log(a)
      this.setState({
        sizeModal: !this.state.sizeModal
      });
    }
  }
  componentDidMount() {
    this.getProducts()
    this.getSizes()
    this.getMaterials()
    this.getStock()
  }

  getProducts = () => {
    Axios.get(API_URL + '/products/getproducts')
      .then((res) => {
        this.setState({ data: res.data })
        console.log(this.state.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderData = () => {
    let { data, stock } = this.state;
    return data.map((val, index) => {
      return (
        <tr key={val.id}>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{index + 1}</td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            <img src={API_URL + val.imagepath} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img>
            {/* <span><MDBIcon icon="edit" />Edit</span> */}
          </td>
          <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.material}</td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            {this.renderSize(val.id, val.name)}
          </td>
          <td style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}</td>
          <td style={{ verticalAlign: 'middle', padding: 0 }}>
            <div className="box">{val.description}</div>
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            <div id="sidesModal">
              <button className="element-FormDelete" id="leftForm" style={{ height: "30px", width: "54%" }} onClick={() => this.deleteData(val.id, val.imagepath)}>Delete</button>
              <button className="element-FormEdit" id="rightForm" style={{ height: "30px", width: "54%" }} onClick={() => this.editData(val.id)}>Edit</button>
            </div>
          </td>
        </tr>
      )
    })
  }

  
  render() {
    return (
      <div style={{ marginBottom: '10%' }}>
        <div className="flexible-content">
          <SideNavigation />
          <main id="content" className="p-5">
            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mt-5">
                  <MDBView className="gradient-card-header orange darken-2">
                    <h4 className="h4-responsive text-white">All Product</h4>
                  </MDBView>
                  <MDBCardBody>
                    <MDBTable>
                      <MDBTableHead>
                        <tr style={{ textAlign: 'center' }}>
                          <td>#</td>
                          <td style={{ width: 230 }}>Image</td>
                          <td style={{ width: 130 }}>Name</td>
                          <td style={{ width: 150 }}>Material</td>
                          <td style={{ width: 150 }}>Stock</td>
                          <td style={{ width: 190 }}>Price</td>
                          <td>Description</td>
                          <td style={{ width: 250 }}>Action</td>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {this.renderData()}
                      </MDBTableBody>
                    </MDBTable>
                    <div style={{ textAlign: "center" }}>
                      <button className="BtAddProduct" onClick={() => this.toggle(1)}>Add Product</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </main>
          {this.renderEdit()}
          <Modal contentClassName="modalBG" isOpen={this.state.modal} toggle={() => this.toggle(1)}>
            <div className="text-center headerModalBG" >
              <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Add Product</h4>
            </div>
            <ModalBody >
              <div style={{ textAlign: 'center' }}>
                <img src="https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg" alt="preview" id="imgpreview" className="img-fluid" width="200px" />
              </div>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Product Name
                  <input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameProduct' />
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
                  <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" ref='descriptionProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Price
                  <input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Image
                  <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
                </FormGroup>
              </Form>
            </ModalBody>
            <div id="sidesModal">
              <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.toggle(1)}>Cancel</button>
              <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={this.submitData}>Submit</button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default TransactionPage;