import React, { Component } from 'react'
import { CustomInput, Modal, ModalBody, Form, FormGroup } from 'reactstrap';
import {
  MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBBtn, MDBBtnGroup,
  MDBTableHead, MDBTableBody, MDBFormInline, MDBBadge
} from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/modal.css'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';
import { connect } from 'react-redux'
import {
  getAllProduct, getProductPagination, getSizes,
  getMaterials, getStock, getCategories
} from '../redux/action'
// import { Link } from 'react-router-dom'

class ProductPage extends Component {
  state = {
    addImageFileName: 'Select File',
    addImageFile: undefined,
    sizeQty: [],
    sizeEditQty: [],
    modal: false,
    editModal: false,
    sizeModal: false,
    editSizeModal: false,
    selectedId: null,
    editStock: true
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
    else if (a === 4) {
      // console.log(a)
      this.setState({
        editSizeModal: !this.state.editSizeModal
      });
    }
  }
  componentDidMount() {
    this.props.getAllProduct('All')
    this.props.getProductPagination(0)
    this.props.getSizes()
    this.props.getMaterials()
    this.props.getStock()
    this.props.getCategories()
  }

  editData = (id) => {
    console.log(id)
    this.setState({ selectedId: id })
    this.setState({ addMaterialID: parseInt(id) })
    this.toggle(2);
  }

  renderEdit = () => {
    return this.props.pagiProduct.map((val) => {
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
      } else {
        return null
      }
    })
  }

  renderData = () => {
    return this.props.pagiProduct.map((val, index) => {
      return (
        <tr key={val.id}>
          {/* <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{index + 1}</td> */}
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
        </tr >
      )
    })
  }

  renderSize = (id, name) => {
    if (this.props.stocks.some(item => item.id === id)) { //jika ada item.id stock yang sama dengan id maka akan execute
      console.log(this.props.stocks.some(item => item.id === id))
      return <div style={{}}>
        {this.props.stocks.map((item, index) => {
          if (item.id === id) {
            return (
              <MDBBadge color="light"> {item.size} = {item.stock}</MDBBadge>
            )
          }
        })}
        <button onClick={() => this.editStock(id)}>Edit</button>
        {this.state.selectedId === id ? this.renderEditSize(id) : null}
      </div>
    }
    else {
      return (
        <>
          <div style={{ textAlign: "center" }}>
            <button className="BtAddStock" onClick={() => this.addStock(id)}>Add Stock</button>
          </div>
          {this.state.selectedId === id ? this.renderAddSize(id, name) : null}
        </>
      )
    }
  }

  addStock = (id) => {
    console.log(id)
    this.setState({ selectedId: id })
    this.toggle(3);
  }
  editStock = (id) => {
    // console.log(id)
    this.setState({ selectedId: id })
    this.toggle(4);
    // this.getStockDetail(id)
  }

  renderAddSize = (id, name) => {
    return <Modal contentClassName="modalBG" isOpen={this.state.sizeModal} toggle={() => this.toggle(3)}>
      <div className="text-center headerModalBG">
        <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Add Stock</h4>
      </div>
      <ModalBody >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <MDBFormInline>
            <MDBRow>
              {this.props.sizes.map((val, index) => {
                return (
                  <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" key={val.id}>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{ padding: 0, width: 63, paddingLeft: 2 }}>
                          <input type="checkbox" id={`size${val.id}`} onChange={this.checkSizehandler} disabled aria-label="Checkbox for following text input" ref={`size${val.id}`} value={val.id} />&nbsp;
                                {val.size}&nbsp;
                          </div>
                      </div>
                      <input type="text" id={`qty${val.id}`} onChange={this.inQtyhandler} name={val.id} className="form-control" aria-label="Text input with checkbox" />
                    </div>
                  </MDBCol>
                )
              })
              }
            </MDBRow>
          </MDBFormInline>
        </FormGroup>
        <span onClick={this.resetOrder}>
          <p style={{ padding: 5, marginBottom: 0 }}>Reset Stock &nbsp;
            <i style={{ verticalAlign: 'middle', cursor: 'pointer' }} class="material-icons">settings_backup_restore</i>
          </p>
        </span>
      </ModalBody>
      <div id="sidesModal">
        <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.toggle(3)}>Cancel</button>
        <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.submitStock(id)}>Submit</button>
      </div>
    </Modal>
  }

  renderEditSize = (id, name) => {
    // return this.props.stocks.map((data) => {
    //   if (this.state.selectedId === data.productID) {
    return (<Modal contentClassName="modalBG" isOpen={this.state.editSizeModal} toggle={() => this.toggle(4)}>
      <div className="text-center headerModalBG">
        <h4 style={{ padding: 4, color: 'white', margin: 2 }}>Add Stock</h4>
      </div>
      <ModalBody >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <MDBFormInline>
            {this.props.sizes.map((val, index) => {
              return (
                <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" key={val.id}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text" style={{ padding: 0, width: 63, paddingLeft: 2 }}>
                        <input type="checkbox" id={`size${val.id}`} onChange={this.checkSizehandler} disabled aria-label="Checkbox for following text input" ref={`size${val.id}`} value={val.id} />&nbsp;
                                {val.size}&nbsp;
                          </div>
                    </div>
                    {
                      this.props.stocks.some(item => item.id === id && val.size === item.size) ?
                        this.props.stocks.map((data) => {
                          if (id === data.id && val.size === data.size) {
                            return <input type="text" id={`qty${val.id}`} onChange={this.inQtyhandler} name={val.id} className="form-control" aria-label="Text input with checkbox" defaultValue={data.stock} />
                          }
                        })
                        :
                        <input type="text" id={`qty${val.id}`} onChange={this.inQtyhandler} name={val.id} className="form-control" aria-label="Text input with checkbox" />
                    }
                  </div>
                </MDBCol>
              )
            })
            }
          </MDBFormInline>
        </FormGroup>
        <span onClick={this.resetOrder}>
          <p style={{ padding: 5, marginBottom: 0 }}>Reset Stock &nbsp;
            <i style={{ verticalAlign: 'middle', cursor: 'pointer' }} className="material-icons">settings_backup_restore</i>
          </p>
        </span>
      </ModalBody>
      <div id="sidesModal">
        <button className="element-FormCancel" id="leftForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.toggle(4)}>Cancel</button>
        <button className="element-FormLogin" id="rightForm" style={{ height: "50px", width: "54%", padding: '0' }} onClick={() => this.submitStock(id)}>Submit</button>
      </div>
    </Modal>
    )
  }

  yesEdit = (id) => {
    let { addImageFile } = this.state;
    let formData = new FormData()
    let obj = {}
    if (this.refs.nameEdit.value === '' || this.refs.priceEdit.value === '' || this.refs.descriptionEdit === '') {
      alert('Complete Your Changes')
    }
    else if (addImageFile) {
      obj = {
        name: this.refs.nameEdit.value,
        materialID: this.state.addMaterialID,
        description: this.refs.descriptionEdit.value,
        price: this.refs.priceEdit.value
      }
      formData.append('image', addImageFile)
    }
    else {
      obj = {
        name: this.refs.nameEdit.value,
        materialID: this.state.addMaterialID,
        description: this.refs.descriptionEdit.value,
        price: this.refs.priceEdit.value
      }
      // formData.append('image', null)
    }
    formData.append('data', JSON.stringify(obj))
    console.log(formData)
    Axios.post(API_URL + `/products/edit?id=${id}`, formData)
      .then((res) => {
        console.log(res.data)
        this.props.getAllProduct('All')
        this.props.getProductPagination(0)
        this.setState({ addImageFileName: 'Select Image', addImageFile: undefined, selectedId: null })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  noEdit = () => {
    this.setState({ selectedId: null })
    this.props.getAllProduct('All')//update data
  }
  submitData = () => {
    let { addImageFile } = this.state;
    if (addImageFile) {
      let formData = new FormData()
      let obj = {
        name: this.refs.nameProduct.value,
        categoryID: this.state.addCategoryID,
        materialID: this.state.addMaterialID,
        description: this.refs.descriptionProduct.value,
        price: this.refs.priceProduct.value
      }
      formData.append('data', JSON.stringify(obj))
      formData.append('image', addImageFile)
      console.log(formData)
      Axios.post(API_URL + '/products/upload', formData)
        .then((res) => {
          console.log(res.data)
          this.setState({ addImageFileName: 'Select Image', addImageFile: undefined })
          this.toggle(1)
          this.props.getAllProduct('All')
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
        this.props.getStock()
        this.setState({ editStock: false, selectedId: null, sizeQty: []})
        this.toggle(3)
      })
  }

  onBtnAddImageFile = (e) => {
    console.log('gambar', e.target.files[0])
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
        this.props.getAllProduct('All')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderListMaterial = () => {
    return this.props.materials.map((val, index) => {
      return (
        <option value={val.id}>{val.material}</option>
      )
    })
  }
  renderListCategories = () => {
    return this.props.categories.map((val, index) => {
      return (
        <option value={val.id}>{val.category}</option>
      )
    })
  }

  onChangeSelectCategory = (e) => {
    this.setState({ addCategoryID: parseInt(e.target.value) })
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
      document.getElementById(`size${e.target.value}`).disabled = true
      if (qty !== null) {
        sizeQty.push([parseInt(this.state.selectedId), parseInt(e.target.value), parseInt(qty)])
        console.log(sizeQty)
      }
    }
  }

  // checkSizeEdithandler = (e) => {
  //   let { sizeQty } = this.state
  //   let qty = document.getElementById(`qty${e.target.value}`).value
  //   if (!e.target.checked) {
  //     document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
  //   } else if (e.target.checked) {
  //     document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
  //     document.getElementById(`size${e.target.value}`).disabled = true
  //     if (qty !== null) {
  //       sizeQty.push([parseInt(this.state.selectedId), parseInt(e.target.value), parseInt(qty)])
  //       console.log(sizeQty)
  //     }
  //   }
  // }

  inQtyhandler = (e) => {
    console.log('check size', e.target.value)
    let size = document.getElementById(`size${document.getElementById(`size${e.target.name}`).value}`)
    console.log('size', size)
    e.target.value >= 1 ? size.disabled = false : size.disabled = true
  }

  resetOrder = () => {
    this.setState({ sizeQty: [] })
    console.log(this.state.orderOption)
    this.props.sizes.forEach((val) => {
      document.getElementById(`size${val.id}`).checked = false
      document.getElementById(`qty${val.id}`).disabled = false
    })
  }

  renderBtPagination = () => {
    let btPag = []
    let countGet = 0
    for (var i = 1; i <= this.props.allProduct.length / 5; i++) {
      btPag.push({ get: countGet, btPage: i })
      countGet += 5
    }
    return btPag.map((item) => {
      return (
        <MDBBtn outline color="warning" onClick={() => this.props.getProductPagination(item.get)}>{item.btPage}</MDBBtn>
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
                          {/* <td>#</td> */}
                          <td style={{ width: 230 }}>Image</td>
                          <td style={{ width: 130 }}>Name</td>
                          <td style={{ width: 150 }}>Material</td>
                          <td style={{ width: 150 }}>Stock</td>
                          <td style={{ width: 190 }}>Price</td>
                          <td>Description</td>
                          <td style={{ width: 260 }}>Action</td>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {this.renderData()}
                      </MDBTableBody>
                    </MDBTable>
                    <div style={{ textAlign: "center" }}>
                      <div>
                        <MDBBtnGroup size="sm" className="mr-2">
                          {this.renderBtPagination()}
                        </MDBBtnGroup>
                      </div>
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
                  Category
                  <select className="form-control form-control-sm" value={this.state.addCategoryID}
                    onChange={this.onChangeSelectCategory}>
                    <option value={0}>Choose Category</option>
                    {this.renderListCategories()}
                  </select>
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
const mapToProps = ({ products }) => {
  return { ...products }
}

export default connect(mapToProps, { getAllProduct, getProductPagination, getSizes, getMaterials, getStock, getCategories })(ProductPage);