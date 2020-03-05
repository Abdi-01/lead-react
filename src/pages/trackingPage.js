import React, { Component } from 'react'
import { MDBCard, MDBView, MDBCardBody, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBFormInline, MDBBadge, MDBBtn, MDBIcon } from 'mdbreact'
import SideNavigation from '../component/sideNavigation'
import '../assets/css/trackingOrder.css'
import Axios from 'axios'
import { getUserTransaction } from '../redux/action'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';

class TrackingPage extends Component {
    // state = {
    //     userTransaction: []
    // }

    componentDidUpdate() {
        if (this.props.transaction) {
            console.log(this.props.transaction)
        }
        // this.setState({ userTransaction: this.props.transaction })
        // console.log(this.state.userTransaction)
    }

    componentDidMount() {
        this.props.getUserTransaction()
    }

    renderTrackOrder = () => {
        return this.props.transaction.map((item, index) => {
            return (
                <MDBCard key={item.id} style={{ marginTop: 5 }}>
                    <MDBRow>
                        <MDBCol md='3'>
                            <div className="invoiceTag">
                                <strong><h4 style={{ margin: 0, paddingLeft: 10, paddingRight: 5 }}>{item.invoice}</h4></strong>
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <p style={{ margin: 2,marginTop:10, padding:0, color: 'gray' }}>02 Februari 2020</p>
                        </MDBCol>
                        <MDBCol sm='3'>
                            <p style={{ margin: 2, marginTop:10,padding:0, color: 'gray' }}>Payment : IDR. {item.payment.toLocaleString()}</p>
                        </MDBCol>
                        <MDBCol >
                            <MDBBtn outline color="warning" size="sm" style={{padding:2,margin:10}}>
                                Upload Payment
                            </MDBBtn>
                        </MDBCol>
                        <MDBCol >
                            <p style={{ margin: 10, color: 'gray' }}>{item.status}</p>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            )
        })
    }

    render() {
        return (
            <div style={{}}>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5">
                        <MDBTable>
                            {/* <MDBTableBody> */}
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard>
                                        <MDBView className="gradient-card-header text-center orange" rounded >
                                            <h4 className="h4-responsive text-white" style={{ margin: 0 }}>Order Progress</h4>
                                        </MDBView>
                                    </MDBCard>
                                    {this.renderTrackOrder()}
                                </MDBCol>
                            </MDBRow>
                        </MDBTable>
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ transaction, user }) => {
    return {
        user,
        transaction
    }
}

export default connect(mapStateToProps, { getUserTransaction })(TrackingPage);