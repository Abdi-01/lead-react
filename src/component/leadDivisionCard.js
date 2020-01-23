import React, { Component } from "react";
import {
    MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon
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
                        <MDBCard narrow >
                            <MDBCardImage top src={require('../image/globalcard.png')} overlay="white-slight" hover height="210px"
                                waves alt="MDBCard image cap" />
                                {/* <img alt="MDB React Logo" className="img-fluid" width="100%" src={require('../image/globalcard.png')}/> */}
                            <MDBCardBody cascade className="text-center">
                                <MDBCardTitle tag="h5">
                                    Global Product
                                    </MDBCardTitle>
                                <MDBCardText>
                                    Produk pakaian yang kami perjual belikan secara global dengan berbagai macam jenis dan kategori.
                                </MDBCardText>
                                <button type="button" className="element-BtCard">Lihat Produk&nbsp;
                                        <MDBIcon icon="angle-double-right" /></button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard narrow  >
                            <MDBCardImage top src={require('../image/sportcard.png')} overlay="white-slight" hover height="210px"
                                waves alt="MDBCard image cap" />
                            <MDBCardBody className="text-center">
                                <MDBCardTitle tag="h5">
                                    Sport Apparel
                                    </MDBCardTitle>
                                <MDBCardText>
                                    Produk pakaian yang berfokus pada kategori olahraga seperti Jersey, kaos kaki, manset dan sejenisnya
                                    </MDBCardText>
                                <button type="button" className="element-BtCard">Lihat Produk&nbsp;
                                        <MDBIcon icon="angle-double-right" /></button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard narrow  >
                            <MDBCardImage top src={require('../image/customcard.png')} overlay="white-slight" hover height="210px"
                                waves alt="MDBCard image cap" />
                            <MDBCardBody className="text-center">
                                <MDBCardTitle tag="h5">
                                    Custom Product
                                    </MDBCardTitle>
                                <MDBCardText>
                                    Berbagai komunitas dan perusahaan telah bekerjasama dengan kami untuk memproduksi pakaian yang mereka butuhkan.
                                    </MDBCardText>
                                <button type="button" className="element-BtCard">
                                    &nbsp;Portofolio &nbsp;
                                        <MDBIcon icon="angle-double-right" />
                                </button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

export default FlippingCardPage;