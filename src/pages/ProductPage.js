import React, { Component } from 'react'
import { Progress, CustomInput, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

// import { Link } from 'react-router-dom'

class ProductPage extends Component {
  state = {
    addImageFileName: 'Select File',
    addImageFile: undefined,
    data: [],
    modal: false,
    selectedId: null
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    this.getProducts()
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

  editData = (id) => {
    console.log(id)
    this.setState({ selectedId: id })
    console.log(this.state.selectedId)
  }

  renderData = () => {
    let { data } = this.state;
    return data.map((val, index) => {
      if (this.state.selectedId === val.idproduct) {//ketika isi dari seleectedId = val.id
        return (
          <tr key={val.idproduct}>
            <td >{index + 1}</td>
            <td ><CustomInput className="form-control btn-sm" id='uploadEdit' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameEdit' defaultValue={val.name} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryEdit' defaultValue={val.category} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Size" ref='sizeEdit' defaultValue={val.size} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingEdit' defaultValue={val.rating} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceEdit' defaultValue={val.price} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionEdit' defaultValue={val.description} /></td>
            {/* <td ><input type="number" className="form-control" id="harga" placeholder="Input Price" ref='hargaEdit' /></td> */}
            <td ><Button size="sm" onClick={() => this.yesEdit(val.idproduct)}>Yes</Button>
              &nbsp;
                        <Button size="sm" onClick={this.noEdit}>No</Button></td>
          </tr>
        )
      }
      else {
        return (
          <tr key={val.idproduct}>
            <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}><img src={API_URL + val.imagepath} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img></td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.name}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.category}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.product_bahan}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.product_rating}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.product_price}</td>
            <td id={val.idproduct} style={{ whiteSpace: 'nowrap', textOverflow: 'elipsis', overflow: 'hidden', maxWidth: '3px', verticalAlign: 'middle' }}>{val.description}
            </td>

            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}><button className="btn btn-success btn-sm" onClick={() => this.editData(val.idproduct)}>Edit</button>
              &nbsp;
                        <button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.idproduct, val.imagepath)}>Delete</button></td>
            {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
          </tr>
        )
      }
    })
  }

  yesEdit = (id) => {
    let { addImageFile } = this.state;
    var nameNew = this.refs.nameEdit.value
    var categoryNew = this.refs.categoryEdit.value
    var sizeNew = this.refs.sizeEdit.value
    var ratingNew = this.refs.ratingEdit.value
    var priceNew = this.refs.priceEdit.value
    var descriptionNew = this.refs.descriptionEdit.value
    if (nameNew === '' || categoryNew === '' || sizeNew === '' || ratingNew === '' || priceNew === '' || addImageFile === false || descriptionNew === '') {
      alert('Complete Your Changes')
    }
    else if (addImageFile) {
      let formData = new FormData()
      let obj = {
        // imagepath: imageNew,
        name: nameNew,
        category: categoryNew,
        size: sizeNew,
        rating: ratingNew,
        price: priceNew,
        description: descriptionNew
      }
      formData.append('data', JSON.stringify(obj))
      formData.append('image', addImageFile)
      console.log(formData)
      Axios.post(API_URL + `/products/edit?idproduct=${id}`, formData)
        .then((res) => {
          console.log(res.data)
          this.getProducts()
          this.setState({ selectedId: null })
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }
  noEdit = () => {
    this.setState({ selectedId: null })
    this.getProducts()//update data
  }
  submitData = () => {
    let { addImageFile } = this.state;
    var nameNew = this.refs.nameProduct.value
    var categoryNew = this.refs.categoryProduct.value
    var bahanNew = this.refs.bahanProduct.value
    var ratingNew = this.refs.ratingProduct.value
    var priceNew = this.refs.priceProduct.value
    var descriptionNew = this.refs.descriptionProduct.value
    if (addImageFile) {
      let formData = new FormData()
      let obj = {
        // imagepath: imageNew,
        name: nameNew,
        category: categoryNew,
        product_bahan: bahanNew,
        product_rating: ratingNew,
        product_price: priceNew,
        description: descriptionNew
      }
      formData.append('data', JSON.stringify(obj))
      formData.append('image', addImageFile)
      console.log(formData)
      Axios.post(API_URL + '/products/upload', formData)
        .then((res) => {
          console.log(res.data)
          this.toggle()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }

  onBtnAddImageFile = (e) => {
    if (e.target.files[0]) {
      this.setState({ addImageFileName: e.target.files[0].name, addImageFile: e.target.files[0] })
      var preview = document.getElementById('imgpreview')
      preview.src = URL.createObjectURL(e.target.files[0])
    } else {
      this.setState({ addImageFileName: 'Select Image', addImageFile: undefined })
    }
  }

  deleteData = (id, imagepath) => {
    console.log(id, imagepath)
    Axios.delete(API_URL + `/products/delete?idproduct=${id}&imagepath=${imagepath}`)
      .then((res) => {
        console.log(res.data)
        this.getProducts()
      })
      .catch((err) => {
        console.log(err)
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
                    <h4 className="h4-responsive text-white">Basic tables</h4>
                  </MDBView>
                  <MDBCardBody>
                    {/* <p className="h2">Market Cube Product</p> */}
                    <MDBTable>
                      <MDBTableHead>
                        <tr>
                          <td>#</td>
                          <td style={{ width: 230 }}>Image</td>
                          <td style={{ width: 150 }}>Name</td>
                          <td style={{ width: 150 }}>Category</td>
                          <td style={{ width: 150 }}>Bahan</td>
                          <td style={{ width: 150 }}>Rating</td>
                          <td style={{ width: 150 }}>Price</td>
                          <td>Description</td>
                          <td>Action</td>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {this.renderData()}
                      </MDBTableBody>
                    </MDBTable>
                    <div style={{ textAlign: "center" }}>
                      <button className="btn btn-primary btn-sm" onClick={this.toggle}>Add Product</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </main>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader>Add Product</ModalHeader>
            <ModalBody >
              <div style={{ textAlign: 'center' }}>
                <img alt="preview" id="imgpreview" className="img-fluid" width="100px" />
              </div>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Product Name
                  <input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Product Category
                  <input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Bahan
                  <input type="text" className="form-control form-control-sm" placeholder="Input Bahan" ref='bahanProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Rating
                  <input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Price
                  <input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Description
                  <input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionProduct' />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Image
                  <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
                </FormGroup>

              </Form>
            </ModalBody>
            <ModalFooter >
              <button type="submit" className="btn btn-primary btn-sm" onClick={this.submitData}>Submit</button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default ProductPage