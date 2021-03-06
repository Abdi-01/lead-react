import React from "react";
import '../assets/css/custompage.css'
import { MDBRow, MDBCol, MDBTooltip } from 'mdbreact';
import { CustomInput } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';
import { getSizes, getMaterials, getStock, getCategories } from '../redux/action'
import SizeCart from '../component/sizeCart'
import Swal from 'sweetalert2'

class CustomDesignTransaction extends React.Component {
  state = {
    addImageFileName: 'Select your design before',
    addImageFile: undefined,
    orderOption: [],
    addCategoryID: 0,
    addMaterialID: 0,
    addPrice: 0,
    totalPrice: 0,
    orderQty: 0,
    detailOrder: ''
  }

  componentDidMount() {
    this.props.getSizes()
    this.props.getMaterials()
    this.props.getStock()
    this.props.getCategories()
    Swal.fire({
      text: 'After download your design, upload to transaction',
      imageUrl: require('../image/ilustration/designer_ (1).png'),
      imageWidth: 300,
      imageAlt: 'Custom image',
      width: 300,
      showConfirmButton: false,
      timer: 10000
    });
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

  onChangeSelectCategory = (e) => {
    console.log(e.target.value)
    this.setState({ addCategoryID: parseInt(e.target.value) })
  }

  onChangeSelectMaterial = (e) => {
    console.log("Material Choose", e.target.value)
    this.setState({ addMaterialID: parseInt(e.target.value) })
  }

  renderListCategories = () => {
    return this.props.categories.map((val, index) => {
      if (val.category === "T-Shirt") {
        return (
          <option value={val.id} onClick={() => {
            this.setState({ addPrice: val.customPrice, addCategory: val.category })
            this.resetOrder()
          }}>{val.category}</option>
        )
      }
    })
  }

  renderListMaterial = () => {
    return this.props.materials.map((val, index) => {
      return (
        <option value={val.id} onClick={() => {
          this.setState({ addMaterial: val.material })
        }}>{val.material}</option>
      )
    })
  }

  generateOrder = (orderOption) => {
    let count = 0
    if (orderOption.length > 0) {
      orderOption.map((val) => count += val.qty)
      let detail = ''
      for (let i = 0; i < orderOption.length; i++) {
        detail += `${orderOption[i].size} = ${orderOption[i].qty}/`
      }
      console.log(count)
      this.setState({ totalPrice: this.state.addPrice * count, orderQty: count, detailOrder: detail })
    }
  }

  checkSizehandler = (e) => {
    let { orderOption } = this.state
    let qty = document.getElementById(`qty${e.target.value}`).value
    if (!e.target.checked) {
      document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
    } else if (e.target.checked) {
      document.getElementById(`qty${e.target.value}`).disabled = e.target.checked
      document.getElementById(`size${e.target.value}`).disabled = true
      if (qty !== null) {
        orderOption.push({ size: e.target.value, qty: parseInt(qty) })
        this.generateOrder(this.state.orderOption)
        console.log(orderOption)
      }
    }
  }

  inQtyhandler = (e) => {
    console.log('check size', e.target.value)
    console.log('check size', e.target.name)
    let size = document.getElementById(`size${e.target.name}`)
    console.log('size', size)
    e.target.value > 0 ? size.disabled = false : size.disabled = true
  }

  resetOrder = () => {
    if (this.state.orderOption.length > 0) {
      this.state.orderOption.splice(0, this.state.orderOption.length)
      this.setState({ orderOption: [], totalPrice: 0 })
      this.props.sizes.forEach((val) => {
        document.getElementById(`qty${val.size}`).value = null
        document.getElementById(`size${val.size}`).checked = false
        document.getElementById(`size${val.size}`).disabled = true
        document.getElementById(`qty${val.size}`).disabled = false
      })
      console.log(this.state.orderOption)
    }
    else{
      return null
    }
  }

  orderNow = () => {
    let { addPrice, addImageFile, orderQty, detailOrder } = this.state
    if(this.props.user.role==='user'){
      if (!this.state.addCategory || !this.state.addMaterial || detailOrder === '') {
        Swal.fire({
          text: 'Complete your custom order form',
          imageUrl: require('../image/ilustration/personal_data_.png'),
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: 'Custom image',
          width: 200,
          showConfirmButton: false,
          timer: 2500
        });
      } else {
        if (addImageFile) {
          let formData = new FormData()
          let data = {
            userID: this.props.user.id,
            category: this.state.addCategory,
            material: this.state.addMaterial,
            detail: detailOrder,
            qty: orderQty,
            price: addPrice,
            note: this.refs.orderNote.value
          }
          console.log(data)
          formData.append('data', JSON.stringify(data))
          formData.append('image', addImageFile)
          console.log('form', formData)
          Axios.post(API_URL + '/carts/customOrder', formData)
            .then((res) => {
              console.log(res.data)
              this.setState({
                addImageFileName: 'Select Image', addImageFile: undefined, orderOption: [],
                addCategoryID: 0,
                addMaterialID: 0,
                addPrice: 0,
                totalPrice: 0,
                orderQty: 0,
                detailOrder: '',
                redirect: true
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          Swal.fire({
            text: 'Upload your image order',
            imageUrl: require('../image/ilustration/ui_design_.png'),
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Custom image',
            width: 200,
            showConfirmButton: false,
            timer: 2500
          });
        }
      }
    }else{
      Swal.fire({
        text: 'Please login first',
        imageUrl: require('../image/ilustration/authentication.svg'),
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        width: 200,
        showConfirmButton: false,
        timer: 3000
    });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/CheckoutCustomPage'></Redirect>)
    }
    return (
      // <div style={{ marginBottom: '25%' }}>
      <div className="flexible-content">
        <div className="jumbotron" style={{ padding: 0, width: '80%', marginLeft: '10%', marginRight: '10%', marginTop: '2.5%' }}>
          <MDBRow>
            <div className="nameTag">
              <strong><h1>Custom Order</h1></strong>
            </div>
          </MDBRow>
          <MDBRow>
            <MDBCol md="5" style={{ padding: 0 }}>
              <img src="https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg" alt="preview" id="imgpreview" className="img-fluid" width="100%" />
              <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
            </MDBCol>
            <MDBCol>
              <div style={{ paddingTop: 10 }}>
                <MDBRow>
                  <MDBCol sm="3"><p className="h6 text-muted" >CATEGORY</p></MDBCol>
                  <MDBCol sm="8">
                    <select className="form-control form-control-sm" value={this.state.addCategoryID}
                      onChange={this.onChangeSelectCategory}>
                      <option value={0}>Choose Category</option>
                      {this.renderListCategories()}
                    </select>
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol sm="3"><p className="h6 text-muted" >PRICE</p></MDBCol>
                  <MDBCol sm="8"><p className="h4 font-weight-bold" style={{ color: "orange" }} >IDR. {parseInt(this.state.addPrice).toLocaleString()}/pcs</p></MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol sm="3"><p className="h6 text-muted" >MATERIAL</p></MDBCol>
                  <MDBCol sm="8">
                    <select className="form-control form-control-sm" value={this.state.addMaterialID}
                      onChange={this.onChangeSelectMaterial}>
                      <option value={0}>Choose Material</option>
                      {this.renderListMaterial()}
                    </select>
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow>
                  <MDBCol sm="3"><p className="h6 text-muted" >ORDER</p></MDBCol>
                  <MDBCol sm="8">
                  <SizeCart></SizeCart>
                    {this.state.addCategoryID > 0 ?
                      <MDBRow>
                        {this.props.sizes.map((val, index) => {
                          return (
                            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" key={val.id}>
                              <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                  <div className="input-group-text" style={{ padding: 0, width: 63, paddingLeft: 2 }}>
                                    <input type="checkbox" id={`size${val.size}`} onChange={this.checkSizehandler} disabled aria-label="Checkbox for following text input" value={val.size} />&nbsp;
                                          {val.size}&nbsp;
                                    </div>
                                </div>
                                <input type="text" id={`qty${val.size}`} onChange={this.inQtyhandler} name={val.size} className="form-control" aria-label="Text input with checkbox" />
                              </div>
                            </MDBCol>
                          )
                        })}
                      </MDBRow>
                      :
                      <p>Choose category first</p>
                    }
                    <MDBRow style={{ paddingLeft: '13px' }}>
                      <MDBTooltip domElement placement="top">
                        <span style={{ margin: 'auto' }} onClick={this.resetOrder}>
                          <i style={{ verticalAlign: 'middle', cursor: 'pointer' }} class="material-icons">settings_backup_restore</i>
                        </span>
                        <p style={{ padding: 0 }}>Reset Order</p>
                      </MDBTooltip>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3"><p className="h6 text-muted" >NOTE</p></MDBCol>
                  <MDBCol sm="8">
                    <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" ref='orderNote' />
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
          <br />
          <MDBRow>
            <div style={{ width: '100%' }}>
              <div className="float-right" style={{ marginRight: '1%' }}>
                <button className="element-AddToCart h2" style={{ height: '100%' }} onClick={this.orderNow}>Order Now</button>
              </div>
              <div style={{ backgroundColor: 'silver', color: 'white', marginLeft: '1%', width: '95%', height: '88%' }}>
                <h4 className="font-weight-bold" style={{ padding: '15px 0 15px 2%', color: 'black' }}>Total : IDR. {parseInt(this.state.totalPrice).toLocaleString()} </h4>
              </div>
            </div>
          </MDBRow>
        </div>
      </div>
      // </div>
    );
  }
}

const mapToProps = ({ user, products }) => {
  return { user, ...products }
}

export default connect(mapToProps, { getSizes, getMaterials, getStock, getCategories })(CustomDesignTransaction);