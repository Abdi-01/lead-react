import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';
import Axios from 'axios'
import { MDBRow, MDBCol,MDBBadge } from 'mdbreact';

class ProductDetail extends Component {
    state = {
        data: [],
        stockUser:[]
    }

    componentDidMount() {
        console.log(this.props)
        var id = this.props.location.search.split('=')[1];
        Axios.get(API_URL + `/products/getProductById/${id}`)
            .then((res) => {
                this.setState({ data: res.data[0] })
                console.log(this.state.data)
                this.getStockUser(id)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    getStockUser = (id) => {
        Axios.get(API_URL + `/products/getStockUser/${id}`)
            .then((res) => {
                this.setState({ stockUser: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render = () => {
        let { data,stockUser } = this.state;
        return (
            <div className="jumbotron" style={{ padding: 0, width: '70%', marginLeft: '15%', marginRight: '15%', marginTop: '2.5%' }}>
                <MDBRow>
                    <div className="float-left price">
                        <strong><h1>{data.name}</h1></strong>
                    </div>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <img src={API_URL + data.imagepath} style={{ padding: 10 }} width='400' alt="product" />
                    </MDBCol>
                    <MDBCol md="8">
                        <div style={{ marginLeft: '5%', paddingTop: 10 }}>
                            <MDBRow>
                                <MDBCol sm="2"><p className="h6 text-muted" >PRICE</p></MDBCol>
                                <MDBCol sm="8"><p className="h4 font-weight-bold" style={{ color: "orange" }} >IDR. {parseInt(data.price).toLocaleString()}</p></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol sm="2"><p className="h6 text-muted" >MATERIAL</p></MDBCol>
                                <MDBCol sm="8"><p className="h4">{data.material}</p></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol sm="2"><p className="h6 text-muted" >STOCK</p></MDBCol>
                                <MDBCol sm="8">{stockUser.map((item,index)=>{
                                    return(
                                        // <MDBCol>
                                            <MDBBadge color="light"><p className="h5" style={{margin:0}}> {item.size} = {item.stock}</p></MDBBadge>
                                        // </MDBCol>
                                    )
                                })}</MDBCol>
                            </MDBRow>
                            &nbsp;
                            <MDBRow>
                                <MDBCol sm="2"><p className="h6 text-muted" >DESCRIPTION</p></MDBCol>
                                <MDBCol sm="8"><p className="h5" style={{ textAlign: 'justify' }}>{data.description}</p></MDBCol>
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(ProductDetail);