import React from 'react';
import {
    MDBBadge, MDBTooltip, MDBIcon, MDBNavLink, MDBRow, MDBCol
} from "mdbreact";
import { connect } from 'react-redux'
import { getCart } from '../redux/action'
import { API_URL } from '../support/Backend_URL';
import Axios from 'axios'

class CartNotif extends React.Component {
    state = {
        cartNotif: [],
        totalPrice: 0
    }

    componentDidUpdate() {
        if (this.props.user) {
            return this.props.getCart()
        }
    }

    deleteCart = (id) => {
        console.log(id)
        Axios.delete(API_URL + `/carts/deleteCart/${id}`)
            .then((res) => {
                console.log(res.data)
                this.props.getCart()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <MDBTooltip domElement placement="bottom" >
                <span style={{ margin: 'auto' }}>
                    <MDBNavLink className="waves-effect waves-light" to="/CartPage" >
                        <MDBIcon className="waves-effect waves-light" icon="shopping-cart" style={{ bottom: 0, top: 10, padding: 5 }}>
                            <MDBBadge pill color="primary" className="ml-1">
                                {this.props.cartUsers.length}
                            </MDBBadge>
                        </MDBIcon>
                    </MDBNavLink>
                </span>
                <div>
                    {this.props.cartUsers.map((item) => {
                        return (
                            <MDBRow key={item.id} style={{ borderBottom: '3 px solid white' }}>
                                <MDBCol sm='5'>
                                    <img src={API_URL + item.imagepath} width='100%' alt="product" />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ margin: 0 }}>Product : {item.name}</p>
                                    <p style={{ margin: 0 }}>Qty : {item.qty} (x {item.productPrice.toLocaleString()})</p>
                                    <p style={{ margin: 0 }}>IDR. {item.price.toLocaleString()}</p>
                                </MDBCol>
                                {/* <span style={{ margin: 0, color: 'gray', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => this.deleteCart(item.id)}>x Delete</span> */}
                            </MDBRow>
                        )
                    })}
                    <MDBRow>
                        <MDBCol sm='5'>
                            <p>Your Cost:</p>
                        </MDBCol>
                        <MDBCol>
                            <p style={{ margin: 0 }}>IDR. {this.props.cartUsers.length > 0 ? parseInt(this.props.cartUsers.totalPrice).toLocaleString() : 0}</p>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBTooltip>
        );
    }
}

const mapStatetoProps = ({ cartUsers, user }) => {
    return { ...cartUsers, user }
}

export default connect(mapStatetoProps, { getCart })(CartNotif);
