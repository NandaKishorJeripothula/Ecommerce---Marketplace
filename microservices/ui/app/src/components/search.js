import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

class Search extends Component{

	render(){
		const style={
			width:'200px',
			height:'200px',
			borderRight: '1px thin black'
    	}
    	const style1 ={
    		textDecoration: 'none',
			color: 'black'
    	}
		return(
			<div className='container'>
			
				<h5>Showing {this.props.products.length} results for <b>'{this.props.searchTerm}'</b></h5>
				{this.props.products.map(product => (
				<div style={{marginTop:'30px'}}>
				<a className='productCardLink' href={'/product/'+product.id} style={style1} >      
				<div className='row' key={product.id}>
					<div className='col-md-3' style={{borderRight:'2px solid black'}}>
						<img src={product.first_image_url} alt="" style={style} />
					</div>

					<div className='col-md-1'></div>

					<div className='col'>
						<h6><b>{product.name}</b></h6>
						<p style={{color:'#388e3c'}}>&#8377;{product.price}</p>
						<p>{product.description}</p>
					</div>

				</div>
				</a>
				</div>
				))}
			</div>
			
			);
	}
}


export default Search;