import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import {  CustomInput} from 'reactstrap';

class SideNav extends Component {
    state = {

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

    render() {
        return (
            <div className="sidebar-fixed position-absolute">
                <MDBListGroup className="list-group-flush">
                    {/* <NavLink to="/ProfilePage" activeClassName="activeClass"> */}
                    <MDBListGroupItem>
                        Product Category
                        <select className="browser-default custom-select">
                            <option>Choose..</option>
                            <option selected value="1" >Clothing</option>
                            <option value="2">T-Shirt</option>
                            <option value="3">Hoodie</option>
                        </select>
                        <MDBBtn color="#fffff" size="sm"></MDBBtn>
                        <MDBBtn color="elegant" size="sm"></MDBBtn>
                        <MDBBtn color="yellow" size="sm"></MDBBtn>
                        <MDBBtn color="indigo" size="sm"></MDBBtn>
                        <MDBBtn color="mdb-color" size="sm"></MDBBtn>
                        <MDBBtn color="dark-green" size="sm"></MDBBtn>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        Add Picture
                        <div style={{ textAlign: 'center' }}>
                            <img src="https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg" alt="" id="imgpreview" className="img-fluid" width="200px" />
                        </div>
                        <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' />
                    </MDBListGroupItem>
                </MDBListGroup>
            </div>
        );
    }
}

export default SideNav
