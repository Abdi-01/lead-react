import React from "react";
import '../assets/css/custompage.css'
import { fabric } from 'fabric'
import { Redirect } from 'react-router-dom'
import templateWhite from '../image/shirtWhite.png'
import templateBlack from '../image/shirtBlack.png'
import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import { CustomInput } from 'reactstrap';
import htmlToImage from 'html-to-image';
import download from 'downloadjs' //untuk download file

class CustomDesign extends React.Component {
  state = {
    Category: null,
    Clothing: templateWhite
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
        canvas.setActiveObject(image);
        canvas.centerObject(image);
        canvas.add(image);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  toTransaction = async () => {
    var node = document.getElementById('capture');
    let res = await 
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
        // var img = new Image();
        // img.src = dataUrl;
        // localStorage.setItem('gambar', dataUrl)
        return true
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
      if(res===true){
        this.setState({redirect:true})
      }
  }


  // clothingCategory = (sel) => {
  //   console.log(sel.refs.template.value)
  //   this.setState({ Category: sel.refs.template.value })
  // }

  clothingColor = (sel) => {
    this.setState({ Clothing: sel })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/CustomDesignTransaction'></Redirect>)
    }
    return (
      <div className="flexible-content">
        <div className="sidebar-fixed position-absolute">
          <MDBListGroup className="list-group-flush">
            {/* <NavLink to="/ProfilePage" activeClassName="activeClass"> */}
            <MDBListGroupItem>
              1. T-Shirt Color
              <div>
                <MDBBtn color="#fffff" size="sm" onClick={() => this.clothingColor(templateWhite)}></MDBBtn>
                <MDBBtn color="elegant" size="sm" onClick={() => this.clothingColor(templateBlack)}></MDBBtn>
              </div>
            </MDBListGroupItem>
            <MDBListGroupItem>
              2. Add Picture
              <CustomInput className="form-control btn-sm" id='upload' onChange={this.handleImage} label={this.state.addImageFileName} type='file' />
            </MDBListGroupItem>
            <MDBBtn color="grey" onClick={this.toTransaction} >To Transaction</MDBBtn>
          </MDBListGroup>
        </div>
        <main id="content" className="p-5" style={{ height: "1300px" }}>
          <div id="canvas-wrapper" className="editor-area">
            <div id="capture" className="canvas-bg-wrapper">
              <img className="canvas-bg" alt="" src={this.state.Clothing} />
              <canvas width="450" height="540" id="c"></canvas>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default CustomDesign;