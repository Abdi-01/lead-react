import React from 'react';
import {
    MDBBadge, MDBTooltip, MDBIcon, MDBNavLink, MDBRow, MDBCol
} from "mdbreact";
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../support/Backend_URL';

const mapStatetoProps = (state) => {
    return {
        id: state.user.id
    }
}

class CartNotif extends React.Component {
    state = {
        cartNotif: [],
        totalPrice: 0
    }

    componentDidUpdate() {
        if (localStorage.getItem('cartOwn')) {
            this.getCartNotif(localStorage.getItem('cartOwn'))
        }
        if (this.state.cartNotif.length > 0) {
            this.totalOrder(this.state.cartNotif)
        }
        if (!localStorage.getItem('cartOwn')) {
            this.state.cartNotif.splice(0, this.state.cartNotif.length)
            localStorage.removeItem('sumPrice')
            window.location.reload()
        }
    }

    getCartNotif = (id) => {
        Axios.get(API_URL + `/carts/getCartNotif/${id}`)
            .then((res) => {
                this.setState({ cartNotif: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    totalOrder = (qty) => {
        let count = 0
        if (qty.length > 0) {
            qty.map((val) => count += val.price)
            // console.log(count)
            localStorage.setItem('sumPrice', count)
        }
    }

    render() {
        return (
            <MDBTooltip domElement placement="bottom" >
                <span style={{ margin: 'auto' }}>
                    <MDBNavLink className="waves-effect waves-light" to="#!" >
                        <MDBIcon className="waves-effect waves-light" icon="shopping-cart" style={{ bottom: 0, top: 10, padding: 5 }}>
                            <MDBBadge pill color="primary" className="ml-1">
                                {this.state.cartNotif.length}
                            </MDBBadge>
                        </MDBIcon>
                    </MDBNavLink>
                </span>
                <div>
                    {this.state.cartNotif.map((item) => {
                        return (
                            <MDBRow key={item.id} style={{ borderBottom: '3 px solid white' }}>
                                <MDBCol sm='5'>
                                    <img src={API_URL + item.imagepath} width='100%' alt="product" />
                                </MDBCol>
                                <MDBCol>
                                    <p style={{ margin: 0 }}>Product : {item.name}</p>
                                    <p style={{ margin: 0 }}>Qty : {item.qty}</p>
                                    <p style={{ margin: 0 }}>IDR. {item.price.toLocaleString()}</p>
                                </MDBCol>
                            </MDBRow>
                        )
                    })}
                    <MDBRow>
                        <MDBCol sm='5'>
                            <p>Your Cost:</p>
                        </MDBCol>
                        <MDBCol>
                            <p style={{ margin: 0 }}>IDR. {localStorage.getItem('sumPrice') ? parseInt(localStorage.getItem('sumPrice')).toLocaleString() : 0}</p>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBTooltip>
        );
    }
}
export default connect(mapStatetoProps)(CartNotif);
