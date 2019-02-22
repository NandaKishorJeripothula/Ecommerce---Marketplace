import React, {Component} from 'react';

const signIn = (props) =>{
			
	console.log('entered login')

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
	        "email": props.email,
	        "password": props.password
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
		// var authToken = result.auth_token
		// AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
	})
	.catch(function(error) {
		console.log('Request Failed:' + error);
	});
	}
export {signIn} ;					