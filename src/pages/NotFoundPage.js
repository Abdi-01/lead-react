import React from 'react'
import '../assets/css/notfound.css'

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div>
        <div id="notfound">
          <div className="notfound">
            <img src={require('../image/ilustration/404_page_not_found_.svg')} alt="NotFound"></img>
            <br />
            <h2>Page not found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NotFoundPage;