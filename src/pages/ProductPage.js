import React, { Component } from 'react'
import { Button, CustomInput } from 'reactstrap'
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
  toggle = this.toggle.bind(this);
  toggle() {
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
            <td ><CustomInput className="form-control btn-sm" id='uploadEdit' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file'/></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameEdit' defaultValue={val.name} /></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryEdit' defaultValue={val.category}/></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Size" ref='sizeEdit' defaultValue={val.size}/></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingEdit' defaultValue={val.rating}/></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceEdit' defaultValue={val.price}/></td>
            <td ><input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionEdit' defaultValue={val.description}/></td>
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
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}><img src={'http://localhost:2000/' + val.imagepath} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img></td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.name}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.category}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.size}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.rating}</td>
            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}>{val.price}</td>
            <td id={val.idproduct} style={{ whiteSpace: 'nowrap', textOverflow: 'elipsis', overflow: 'hidden', maxWidth: '3px', verticalAlign: 'middle' }}>{val.description}
            </td>

            <td id={val.idproduct} style={{ verticalAlign: 'middle' }}><button className="btn btn-success btn-sm" onClick={() => this.editData(val.idproduct)}>Edit</button>
              &nbsp;
                        <button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.idproduct,val.imagepath)}>Delete</button></td>
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
    var sizeNew = this.refs.sizeProduct.value
    var ratingNew = this.refs.ratingProduct.value
    var priceNew = this.refs.priceProduct.value
    var descriptionNew = this.refs.descriptionProduct.value
    if (addImageFile) {
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
      Axios.post(API_URL + '/products/upload', formData)
        .then((res) => {
          console.log(res.data)
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
                          <td style={{ width: 150 }}>Size</td>
                          <td style={{ width: 150 }}>Rating</td>
                          <td style={{ width: 150 }}>Price</td>
                          <td>Description</td>
                          <td>Action</td>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {this.renderData()}
                        <tr >
                          <td>#</td>
                          <td ><CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Name" ref='nameProduct' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Category" ref='categoryProduct' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Size" ref='sizeProduct' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Rating" ref='ratingProduct' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Price" ref='priceProduct' /></td>
                          <td ><input type="text" className="form-control form-control-sm" placeholder="Input Description" ref='descriptionProduct' /></td>
                          <td><button type="submit" className="btn btn-primary btn-sm" onClick={this.submitData}>Submit</button></td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </main>
        </div>
      </div>
    )
  }
}

export default ProductPage