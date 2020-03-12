import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";

const HowToOrderPage = () => {
    return (
        <div>
            <h3 className="text-center" style={{ fontWeight: 'bolder' }}>How To Order In LEAD Project</h3>
            <MDBContainer>
                <MDBCarousel
                    activeItem={1}
                    length={9}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1"
                >
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId="1">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t1.png')}
                                    alt="First slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="2">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t2.png')}
                                    alt="Second slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="3">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t3.png')}
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="4">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t4.png')}
                                    alt="First slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="5">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t5.png')}
                                    alt="Second slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="6">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t6.png')}
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="7">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t7.png')}
                                    alt="Second slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="8">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t8.png')}
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId="9">
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src={require('../../image/howtoorder/t9.png')}
                                    alt="Third slide"
                                />
                            </MDBView>
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            </MDBContainer>
        </div>
    );
}

export default HowToOrderPage;