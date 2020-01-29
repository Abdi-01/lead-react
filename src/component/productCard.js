import React, { Component } from 'react';
import { MDBIcon, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter} from "mdbreact";
import {UncontrolledTooltip} from 'reactstrap'
import { API_URL } from '../support/Backend_URL'
import Axios from 'axios'

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        Axios.get(API_URL + `/products/getproducts`)
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="row">
                {this.state.data.map((val, index) =>
                    <MDBCol lg="3" md="12" style={{ marginTop: "2%" }} className="mb-lg-0 mb-4" key={val.idproduct}>
                        <MDBCard wide ecommerce>
                            <MDBCardImage
                                hover
                                cascade
                                src={API_URL + val.imagepath}
                                top
                                alt="sample photo"
                                height="250px"
                                className="objectFit"
                            />
                            <MDBCardBody cascade className="text-center">
                                <a href="#!" className="text-muted">
                                    <h6>{val.category}</h6>
                                </a>
                                <MDBCardTitle>
                                    <strong>
                                        <h5>{val.name}</h5>
                                    </strong>
                                </MDBCardTitle>
                                {/* <MDBCardText>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing minima
                                    veniam elit.
                        </MDBCardText> */}
                                <div className="float-left price">
                                    <strong>IDR. {val.product_price.toLocaleString()}</strong>
                                </div>
                                <div className="float-right">
                                    <MDBIcon id="quickDetail" icon="eye" style={{ cursor: "pointer" }} />
                                </div>
                                <UncontrolledTooltip placement="top" target="quickDetail">
                                    Quick Detail
                                </UncontrolledTooltip>
                                <MDBCardFooter transparent />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )}
            </div>
        );
    }
}

export default ProductCard;
