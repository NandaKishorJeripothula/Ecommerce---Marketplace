import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

class Cart extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      product: [],
      redirect:false,
     
    }
  }
    
    loadCartItems() {

        var url = "https://data.banner20.hasura-app.io/v1/query";
        const cookies = new Cookies();
        const hasura_id=cookies.get('hasura_id') || 'None';
        const auth_token=cookies.get('auth_token') || 'None';
        if(hasura_id !== 'None' && hasura_id!=="undefined"){
              var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "auth_token":auth_token
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "cart",
        "columns": [
            "product_id"
        ],
        "where": {
            "customer_id": {
                "$eq": hasura_id
            }
        }
    }
    
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(response => response.json())
      .then(json => {
        this.setState({
          product: json,
        });
        this.state.product.map((p, i)=>this.setState({product_id:p.product_id, 
                                                      productImage1:p.product_image_1,
                                                      productImage2:p.product_image_2,
                                                      productImage3:p.product_image_3,
                                                      category_name:p.category_name,
                                                      productName:p.product_name,
                                                      sub_category_name:p.sub_category_name,
                                                      price:p.price,
                                                      product_description:p.product_description,
                                                      seller_name:p.seller_name,

                                                    }));
      });
  }
  else{
    alert('Please Login to view cart')
    this.setState({redirect: <Redirect to="/login" />});
  }
}

  
  componentDidMount() {
    this.loadCartItems();
    console.log(this.state.product)

  }
    render(){
        return(
            <div>
            <h6>Please wait while cart items are loading</h6>
            {
          this.state.product.map((p, i) =>
            <div>
            <ProductsInCart product_id={p.product_id} />
            </div>
            )}
            {this.state.redirect}
            </div>
            );
    }
}

class ProductsInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage1:'',
      product: [],
     
    }
  }

  loadData() {
    fetch('https://app.banner20.hasura-app.io/product?product_id=' + this.props.product_id)
      .then(response => response.json())
      .then(json => {
        this.setState({
          product: json,
        });
        this.state.product.map((p, i)=>this.setState({productVariableImage:p.product_image, 
                                                     
                                                      productName:p.product_name,
                                                     
                                                      price:p.price,
                                                     
                                                    }));
      });
  }
  componentDidMount() {
    this.loadData();
  }
  render(){
        return(
        <div className="container">
        <div className="card-group">
        {
          this.state.product.map((p, i) =>
            

          <ImageCard image1={this.state.productVariableImage} productName={p.product_name} product_id={p.product_id}
            price={p.price}
            />)}
         </div>
        </div>);
  }
}
class ImageCard extends Component{
    render(){
        const style={
            marginRight: '5px',
            marginLeftt: '0px',
            textAlign: 'center'
            }
        const style1 ={
            textDecoration: 'none',
            color: 'black'
        }
        const style2={
            textDecoration: 'none',
            color: 'black',
            width:'200px',
            height:'200px'
        }
        const style3={
            fontSize: '14px'
        }
        const style4={marginTop: '50px'}
        return(
            
            <div >
          <a className='productCardLink' href={'/product/'+this.props.product_id} style={style1} >      
            <div className='card productCard' key={this.props.product_id} style={style} >
                
                    <img className="card-img-top zoom" src={this.props.image1} alt={this.props.name} style={style2} />
                    <div className="card-body">
                        <span className="card-title" style={style3}><b>{this.props.productName.slice(0,20)}..</b></span>
                        <p className="card-text">  &#8377;{this.props.price}</p>
                    </div>
                
            </div>
          </a>
            </div>
            
            );
    }
}


export default Cart;