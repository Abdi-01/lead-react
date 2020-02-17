import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';
import Axios from 'axios'

class ProductDetail extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        console.log(this.props)
        var id = this.props.location.search.split('=')[1];
        Axios.get(API_URL + `/products/getProductById/${id}`)
            .then((res) => {
                this.setState({ data: res.data[0] })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    render = () => {
        let { data } = this.state;
        return (
            <div className="container" style={{ margin:0 }}>
                <div className="jumbotron center" style={{ width: '75%' }}>
                    <div className="row">
                        <div className="col-3" style={{ textAlign: 'center' }}>
                            {/* {console.log(data.name)} */}
                            <img src={API_URL + data.imagepath} className="card-img" alt="..." />
                        </div>
                        <div className="col">
                            <h1>{data.name}</h1>
                            <div>
                                <p className="h4">Category : {data.category}</p>
                                <p className="h5" style={{ textAlign: 'justify' }}>Description : {data.description}</p>
                            </div>
                        </div>
                        {/* {this.props.username && this.props.role === 'user'
                            ?
                            <Button className="float-right" size="lg" onClick={this.toggle} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Buy Ticket</Button>
                            :
                            <div>
                                {this.props.role === 'admin'
                                    ?
                                    <Button className="float-right" size="lg" style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Get Your Ticket</Button>
                                    :
                                    <Button className="float-right" size="lg" onClick={this.toggleAlert} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Get Your Ticket</Button>
                                }
                            </div>
                        } */}
                    </div>
                </div>
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