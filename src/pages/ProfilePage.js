import React, { Component } from 'react';
import { MDBCard, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdbreact';//MDBCardImage,
import SideNavigation from '../component/sideNavigation'
import { connect } from 'react-redux'
import { EditProfile, EditPassword } from '../redux/action'

class ProfilePage extends Component {
  state = {
    data: []
  };

  editProfile = () => {
    console.log(this.props.id)
    let usernameNew = this.refs.userName.value
    let emailNew = this.refs.userEmail.value
    let phoneNew = this.refs.userPhone.value
    let data = {
      newuser: usernameNew,
      newemail: emailNew,
      newphone: phoneNew
    }
    this.props.EditProfile(data)
  }

  editPassword = () => {
    let oldPass = this.refs.oldPass.value
    let newPass = this.refs.newPass.value
    let confPass = this.refs.confPass.value
    let data = {
      oldpass: oldPass,
      newpass: newPass
    }
    if (newPass === confPass) {
      this.props.EditPassword(data)
      document.getElementById("inputPasswordOld").value = ''
      document.getElementById("inputPasswordNew").value = ''
      document.getElementById("inputPasswordConf").value = ''
    }
  }

  render() {
    let {username,email,phone} = this.props
    return (
      <div >
        <SideNavigation />
        <main id="content" className="p-5">
          <MDBRow className="justify-content-center">
            <MDBCol md="11">
              <MDBCard>
               <MDBCardBody>
                  <MDBCardTitle className="mb-2 font-bold">Edit Profile</MDBCardTitle>
                  <div className="form-group row">
                    <label htmlFor="inlineFormInputName" className="col-sm-3 col-form-label">Username</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="inlineFormInputName" ref="userName" defaultValue={username} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" id="staticEmail" ref="userEmail" defaultValue={email} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="phone" ref="userPhone" defaultValue={phone} />
                    </div>
                  </div>
                  <div className="row justify-content-end pr-1">
                    <MDBBtn size="sm" color="dark" onClick={this.editProfile}>Save Profile</MDBBtn>
                  </div>
                  <MDBCardTitle className="mb-2 font-bold">Edit Password</MDBCardTitle>
                  <div className="form-group row">
                    <label htmlFor="inputPasswordOld" className="col-sm-3 col-form-label">Old Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" id="inputPasswordOld" ref="oldPass" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPasswordNew" className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" id="inputPasswordNew" ref="newPass" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPasswordConf" className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" id="inputPasswordConf" ref="confPass" />
                    </div>
                  </div>
                  <div className="row justify-content-end pr-1">
                    <MDBBtn size="sm" color="dark" onClick={this.editPassword}>Save Password</MDBBtn>
                  </div>
                  {/* <MDBCardTitle className="mb-2 font-bold">Edit Personal Address</MDBCardTitle> */}
                  {/* <div className="form-group row">
                    <label htmlFor="inputAddress2" className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="form-group row">
                        <label htmlFor="inputAddress2" className="col-sm-6 col-form-label">City</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" id="inputAddress2" placeholder="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group row">
                        <label htmlFor="inputAddress2" className="col-sm-3 col-form-label">Region</label>
                        <div className="col-sm-9">
                          <select id="inputState" className="form-control col-sm-9">
                            <option defaultValue="0">Choose...</option>
                            <option>...</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputZip" className="col-sm-3 col-form-label">Zip</label>
                    <div className="col-sm-3">
                      <input type="text" className="form-control" id="inputZip" />
                    </div>
                  </div>
                  <div className="row justify-content-end pr-1">
                    <MDBBtn size="sm" color="dark">Save Address</MDBBtn>
                  </div> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </main>
      </div >
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    id: state.user.id,
    username: state.user.username,
    phone: state.user.phone,
    email: state.user.email,
    role: state.user.role
  }
}
export default connect(mapStatetoProps, { EditProfile, EditPassword })(ProfilePage);

