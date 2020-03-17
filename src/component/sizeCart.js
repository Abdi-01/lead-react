import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

class SizeCart extends React.Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        return (
            <div>
                <a style={{ cursor: 'pointer', marginLeft:10, color:'gray',fontWeight:'bold',textDecoration:'underline' }} onClick={this.toggle}>Size Cart ?</a>
                <Modal centered isOpen={this.state.modal} toggle={() => this.toggle()}>
                    <ModalBody>
                        <img src={require('../image/Size_Cart.png')} alt="sizecart" width='100%'></img>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default SizeCart;