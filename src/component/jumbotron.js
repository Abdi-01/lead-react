import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";

const JumbotronPage = () => {
    return (
        <div className="text-white jumbotronBG" style={{ width: '800px', height: '450px' }}>
            <Link to='/CustomOrder'>
                <MDBBtn className="element-BtCustom" color="white" style={{ marginTop: '390px', float: 'right', right: '0px' }}>
                    <MDBIcon icon="edit" className="mr-2"></MDBIcon>
                    Order Custom
                </MDBBtn>
            </Link>
        </div>
    )
}

export default JumbotronPage;