import React from 'react';
import { MDBCard, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux'
import { getSalesAmount, getUserAmount, getPendingOrderAmount, getSuccessOrderAmount } from '../../redux/action'

class AdminCardSection1 extends React.Component {

  componentDidMount = () => {
    this.props.getSalesAmount()
    this.props.getUserAmount()
    this.props.getPendingOrderAmount()
    this.props.getSuccessOrderAmount()
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
                <strong>IDR. {this.props.salesAmount.toLocaleString()}</strong>
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
                <strong>{this.props.userAmount.toLocaleString()} Person</strong>
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
                <strong>{this.props.pendingAmount}</strong>
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
                <strong>{this.props.successAmount}</strong>
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

const mapToProps = ({ resultsData }) => {
  return { ...resultsData }
}

export default connect(mapToProps, {getSalesAmount,getUserAmount,getPendingOrderAmount,getSuccessOrderAmount})(AdminCardSection1);