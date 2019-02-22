import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

class Logout extends Component{
	constructor(props){
		super(props);
		this.state={
			'auth_token':'None',
			'hasura_id':'None',
			'username':'None',
		}
	}
	
	removeCookies(){
		const cookies = new Cookies();
    	const hasura_id=cookies.get('hasura_id') || 'None';
    	if(hasura_id !== 'None' && hasura_id!=="undefined"){
		cookies.remove('auth_token');
		cookies.remove('hasura_id');
		cookies.remove('username');
				
		alert('Logged Out succesfully')
		this.props.history.push("/")
	}
	else{
		const cookies = new Cookies();
		cookies.remove('auth_token');
		cookies.remove('hasura_id');
		cookies.remove('username');
		this.props.history.push("/")
	}}
	componentWillMount(){
      this.removeCookies();
    }
	render(){
		
		return(

				<div>Logged out successfully </div>
			);
	}
}
export default Logout;