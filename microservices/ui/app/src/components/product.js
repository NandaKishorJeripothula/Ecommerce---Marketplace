import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage1:'',
      productImage2:'',
      productImage3:'',
      productVariableImage:'',
      product: [],
     
    }
  }
  handleImage1 = (e) => {
    this.setState({productVariableImage:this.state.productImage1});
  }
  
  handleImage2 = (e) => {
    this.setState({productVariableImage:this.state.productImage2});
  }
  handleImage3 = (e) => {
    this.setState({productVariableImage:this.state.productImage3});
    }


  loadData() {
    fetch('https://app.banner20.hasura-app.io/product?product_id=' + this.props.match.params.productId)
      .then(response => response.json())
      .then(json => {
        this.setState({
          product: json,
        });
        this.state.product.map((p, i)=>this.setState({productVariableImage:p.product_image, 
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
  componentDidMount() {
    this.loadData();
  }
  render(){
        return(
        <div className="container-fluid">
        {
          this.state.product.map((p, i) =>
            

          <ImageCar image1={this.state.productVariableImage} image2={this.state.productImage1} 
            image3={this.state.productImage2} productName={p.product_name} product_id={p.product_id}
            price={p.price}
            description={p.product_description} category_name={p.category_name} seller_name={p.seller_name}
            sub_category_name={p.sub_category_name}

            />)}
        </div>);
  }
}

class ImageCar extends Component{
  handleCartSubmit(e){
    e.preventDefault();
    var url = "https://app.banner20.hasura-app.io/add_to_cart";
    const cookies = new Cookies();
    const hasura_id=cookies.get('hasura_id') || 'None';
    const auth_token=cookies.get('auth_token') || 'None';
    if(hasura_id !== 'None' && hasura_id!=="undefined"){
          var requestOptions = {
              "method": "POST",
              "headers": {
                  "Content-Type": "application/json"
              }
          };
      
          var body = {
              "provider": "username",
              "data": {
                "hasura_id": hasura_id,
                "auth_token":auth_token,
                "product_id": this.props.product_id
              }
          };
      
          requestOptions.body = JSON.stringify(body);
      
          fetch(url, requestOptions)
          .then(function(response) {
            console.log(response.json());
          })
          .then(function(result) {
            console.log(result);
          })
          .catch(function(error) {
            console.log('Request Failed:' + error);
          });

       alert('Added to Cart Successfully')
      }
      else{
        alert('Please Login to add to cart')
      }
  }
  render(){
    return(
      <div>
      
      <div className='row' style={{'marginTop':'30px'}}>
      <div className='col-md-4 card' style={{'marginTop':'30px'}}>
        <div id="demo" className="carousel slide" data-ride="carousel">
          


        <div className="carousel-inner">
          <div className="carousel-item  active">
            <img src={this.props.image1} alt={this.props.productName}  height="288px"/>
          </div>
          <div className="carousel-item" >
            <img src={this.props.image2} alt={this.props.productName} height="288px"/>
          </div>
          <div className="carousel-item">
            <img src={this.props.image3} alt={this.props.productName}  height="288px"/>
          </div>
        </div>


          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>

        <div className='row'>
            
              <div className='col-md-4 card' data-target="#demo" data-slide-to="0" >
                <img src={this.props.image1} alt={this.props.productName}  style={{"maxHeight":"150px",'height':"inherit"}}/>
              </div>
              <div className='col-md-4 card'data-target="#demo" data-slide-to="1">
                <img src={this.props.image2} alt={this.props.productName}  style={{"maxHeight":"150px",'height':"inherit"}}/>
              </div>
              <div className='col-md-4 card' data-target="#demo" data-slide-to="2">
                <img src={this.props.image3} alt={this.props.productName}  style={{"maxHeight":"150px",'height':"inherit"}}/>
              </div>

        </div>


        </div>

        <div className='col' style={{'marginTop':'30px'}}>
          <div className="card">
            <div className="card-body">
            <div style={{'color':'grey'}}>{this.props.category_name[0].toUpperCase() + this.props.category_name.substr(1)} &gt; 
            {this.props.sub_category_name[0].toUpperCase() + this.props.sub_category_name.substr(1)} </div>
            <div style={{'color':'grey'}}>Seller: {this.props.seller_name[0].toUpperCase() + this.props.seller_name.substr(1)}
            </div>
              <h4 className="card-title">{this.props.productName}</h4>
              <p className="card-text"style={{'fontSize':'20px'}}>Price: &#8377;{this.props.price}</p>
              <button type="button" className="btn" onClick={this.handleCartSubmit.bind(this)}>Add to Cart</button>
              <div style={{'marginTop':'20px'}}>
              <button type="button" className="btn btn-primary">Buy Now</button>
              </div>
              <p className="card-text" style={{'color':'black',textAlign:'left','marginTop':'20px'}}>{this.props.description}</p>
              
            </div>
          </div>
        </div>  
      </div>

      
    </div>
      );

  }
}

export default Product;