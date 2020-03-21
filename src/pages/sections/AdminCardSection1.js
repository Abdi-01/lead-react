import React from 'react';
import { MDBCard, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import Axios from 'axios'
import { API_URL } from '../../support/Backend_URL';

class AdminCardSection1 extends React.Component {
  state = {
    salesAmount: 0,
    userAmount: 0
  }

  componentDidMount = () => {
    this.getSalesAmount()
    this.getUserAmount()
  }

  getSalesAmount = () => {
    Axios.get(API_URL + '/results/getSaleAmount')
      .then((res) => {
        this.setState({ salesAmount: res.data[0].salesAmount })
        console.log(this.state.salesAmount)
      })
      .catch((err) => {
        this.setState({ salesAmount: 0 })
        console.log(err)
      })
  }

  getUserAmount = () => {
    Axios.get(API_URL + '/results/getUserAmount')
      .then((res) => {
        this.setState({ userAmount: res.data[0].userAmount })
        console.log(this.state.userAmount)
      })
      .catch((err) => {
        this.setState({ userAmount: 0 })
        console.log(err)
      })
  }

  render() {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color" />
              <div className="data">
                <h4 style={{ fontWeight: 'bold', color: '#999999' }}>SALES</h4>
              </div>
              <h3 style={{ textAlign: 'right', marginTop: 20 }}>
                <strong>IDR. {this.state.salesAmount.toLocaleString()}</strong>
              </h3>
            </div>
            {/* <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Better than last week (25%)</MDBCardText>
            </MDBCardBody> */}
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="user" className="warning-color" />
              <div className="data">
                <h4 style={{ fontWeight: 'bold', color: '#999999' }}>USER</h4>
              </div>
              <h3 style={{ textAlign: 'right', marginTop: 20 }}>
                <strong>{this.state.userAmount.toLocaleString()} Person</strong>
              </h3>
            </div>
            {/* <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Worse than last week (25%)</MDBCardText>
            </MDBCardBody> */}
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="business-time" className="light-blue lighten-1" />
              <div className="data" >
                <h5 style={{ fontWeight: 'bold', color: '#999999' }}>PENDING</h5>
                <h5 style={{ fontWeight: 'bold', color: '#999999' }}>ORDER</h5>
              </div>
              <h3 style={{ textAlign: 'right', marginTop: 20 }}>
                <strong>20000</strong>
              </h3>
            </div>
            {/* <MDBCardBody>
              <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar grey darken-2" role="progressbar"
              style={{ width: '75%' }}></div>
              </div>
              <MDBCardText>Worse than last week (75%)</MDBCardText>
            </MDBCardBody> */}
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-bar" className="red accent-2" />
              <div className="data">
                <h5 style={{ fontWeight: 'bold', color: '#999999' }}>SUCCESS</h5>
                <h5 style={{ fontWeight: 'bold', color: '#999999' }}>ORDER</h5>
              </div>
              <h3 style={{ textAlign: 'right', marginTop: 20 }}>
                <strong>2000</strong>
              </h3>
            </div>
            {/* <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Better than last week (25%)</MDBCardText>
            </MDBCardBody> */}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }
}

export default AdminCardSection1;