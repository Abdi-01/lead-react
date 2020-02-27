import React, { Component } from 'react';
import './App.css';
import './index.css';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Keeplogin } from './redux/action'
import Header from './component/header'
import HeaderAdmin from './component/headerAdmin'
import HomePage from './pages/home'
import HowToOrder from './pages/info/howtoOrder'
import Collection from './pages/collection'
import AboutPage from './pages/info/aboutCompany'
import LeadSquad from './pages/info/leadsquad'
import ProductDetail from './pages/productDetail'
import CartPage from './pages/userCart'
import TrackingPage from './pages/trackingPage'
import HistoryPage from './pages/historyPage'
import CheckoutPage from './pages/checkoutPage'
import CustomOrder from './pages/customOrder'
import SizeCart from './pages/info/sizeCart'
import PrivacyFaq from './pages/info/privacyFAQ'
import ResultPage from './pages/resultPage'
import ProfilePage from './pages/ProfilePage';//adminpage
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import VerificationPage from './pages/verificationPage'
import Footer from './component/footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.Keeplogin()
  }

  render() {
    return (
      <div>
        {this.props.role === "admin"
          ?
          <HeaderAdmin></HeaderAdmin>
          :
          <Header></Header>
        }
        <Switch>
          <Route path='/' component={HomePage} exact></Route>
          <Route path='/HowToOrder' component={HowToOrder}></Route>
          <Route path='/Collection' component={Collection}></Route>
          <Route path='/AboutPage' component={AboutPage}></Route>
          <Route path='/CustomOrder' component={CustomOrder}></Route>
          <Route path='/LeadSquad' component={LeadSquad}></Route>
          <Route path='/SizeCart' component={SizeCart}></Route>
          <Route path='/PrivacyFAQ' component={PrivacyFaq}></Route>
          <Route path='/ProductDetail' component={ProductDetail}></Route>
          <Route path='/ProfilePage' component={ProfilePage} />
          <Route path='/ResultPage' component={ResultPage} />
          <Route path='/CheckoutPage' component={CheckoutPage} />
          {this.props.role === "admin"
            ?
            <Route path='/ProductPage' component={ProductPage} />
            :
            <div>
              <Route path='/CartPage' component={CartPage} />
              <Route path='/TrackingPage' component={TrackingPage} />
              <Route path='/HistoryPage' component={HistoryPage} />
            </div>
          }
          {/* <Route path='/maps' component={MapsPage} /> */}
          <Route path='/verification' component={VerificationPage} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

const makeStatetoProps = (state) => {
  return {
    id: state.user.id,
    role: state.user.role
  }
}

export default connect(makeStatetoProps, { Keeplogin })(App)
