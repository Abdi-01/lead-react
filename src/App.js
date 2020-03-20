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
import OrderProgressPage from './pages/orderProgress'
import HistoryPage from './pages/historyPage'
import CheckoutPage from './pages/checkoutPage'
import CheckoutCustomPage from './pages/checkoutCustomOrder'
import CustomOrder from './pages/customOrder'
import CustomDesign from './pages/customDesign'
import SizeCart from './pages/info/sizeCart'
import PrivacyFaq from './pages/info/privacyFAQ'
import ResultPage from './pages/resultPage'
import ProfilePage from './pages/ProfilePage';//adminpage
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import VerificationPage from './pages/verificationPage'
import Footer from './component/footer'
import ChatRoom from './component/chatComponent'

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
          <Route path='/CustomDesign' component={CustomDesign}></Route>
          <Route path='/LeadSquad' component={LeadSquad}></Route>
          <Route path='/SizeCart' component={SizeCart}></Route>
          <Route path='/PrivacyFAQ' component={PrivacyFaq}></Route>
          <Route path='/ProductDetail' component={ProductDetail}></Route>
          <Route path='/verification' component={VerificationPage} />
          {this.props.id ?
            <>
              <Route path='/ProfilePage' component={ProfilePage} />
              <Route path='/CheckoutPage' component={CheckoutPage} />
              <Route path='/CheckoutCustomPage' component={CheckoutCustomPage} />
              <Route path='/OrderProgressPage' component={OrderProgressPage} />
              <Route path='/HistoryPage' component={HistoryPage} />
              {this.props.role === "admin"
                ? <div>
                  <Route path='/ProductPage' component={ProductPage} />
                  <Route path='/ResultPage' component={ResultPage} />
                </div>
                :
                <div>
                  <Route path='/CartPage' component={CartPage} />
                </div>
              }
            </>
            :
            <Route path='*' component={NotFoundPage} />
          }
          {/* <Route path='/maps' component={MapsPage} /> */}
          <Route path='*' component={NotFoundPage} />
        </Switch>
        <Footer></Footer>
        <ChatRoom></ChatRoom>
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
