import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView} from
"mdbreact";

const CarouselPage = () => {
  return (
    <div style={{marginRight:"1%"}}>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={false}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100 objectFit"objectFit
              src="http://www.photographicassignments.co.uk/wp-content/uploads/2017/06/Reefer-1-1024x576.jpg"
              alt="First slide"
              style = {{width: '100%', height:'450px'}}
            />
          {/* <MDBMask overlay="black-light" /> */}
          </MDBView>
          {/* <MDBCarouselCaption>
            <h3 className="h3-responsive">Light mask</h3>
            <p>First text</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100 objectFit"
              src="https://www.rachaelrayshow.com/sites/default/files/styles/video_1920x1080/public/images/2019-01/stock_closet_1920.jpg"
              alt="Second slide"
              style = {{width: '100%', height:'450px'}}
            />
          {/* <MDBMask overlay="black-strong" /> */}
          </MDBView>
          <MDBCarouselCaption>
            {/* <h3 className="h3-responsive">Strong mask</h3>
            <p>Second text</p> */}
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100 objectFit"
              src="https://www.welltodoglobal.com/wp-content/uploads/2017/10/Welltodo-Today-2-1.png"
              alt="Third slide"
              style = {{width: '100%', height:'450px'}}
            />
          {/* <MDBMask overlay="black-slight" /> */}
          </MDBView>
          {/* <MDBCarouselCaption>
            <h3 className="h3-responsive">Slight Mast</h3>
            <p>Third text</p>
          </MDBCarouselCaption> */}
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
  );
}

export default CarouselPage;