import React, { Component } from 'react';
import ProductCard from '../component/productCard'
import { MDBDropdown, MDBDropdownToggle, MDBBtn, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class Collection extends Component {
    state = {
        proCategory: 'All'
    }

    render() {
        console.log('ProCat',this.state.proCategory)
        return (
            <div className="container" style={{ marginTop: "2%" }}>
                <MDBBtnGroup>
                    <MDBBtn color="grey" onClick={() => this.setState({ proCategory: 'All' })}>
                        All Products
                    </MDBBtn>
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="grey" />
                        <MDBDropdownMenu color="grey">
                            <MDBDropdownItem header>Global Product</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Shirt' })}>Shirt</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'T-Shirt' })}>T-Shirt</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Hoodie' })}>Hoodie</MDBDropdownItem>
                            <MDBDropdownItem header>Sport Apparel</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Jersey' })}>Jersey</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBBtnGroup>
                <ProductCard>{this.state.proCategory}</ProductCard>
            </div>
        );
    }
}

export default Collection;
