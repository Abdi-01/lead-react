import React, { Component } from 'react';
import ProductCard from '../component/productCard'

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container" style={{marginTop:"2%"}}>
                <ProductCard></ProductCard>
            </div>
         );
    }
}
 
export default Collection;
