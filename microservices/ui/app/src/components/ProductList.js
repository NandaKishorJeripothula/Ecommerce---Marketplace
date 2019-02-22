import React, {Component} from 'react';
import './productList.css'
class ProductList extends Component{
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
			<div className='container-fluid'>
			<div className="card-group" style={style4} >
			{this.props.products.map(product => (
			
          <a className='productCardLink' href={'/product/'+product.id} style={style1} >      
      		<div className='productCard' key={product.id} style={style} >
          		
            		<img className="card-img-top zoom" src={product.first_image_url} alt={product.name} style={style2} />
            		<div className="card-body">
              			<span className="card-title" style={style3}><b>{product.name.slice(0,20)}..</b></span>
              			<p className="card-text">  &#8377;{product.price}</p>
            		</div>
          		
      		</div>
          </a>
      		))}
    		</div>
    		</div>
			
			);
	}
}

export default ProductList;