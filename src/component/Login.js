import React  from 'react';
import LoginForm from './LoginForm';
import Register from './Register';
import { Redirect } from 'react-router';

class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			
			loggedIn: false,
			loading: false,
			loginReq:false,
			regReq: false
		}
	}

	loginRequest = (e) => {
		e.preventDefault();
		this.setState( {loginReq:true} );
		console.log("Login " +this.state.loginReq);
	};
	registerRequest = (e) => {
		e.preventDefault();
		this.setState( {regReq:true} );
		console.log("Register " +this.state.regReq);
	};

	render() {
			
	const token = localStorage.getItem( 'token' );
	const { loginReq, regReq} =this.state;
	if (loginReq==true) {
		return  <LoginForm />
	  } 
	  if (regReq==true) {
		return  <Register />
	  } 
	if(((token === "") || (!token) ||  (0 === token.length))) {
	return ( <LoginForm />)
	}
	else{return  <Redirect to={'/'} />}
	}
}

export default Login;