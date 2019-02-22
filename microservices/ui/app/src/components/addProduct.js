import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

class AddProduct extends Component{

	addProduct(e){
		e.preventDefault();
		const cookies = new Cookies();
		const hasura_id=cookies.get('hasura_id') || 'None';
		const auth_token=cookies.get('auth_token') || 'None';
		const productName = this.refs.productName.value;
		const price = this.refs.price.value;
		const description = this.refs.description.value;
		const file = this.refs.file.value;
		const category = this.refs.category.value;
		var url = "https://app.banner20.hasura-app.io/add_product";
	
			var requestOptions = {
			    "method": "POST",
			    "headers": {
			        "Content-Type": "multipart/form-data"
			    }
			};
	
			var body = {
			    "provider": "username",
			    "data": {
			    	"auth_token": auth_token,
			    	"hasura_id": hasura_id,
			    	"productName": productName,
			        "price": price,
			        "description": description,
			        "filename": file,
			        "category": category
			    }
			};
	
			
			requestOptions.body = JSON.stringify(body);

			fetch(url,requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				console.log(result);
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
			});
	}

	render(){
		const style={
			margin :'20px',
			padding : '20px',
			border : '1px solid steelBlue',
			boxShadow: '5px 5px 8px 5px #888888',
			textAlign: 'left'
		}
		return(
			<div className='container'>
			<div className='row'>
				<div className='col-md-5 col-md-offset-5'>
				<div style={style} className="form-body">
				<form action="/add_product" onSubmit={this.addProduct.bind(this)} encType='multipart/form-data'>
					<div className="innter-form">
					<div className="sa-innate-form" >
						<div className='form-group'>
							<label htmlFor='product_name'>Product Name: </label>
							<input type='text' ref='productName' required='required'
							className='form-control' name='productName' />
						</div>
					<div className='form-group'>
					<label htmlFor='price'>Price: </label>
					<input type='text' ref='price' required='required'
					className='form-control' name='price' />
					</div>
					
					<div className='form-group'>
					<label htmlFor='product_name'>Description: </label>
					<textarea ref='description' required='required'
					className='form-control' name='description' />
					</div>
					
					<div className='form-group'>
					<label htmlFor='product_name'>Upload Image: </label>
					<input type='file' ref='file' required='required'
					className='form-control' name='file' />
					</div>

					<div className='form-group'>
					<label htmlFor='product_name'>Category: </label>
					<select className='form-control' name="category" ref='category'>
						<option value="1">mobiles</option>
						<option value="2">laptops</option>
						<option value="3">televisions</option>
						<option value="4">children</option>
						<option value="5">literature</option>
					</select>
					</div>

					<div className='form-group'>
					<input type="submit" value='Submit' />
					</div>
					</div>
					</div>
					</form>
			</div>
			</div>
			</div>
			</div>
			);
	}
}

export default AddProduct;

