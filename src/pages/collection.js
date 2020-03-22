import React, { Component } from 'react';
import ProductCard from '../component/productCard'
import { MDBDropdown, MDBDropdownToggle, MDBBtn, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class Collection extends Component {
    state = {
        proCategory: 'All',
        sort:'none'
    }

    render() {
        console.log('ProCat',this.state.proCategory)
        return (
            <div className="container" style={{ marginTop: "2%" }}>
                <MDBBtnGroup>
                    <MDBBtn color="grey" onClick={() => this.setState({ proCategory: 'All',sort:'none' })}>
                        All Products
                    </MDBBtn>
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="grey" />
                        <MDBDropdownMenu color="grey">
                            <MDBDropdownItem header>Global Product</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Shirt',sort:'none' })}>Shirt</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'T-Shirt',sort:'none' })}>T-Shirt</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Hoodie',sort:'none' })}>Hoodie</MDBDropdownItem>
                            <MDBDropdownItem header>Sport Apparel</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => this.setState({ proCategory: 'Jersey',sort:'none' })}>Jersey</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBBtn outline color="grey" onClick={() => this.setState({ sort: 'hight' })}>
                        Highest Price
                    </MDBBtn>
                    <MDBBtn outline color="grey" onClick={() => this.setState({ sort: 'low' })}>
                        Lowest Price
                    </MDBBtn>
                </MDBBtnGroup>

                <ProductCard sort={this.state.sort}>{this.state.proCategory}</ProductCard>
            </div>
        );
    }
}

export default Collection;
