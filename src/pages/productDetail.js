import React, { Component } from 'react'
import example from '../image/logoblack.png'
import { fabric } from 'fabric'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    imageCanvas = (e) => {
        var canvas = new fabric.Canvas('c');
        var fileType = e.target.files[0].type;
        var url = URL.createObjectURL(e.target.files[0]);

        if (fileType === 'image/png') { //check if png
            fabric.Image.fromURL(url, function (img) {
                img.set({
                    width: 180,
                    height: 180
                });
                canvas.add(img);
            });
        } else if (fileType === 'image/svg+xml') { //check if svg
            fabric.loadSVGFromURL(url, function (objects, options) {
                var svg = fabric.util.groupSVGElements(objects, options);
                svg.scaleToWidth(180);
                svg.scaleToHeight(180);
                canvas.add(svg);
            });
        }
    }

    render=()=> {
        var canvas = new fabric.Canvas('c');
        // fabric.Image.fromURL("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", function (img) {
        //     img.set({
        //         width: 180,
        //         height: 180
        //     });
        //     canvas.add(img);
        // });
        var rect = new fabric.Rect({
            fill: '#06538e',
            width: 125,
            height: 125,
            stroke: 'red',
            // strokeDashArray: [5, 5]
          });
          canvas.add(rect);
        return (
            <div style={{ minHeight: '500px' }}>
                Product detail
                {/* <canvas id="c" width="900px" height="750px" style={{ border: "1px solid black" }}>
                </canvas> */}
                {/* <input type="file" onChange={()=>this.imageCanvas(this.event)}/> */}
                    <canvas id="c" width="900px" height="750px"></canvas>
                    {/* <img src={example} id="my-image"></img> */}
            </div>
                );
            }
        }
        
export default ProductDetail;