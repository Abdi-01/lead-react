import React from 'react'
import '../assets/css/notfound.css'
// import { MDBCol, MDBRow } from 'mdbreact';
// import logo from "../image/logowhite.png";


const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div>
        <div id="notfound">
          <div className="notfound">
            {/* <div className="notfound-404">
              <div></div>
              <h1>404</h1>
            </div> */}
            <img src={require('../image/ilustration/404_page_not_found_.svg')} alt="NotFound"></img>
            <br/>
            <h2>Page not found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            {/* <a href="#">home page</a> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NotFoundPage;