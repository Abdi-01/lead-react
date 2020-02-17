import React, { Component } from 'react'
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBFormInline, MDBInputGroup, MDBBadge } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

// import { Link } from 'react-router-dom'

class ProductPage extends Component {
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

  getSizes = () => {
    Axios.get(API_URL + '/products/getSize')
      .then((res) => {
        this.setState({ size: res.data })
        console.log(this.state.size)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getMaterials = () => {
    Axios.get(API_URL + '/products/getMaterial')
      .then((res) => {
        this.setState({ material: res.data })
        console.log('material', this.state.material)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getStock = () => {
    Axios.get(API_URL + '/products/getStock')
      .then((res) => {
        this.setState({ stock: res.data })
        // console.log('stock : ', this.state.stock[0].id)
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

  renderEdit = () => {
    let { data } = this.state;
    return data.map((val) => {
      if (this.state.selectedId === val.id) {
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
    let { data, stock } = this.state;
    return data.map((val, index) => {
      return (
        <tr key={val.id}>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{index + 1}</td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><img src={API_URL + val.imagepath} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img></td>
          <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
          {/* <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.category}</td> */}
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{val.material}</td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center'  }}>
            {this.renderSize(val.id, val.name)}
          </td>
          <td style={{ verticalAlign: 'middle' }}>{val.price}</td>
          <td style={{ whiteSpace: 'nowrap', textOverflow: 'elipsis', overflow: 'hidden', maxWidth: '3px', verticalAlign: 'middle' }}>{val.description}
          </td>
          <td style={{ verticalAlign: 'middle' }}><button className="btn btn-success btn-sm" onClick={() => this.editData(val.id)}>Edit</button>
            &nbsp;
           <button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.id, val.imagepath)}>Delete</button></td>
          {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
        </tr>
      )
    })
  }

  renderSize = (id, name) => {
    if (this.state.stock.some(item => item.id === id)) {
      return this.state.stock.map((item, index) => {
        if (item.id === id) {
          return (
            // <tr >
              <MDBBadge color="light"> {item.size} = {item.stock}</MDBBadge>
            // </tr>
          )
        }
      })
    } else {
      return (
        <>
          <button className="btn btn-danger btn-sm" onClick={() => this.addStock(id)}>Add Stock</button>
          {
            this.state.selectedId === id
              ?
              this.renderAddSize(id, name)
              :
              null
          }
        </>
      )
    }
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
    if (addImageFile) {
      let formData = new FormData()
      let obj = {
        // imagepath: imageNew,
        name: this.refs.nameProduct.value,
        materialID: this.state.addMaterialID,
        price: this.refs.priceProduct.value,
        description: this.refs.descriptionProduct.value
      }
      formData.append('data', JSON.stringify(obj))
      formData.append('image', addImageFile)
      console.log(formData)
      Axios.post(API_URL + '/products/upload', formData)
        .then((res) => {
          console.log(res.data)
          this.toggle(1)
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  submitStock = (id) => {
    Axios.post(API_URL + '/products/addStock', {
      stock: this.state.sizeQty
    })
      .then((resQty) => {
        console.log(resQty.data)
        this.toggle(3)
        this.getStock()
      })
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

  renderListMaterial = () => {
    return this.state.material.map((val, index) => {
      return (
        <option value={val.id}>{val.material}</option>
      )
    })
  }

  onChangeSelectMaterial = (e) => {
    console.log("Material Choose", e.target.value)
    this.setState({ addMaterialID: parseInt(e.target.value) })
  }

  checkSizehandler = (e) => {
    let { sizeQty } = this.state
    let qty = document.getElementById(`qty${e.target.value}`).value
    if (!e.target.checked) {
      document.getElementById(`qty${e.target.value}`).disabled = e.target.checked

    } else if (e.target.checked) {
      document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
      if (qty !== null) {
        sizeQty.push([parseInt(this.state.selectedId), parseInt(e.target.value), parseInt(qty)])
        console.log(sizeQty)
      }
    }
  }

  addStock = (id) => {
    console.log(id)
    this.setState({ selectedId: id })
    console.log(this.state.selectedId)
    this.toggle(3);
  }

  renderAddSize = (id, name) => {
    return <Modal isOpen={this.state.sizeModal} toggle={() => this.toggle(3)}>
      <ModalHeader>Add Stock : {name}</ModalHeader>
      <ModalBody >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <MDBFormInline>
            {this.state.size.map((val, index) => {
              return (
                <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" key={val.id}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text" style={{ padding: 0, width: 63, paddingLeft: 2 }}>
                        <input type="checkbox" id={`size${val.id}`} onChange={this.checkSizehandler} aria-label="Checkbox for following text input" ref={`size${val.id}`} value={val.id} />&nbsp;
                          {val.size}&nbsp;
                        </div>
                    </div>
                    <input type="text" id={`qty${val.id}`} onChange={this.qtySizehandler} className="form-control" aria-label="Text input with checkbox" />
                  </div>
                </MDBCol>
              )
            })
            }
          </MDBFormInline>
        </FormGroup>
      </ModalBody>
      <ModalFooter >
        <button type="submit" className="btn btn-primary btn-sm" onClick={() => this.submitStock(id)}>Submit</button>
      </ModalFooter>
    </Modal>
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
                        <tr style={{ textAlign: 'center' }}>
                          <td>#</td>
                          <td style={{ width: 230 }}>Image</td>
                          <td style={{ width: 150 }}>Name</td>
                          {/* <td style={{ width: 150 }}>Category</td> */}
                          <td style={{ width: 150 }}>Material</td>
                          <td style={{ width: 150 }}>Stock</td>
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
                  Material
                  <select className="form-control form-control-sm" value={this.state.addMaterialID}
                    onChange={this.onChangeSelectMaterial}>
                    <option value={0} selected>Choose Material</option>
                    {this.renderListMaterial()}
                  </select>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  Description
                  <input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionProduct' />
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