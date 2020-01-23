import React from "react";
import { MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";

const JumbotronPage = () => {
    return (
        <div className="text-white jumbotronBG" style={{ width: '100%', height: '450px' }}>
            <Link to='/CustomOrder'>
                <button className="element-BtCustom" style={{ marginTop: '390px', float: 'right', right: '-1px' }}>
                    <MDBIcon icon="edit" className="mr-2"></MDBIcon>
                    Custom Order
            </button>
            </Link>
        </div>
    )
}

export default JumbotronPage;