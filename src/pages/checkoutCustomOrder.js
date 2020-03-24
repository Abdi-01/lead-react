import React from 'react';
import { Form, FormGroup } from 'reactstrap';
import { MDBRow, MDBCol, MDBCard, MDBContainer } from 'mdbreact';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Axios from 'axios'
import { addTransaction } from '../redux/action'
import { API_URL } from '../support/Backend_URL';
import Swal from 'sweetalert2'

class CheckoutPage extends React.Component {
    state = {
        data: [],
        totalPrice: 0,
        totalWeight: 0,
        listCity: [],
        addCityID: 0,
        cityName: '',
        shippingCost: 0,
        setProvince: ''
    }

    componentDidMount() {
        this.getCity()
        this.getCustomOrder()
    }

    getCity = () => {
        Axios.get(API_URL + '/ongkir/getCity')
            .then((res) => {
                this.setState({ listCity: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getCost = () => {
        console.log(this.state.totalWeight)
        Axios.post(API_URL + '/ongkir/shippingCost', {
            origin: "222",
            destination: `${this.state.addCityID}`,
            weight: this.state.totalWeight,
            courier: "jne"
        })
            .then((res) => {
                console.log('cek', res.data.price)
                this.setState({ shippingCost: res.data.price })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getCustomOrder = () => {
        const token = localStorage.getItem('token')
        Axios.get(API_URL + '/carts/getCustomOrder', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                this.setState({ data: res.data })
                console.log(res.data)
                let count = 0
                res.data.map((val) => count += (val.qty * val.price))
                // console.log('Get Cart Total Cart :', count)
                let weight = 0
                res.data.map((val) => weight += 200 * parseInt(val.qty))
                this.setState({ totalPrice: count, totalWeight: weight })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    addToTransaction = () => {
        if (this.refs.addressOrder.value === '' || this.state.cityName === '' || this.refs.provinceOrder.value === '' || this.refs.zipOrder.value === '') {
            Swal.fire({
                text: 'Fill in on the form !',
                imageUrl: require('../image/ilustration/checklist_.png'),
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Custom image',
                width: 200,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let formTransaction = {
                cartPrice: this.state.totalPrice,
                shippingPrice: this.state.shippingCost,
                payment: this.state.shippingCost + parseInt(this.state.totalPrice),
                address: `${this.refs.addressOrder.value} Phone (${this.refs.phoneOrder.value}), ${this.state.cityName}, ${this.refs.provinceOrder.value}, ${this.refs.zipOrder.value}, ${this.refs.countryOrder.value} `,
                courier: 'JNE REGULAR',
                note: localStorage.getItem('noteOrder') ? localStorage.getItem('noteOrder') : '',
                mva: 3302 + this.props.phone,
                orderType:'Custom'
            }
            this.props.addTransaction(formTransaction)
            this.setState({ shippingCost: 0, cityName: '', addCityID: 0, setProvince: '', redirect: true })
        }

    }

    renderData = () => {
        let { data } = this.state
        return data.map((val, index) => {
            return (
                <MDBCard key={val.id}>
                    <p className="h5" style={{ margin: 0, color: 'orange' }}>Custom Order</p>
                    <MDBRow >
                        <MDBCol md='3'>
                            <div style={{ width: '100%', height: '100%', textAlign: 'center', margin: '3%', verticalAlign: 'middle' }}>
                                <img src={API_URL + val.imagepath} width='100%' alt="product" />
                            </div>
                        </MDBCol>
                        <MDBCol md='6'>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Category </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: {val.category}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Material </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: {val.material}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Detail </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: {val.detail}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Qty </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: {val.qty}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Price </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: IDR. {val.price.toLocaleString()}/pcs</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 90 }}>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>Amount </p>
                                </td>
                                <td>
                                    <p style={{ margin: 0, color: 'dimgrey' }}>: IDR. {(val.price * val.qty).toLocaleString()}</p>
                                </td>
                            </tr>
                        </MDBCol>
                        <span style={{ margin: 0, color: 'gray', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => this.deleteCart(val.id)}>x Delete</span>
                    </MDBRow>
                </MDBCard>
            )
        })
    }

    deleteCart = (id) => {
        console.log(id)
        Axios.delete(API_URL + `/carts/deleteCustomOrder/${id}`)
          .then((res) => {
            console.log(res.data)
            this.getCustomOrder()
          })
          .catch((err) => {
            console.log(err)
          })
      }

    onChangeSelectCity = (e) => {
        this.setState({ addCityID: e.target.value, cityName: e.target[e.target.selectedIndex].text })//ambil text dari select option option
        this.getProvince(e.target.value)
    }

    renderListCity = () => {
        return this.state.listCity.map((val, index) => {
            return (
                <option value={val.city_id}>{val.city_name}</option>
            )
        })
    }

    getProvince = (cityID) => {
        return this.state.listCity.map((val, index) => {
            if (cityID === val.city_id) {
                this.setState({ setProvince: val.province })
                // this.getCost()
            }else{return null}
        })
    }

    checkShippinghandler = (e) => {
        // let qty = document.getElementById(`qty${e.target.value}`).value
        if (e.target.checked) {
            this.getCost()
        }
        if (!e.target.checked) {
            this.setState({ shippingCost: 0 })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'>
            </Redirect>
        }
        return (
            <div style={{ margin: "4%" }}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol >
                            <p className="h4 font-weight-bold" style={{ color: "gray" }} >Shipping Address</p>
                            <Form>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    Name
                                <input type="text" className="form-control form-control-sm" defaultValue={this.props.username} ref='nameOrder' />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    Address
                                <input type="text" className="form-control form-control-sm" placeholder="" ref='addressOrder' />
                                </FormGroup>
                                <MDBRow>
                                    <MDBCol>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            City
                                            <select className="form-control form-control-sm" ref="cityOrder" value={this.state.addMaterialID}
                                                onChange={this.onChangeSelectCity}>
                                                <option value={0}>Choose City</option>
                                                {this.renderListCity()}
                                            </select>
                                        </FormGroup>
                                    </MDBCol>
                                    <MDBCol>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            Province
                                        <input type="text" className="form-control form-control-sm" ref='provinceOrder' value={this.state.setProvince}></input>
                                        </FormGroup>
                                    </MDBCol>
                                    <MDBCol>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            Postal Code
                                        <input type="text" className="form-control form-control-sm" placeholder="" ref='zipOrder' />
                                        </FormGroup>
                                    </MDBCol>
                                </MDBRow>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    Country
                                        <input type="text" className="form-control form-control-sm" placeholder="" defaultValue="Indonesia" ref='countryOrder' />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    Phone
                                    <input type="text" className="form-control form-control-sm" defaultValue={this.props.phone} ref='phoneOrder' />
                                </FormGroup>
                            </Form>
                            <p className="h4 font-weight-bold" style={{ color: "gray", marginTop: 15 }} >Shipping Method</p>
                            <div style={{ width: '100%' }}>
                                <div className="float-right" style={{ marginRight: '1%' }}>
                                    <input type="checkbox" id="yesShipping" onChange={this.checkShippinghandler}></input>
                                </div>
                                <h6 className="font-weight-bold" style={{ color: "orange" }}>JNE REGULAR ( 2 - 3 Days) : IDR. {this.state.shippingCost.toLocaleString()} ({this.state.totalWeight} gram)</h6>
                            </div>

                            <div>
                                <p className="h5" style={{ color: "gray" }}>Cart Price    : IDR. {parseInt(this.state.totalPrice).toLocaleString()}</p>
                                <p className="h5" style={{ color: "gray" }}>Shipping Cost : IDR. {this.state.shippingCost.toLocaleString()}</p>
                            </div>
                        </MDBCol>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    {this.renderData()}
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>

                    <p className="h4 font-weight-bold" style={{ color: "gray", marginTop: 15 }} >Payment Method</p>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol sm='4'>
                                    <img src='https://1.bp.blogspot.com/-epxOcwo446g/Vxw_q2mS5VI/AAAAAAAAXCs/md15WqOgYdMNg5zK0sYoe91Q9EYlSJySQCLcB/s1600/Bank%2BMandiri%2BLogo.png'
                                        width="110px" height="50px" alt="a"
                                    ></img>
                                </MDBCol>
                                <MDBCol>
                                    <h6>Mandiri Virtual Account</h6>
                                    <h3>{3302 + this.props.phone}</h3>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol>
                            <MDBRow>
                                <div style={{ width: '100%' }}>
                                    <div className="float-right" style={{ marginRight: '1%' }}>
                                        <button className="element-AddToCart h2" style={{ height: '100%' }} onClick={this.addToTransaction}><i style={{ verticalAlign: 'middle' }} class="material-icons">payment</i> Payment</button>
                                    </div>
                                    <div style={{ backgroundColor: 'silver', color: 'white', marginLeft: '1%', width: '95%', height: '88%' }}>
                                        <h4 className="font-weight-bold" style={{ padding: '15px 0 15px 2%', color: 'black' }}>IDR. {(this.state.shippingCost + parseInt(this.state.totalPrice)).toLocaleString()}</h4>
                                    </div>
                                </div>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}
const mapStatetoProps = ({ user, cartUsers }) => {
    return {
        username: user.username,
        phone: user.phone
    }
}
export default connect(mapStatetoProps, { addTransaction })(CheckoutPage);