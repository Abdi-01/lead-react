import React, { Component } from "react";
import '../assets/css/card.css'
import {
    MDBCol, MDBRow
} from "mdbreact";

class FlippingCardPage extends Component {
    state = {
        // flipped2: false
    }

    render() {
        return (
            <div>
                <MDBRow>
                    <MDBCol md="4">
                        <MDBRow>
                            <img src={require('../image/globalcard.png')} className="objectFit" height="210px" alt="imagecap"></img>
                        </MDBRow>
                        <MDBRow>
                            <h4 className="text-center" style={{ width: '100%', marginTop:10  }}>Global Product</h4>
                        </MDBRow>
                        <MDBRow>
                            <p className="text-center" style={{ width: '100%' }}>
                                Produk pakaian yang kami perjual belikan secara global dengan berbagai macam jenis dan kategori.
                            </p>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBRow>
                            <img src={require('../image/sportcard.png')} className="objectFit" height="210px" alt="imagecap"></img>
                        </MDBRow>
                        <MDBRow>
                            <h4 className="text-center" style={{ width: '100%',marginTop:10  }}>Sport Apparel</h4>
                        </MDBRow>
                        <MDBRow>
                            <p className="text-center" style={{ width: '100%' }}>
                                Produk pakaian yang berfokus pada kategori olahraga seperti Jersey, kaos kaki, manset dan sejenisnya
                            </p>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBRow>
                            <img src={require('../image/customcard.png')} className="objectFit" height="210px" alt="imagecap"></img>
                        </MDBRow>
                        <MDBRow>
                            <h4 className="text-center" style={{ width: '100%',marginTop:10 }}>Custom Product</h4>
                        </MDBRow>
                        <MDBRow>
                            <p className="text-center" style={{ width: '100%' }}>
                                Berbagai komunitas dan perusahaan telah bekerjasama dengan kami untuk memproduksi pakaian yang mereka butuhkan.
                            </p>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

export default FlippingCardPage;