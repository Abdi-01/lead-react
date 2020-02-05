import React, { Component } from 'react'
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
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
    editModal: false,
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
    this.toggle(2);
  }

  renderEdit = (id) => {
    let { data } = this.state;
    return data.map((val, index) => {
      if (this.state.selectedId === val.idproduct) {
        // console.log(val.idproduct)
        return (
          <Modal isOpen={this.state.editModal} toggle={() => this.toggle(2)}>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalBody key={val.idproduct}>
              <div style={{ textAlign: 'center' }}>
                <img src={API_URL + val.imagepath} alt='imgpreview' style={{ width: 100, verticalAlign: 'middle' }}></img>
              </div>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Product Name
                  <input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameEdit' defaultValue={val.name} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Product Category
                  <input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryEdit' defaultValue={val.category} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Bahan
                  <input type="text" className="form-control form-control-sm" placeholder="Input Bahan" ref='bahanEdit' defaultValue={val.product_bahan} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Rating
                  <input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingEdit' defaultValue={val.product_rating} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Price
                  <input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceEdit' defaultValue={val.product_price} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Description
                  <input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionEdit' defaultValue={val.description} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Image
                  <CustomInput className="form-control btn-sm" id='imgpreview' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter >
              <Button size="sm" onClick={() => this.yesEdit(val.idproduct)}>Yes</Button>
              <Button size="sm" onClick={this.noEdit}>No</Button>
            </ModalFooter>
          </Modal>
        )
      }
    })
  }

  renderData = () => {
    let { data } = this.state;
    return data.map((val, index) => {
      // if (this.state.selectedId === val.idproduct) {//ketika isi dari seleectedId = val.id
      //   return (
      //     //     <tr key={val.idproduct}>
      //     //       <td >{index + 1}</td>
      //     //       <td ><CustomInput className="form-control btn-sm" id='uploadEdit' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameEdit' defaultValue={val.name} /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryEdit' defaultValue={val.category} /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Size" ref='sizeEdit' defaultValue={val.size} /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingEdit' defaultValue={val.rating} /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceEdit' defaultValue={val.price} /></td>
      //     //       <td ><input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionEdit' defaultValue={val.description} /></td>
      //     //       {/* <td ><input type="number" className="form-control" id="harga" placeholder="Input Price" ref='hargaEdit' /></td> */}
      //     //       <td ><Button size="sm" onClick={() => this.yesEdit(val.idproduct)}>Yes</Button>
      //     //         &nbsp;
      //     //                   <Button size="sm" onClick={this.noEdit}>No</Button></td>
      //     //     </tr>
      //   )
      // }
      // else {
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
      // }
    })
  }

  yesEdit = (id) => {
    let { addImageFile } = this.state;
    var nameNew = this.refs.nameEdit.value
    var categoryNew = this.refs.categoryEdit.value
    var bahanNew = this.refs.bahanEdit.value
    var ratingNew = this.refs.ratingEdit.value
    var priceNew = this.refs.priceEdit.value
    var descriptionNew = this.refs.descriptionEdit.value
    if (nameNew === '' || categoryNew === '' || bahanNew === '' || ratingNew === '' || priceNew === '' || descriptionNew === '') {
      alert('Complete Your Changes')
    }
    else if (addImageFile) {
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
    console.log(e.target.files[0])
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
                      <button className="btn btn-primary btn-sm" onClick={() => this.toggle(1)}>Add Product</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </main>
          {this.renderEdit()}
          <Modal isOpen={this.state.modal} toggle={() => this.toggle(1)}>
            <ModalHeader>Add Product</ModalHeader>
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