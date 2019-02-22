import React, {Component} from 'react';
import Cart from './cart.js';
import Cookies from 'universal-cookie';

class User extends React.Component {
	render(){
		const cookies = new Cookies();
        const hasura_name=cookies.get('username') || 'None';
        const auth_token=cookies.get('auth_token') || 'None';
        
		return(
			<div>
				<h3>Hi {hasura_name}</h3>
				<h4>Your cart items are:</h4>
				<Cart />
			</div>
			);
	}}

export default User;