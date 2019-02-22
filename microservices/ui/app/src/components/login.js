import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';




class Login extends Component{
	constructor(){
		super();
		this.state={redirect:false}
	}
	signUp(e){
			e.preventDefault();
			const firstName = this.refs.signupFirstName.value;
			const lastName = this.refs.signuplLastName.value;
			const email = this.refs.signupEmail.value;
			const phoneNumber = this.refs.signupPhoneNumber.value;
			const password = this.refs.signupPassword.value;

			console.log('entered login');
			console.log('email: '+email);
			console.log('password: '+password);
	
			var url = "https://app.banner20.hasura-app.io/signup";
	
			var requestOptions = {
			    "method": "POST",
			    "headers": {
			        "Content-Type": "application/json"
			    }
			};
	
			var body = {
			    "provider": "username",
			    "data": {
			    	"first_name": firstName,
			        "last_name": lastName,
			        "email": email,
			        "phone_number": phoneNumber,
			        "password": password
			    }
			};
	
			requestOptions.body = JSON.stringify(body);
	
			fetch(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				console.log(result);
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
			});
			alert("Account Registered Successfully. Please Login")
		}

	sellerSignup(e){
			e.preventDefault();
			const firstName = this.refs.sellerFirstName.value;
			const lastName = this.refs.sellerLastName.value;
			const email = this.refs.sellerEmail.value;
			const phoneNumber = this.refs.sellerPhoneNumber.value;
			const password = this.refs.sellerPassword.value;

			console.log('entered login');
			console.log('email: '+email);
			console.log('password: '+password);
	
			var url = "https://app.banner20.hasura-app.io/seller_signup";
	
			var requestOptions = {
			    "method": "POST",
			    "headers": {
			        "Content-Type": "application/json"
			    }
			};
	
			var body = {
			    "provider": "username",
			    "data": {
			    	"first_name": firstName,
			        "last_name": lastName,
			        "email": email,
			        "phone_number": phoneNumber,
			        "password": password
			    }
			};
	
			requestOptions.body = JSON.stringify(body);
	
			fetch(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				console.log(result);
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
			});
			alert("Account Registered Successfully. Please Login")
		}

	signIn(e){
			e.preventDefault();
			const email = this.refs.email.value;
			const password = this.refs.password.value;

			console.log('entered login');
			console.log('email: '+email);
			console.log('password: '+password);
	
			var url = "https://app.banner20.hasura-app.io/login";
	
			var requestOptions = {
			    "method": "POST",
			    "headers": {
			        "Content-Type": "application/json"
			    }
			};
	
			var body = {
			    "provider": "username",
			    "data": {
			        "email": email,
			        "password": password
			    }
			};
	
			requestOptions.body = JSON.stringify(body);
	
			
			fetch(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				console.log(result);
				// To save the auth token received to offline storage
				
				const auth_token = result.auth_token
				const hasura_id = result.hasura_id
				const username = result.username
				const cookies = new Cookies();
				// cookies.set('username', 'username', { path: '/' });
				if(auth_token === undefined){
					alert('Invalid Credentials')
					return
				}
				else{
								cookies.set('auth_token', auth_token,{ path: '/' });
								cookies.set('hasura_id', hasura_id,{ path: '/' });
								cookies.set('username', username,{ path: '/' });
								alert("Login Successful")
								
								
								}
			})
			.then((response) => {
     			this.setState({redirect: <Redirect to="/" />});
				
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
				    <ul className="nav nav-pills final-login">
				        <li className="active"><a data-toggle="tab"  href="#signup"><h4 className='page-header'>Sign Up</h4></a></li>
				        <pre>   </pre>
				        <li><a data-toggle="tab" href="#sellerSignup"><h4 className='page-header'>Seller-Signup</h4></a></li>
				        <pre>   </pre>
				        <li><a data-toggle="tab" href="#login"><h4 className='page-header'>Login</h4></a></li>
				    </ul>
					    <div className="tab-content">
					    <form id="signup" className="tab-pane  active" onSubmit={this.signUp.bind(this)}>
		        			<div className="innter-form">
							<div className="sa-innate-form" >
								<div className='form-group'>
									<label htmlFor='firstName'>First Name: </label>
									<input type='text' ref='signupFirstName' required='required'
									 className='form-control' name='firstName' />
								</div>
								<div className='form-group'>
									<label htmlFor='lastName'>Last Name: </label>
									<input type='text' ref='signuplLastName' required='required'
									 className='form-control' name='lastName' />
								</div>
								<div className='form-group'>
									<label htmlFor='email'>Email: </label>
									<input type='email' ref='signupEmail' required='required'
									 className='form-control' name='email' />
								</div>
								<div className='form-group'>
									<label htmlFor='phoneNumber'>Phone Number: </label>
									<input type='text' ref='signupPhoneNumber' required='required'
									 className='form-control' name='phoneNumber' />
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password: </label>
									<input type='password' ref='signupPassword' required='required' minLength="8"
									 className='form-control' name='password' />
								</div>
								<input type="submit" value='Submit' />
							</div>
							</div>
						</form>

						<form id="sellerSignup" className="tab-pane" onSubmit={this.sellerSignup.bind(this)}>
						<h5 className='page-header'>Register as Seller</h5>
		        			<div className="innter-form">
							<div className="sa-innate-form" >
								<div className='form-group'>
									<label htmlFor='firstName'>First Name: </label>
									<input type='text' ref='sellerFirstName' required='required'
									 className='form-control' name='firstName' />
								</div>
								<div className='form-group'>
									<label htmlFor='lastName'>Last Name: </label>
									<input type='text' ref='sellerLastName' required='required'
									 className='form-control' name='lastName' />
								</div>
								<div className='form-group'>
									<label htmlFor='email'>Email: </label>
									<input type='email' ref='sellerEmail' required='required'
									 className='form-control' name='email' />
								</div>
								<div className='form-group'>
									<label htmlFor='phoneNumber'>Phone Number: </label>
									<input type='text' ref='sellerPhoneNumber' required='required'
									 className='form-control' name='phoneNumber' />
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password: </label>
									<input type='password' ref='sellerPassword' required='required' minLength="8"
									 className='form-control' name='password' />
								</div>
								<input type="submit" value='Submit' />
							</div>
							</div>
						</form>


						<form id="login" className="tab-pane fade" onSubmit={this.signIn.bind(this)}>
		        			<div className="innter-form">
							<div className="sa-innate-form"  >
								<div className='form-group'>
									<label htmlFor='email'>Email: </label>
									<input type='email' ref='email' required='required'
									 className='form-control' name='email' />
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password: </label>
									<input type='password' ref='password' required='required'
									 className='form-control' name='password' />
								</div>
								<input type='submit' value='Submit' />
							</div>
							</div>
						</form>
							{this.state.redirect}
						</div>
				</div>
			</div>
			</div>
			</div>
			)
	}
};


export default Login;