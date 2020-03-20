import React from "react";
import '../assets/css/custompage.css'
import { fabric } from 'fabric'
// import template from '../image/default-image.jpg'
import templateWhite from '../image/shirtWhite.png'
import templateBlack from '../image/shirtBlack.png'
// import example from '../image/logoblack.png'
import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import { CustomInput } from 'reactstrap';
// import SideNavCustom from '../component/sideNavCustom'

class CustomDesign extends React.Component {
  state = {
    Category: null,
    Clothing: templateWhite
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

  handleImage = (e) => {
    var canvas = new fabric.Canvas('c');
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.set({ angle: 0, padding: 10 }).scaleToWidth(150);
        canvas.centerObject(image);
        canvas.add(image);
        canvas.setActiveObject(image);
        // canvas.renderAll();
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    let data = JSON.stringify(canvas)
    console.log('designA', data)
    canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
    console.log('designB', canvas.loadFromJSON(data, canvas.renderAll.bind(canvas)))
    var canvas1 = document.getElementById("c");
    var image = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
  }

  removeImage = () => {
    var canvas = new fabric.Canvas('c');
    var object = canvas.getActiveObject();
    if (!object) {
      alert('Please select the element to remove');
      return '';
    }
    canvas.remove(object);
  }

  clothingCategory = (sel) => {
    console.log(sel.refs.template.value)
    this.setState({ Category: sel.refs.template.value })
  }

  clothingColor = (sel) => {
    // console.log(sel.refs.template.value)
    this.setState({ Clothing: sel })
  }

  render() {
    return (
      // <div style={{ marginBottom: '25%' }}>
      <div className="flexible-content">
        <div className="sidebar-fixed position-absolute">
          <MDBListGroup className="list-group-flush">
            {/* <NavLink to="/ProfilePage" activeClassName="activeClass"> */}
            <MDBListGroupItem>
              Product Category
              <select ref="template" onChange={() => this.clothingCategory(this)} className="browser-default custom-select">
                <option selected value="Choose">Choose..</option>
                <option value="Shirt" >Shirt</option>
                <option value="Hoodie">Hoodie</option>
              </select>
              {this.state.Category === "Shirt"
                ?
                <>
                  <MDBBtn color="#fffff" size="sm" onClick={() => this.clothingColor(templateWhite)}></MDBBtn>
                  <MDBBtn color="elegant" size="sm" onClick={() => this.clothingColor(templateBlack)}></MDBBtn>
                </>
                :
                <>
                  {/* <MDBBtn color="yellow" size="sm"></MDBBtn>
                  <MDBBtn color="indigo" size="sm"></MDBBtn> */}
                </>
              }
            </MDBListGroupItem>
            <MDBListGroupItem>
              Add Picture
                        <div style={{ textAlign: 'center' }}>
                {/* <img src="https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg" alt="" id="imgpreview" className="img-fluid" width="200px" /> */}
              </div>
              {/* <CustomInput className="form-control btn-sm" id='upload' onChange={this.onBtnAddImageFile} label={this.state.addImageFileName} type='file' /> */}
              {/* <input type="file" id='upload' onChange={this.handleImage}/> */}
              <CustomInput className="form-control btn-sm" id='upload' onChange={this.handleImage} label={this.state.addImageFileName} type='file' />
              <button onClick={this.removeImage}>Delete</button>
            </MDBListGroupItem>
          </MDBListGroup>
        </div>
        <main id="content" className="p-5" style={{ height: "1300px" }}>
          <div id="canvas-wrapper" className="editor-area">
            <div className="canvas-bg-wrapper">
              <img className="canvas-bg" alt="" src={this.state.Clothing} />
              <canvas width="390" height="540" id="c"></canvas>
            </div>
          </div>
        </main>
      </div>
      // </div>
    );
  }
}

export default CustomDesign;