import React, { Fragment } from 'react';
import { Nav, NavDropdown } from "react-bootstrap";
import Login from "./Login"
import { Redirect } from 'react-router';
import Loader from "../loader.gif";
import axios from 'axios';
import clientConfig from '../client-config';
class UserLogBtn extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			isLoggedOut: false,
			isLoggedIn: false,
			chooseToLogOut: false,			
			chooseToLogIn: false,
			redirect: false,
						
		}
		
	}
	
	componentDidMount() {
		if(localStorage.getItem('token')){ this.setState( { isLoggedIn: true, isLoggedOut: false,  
				chooseToLogIn: false,chooseToLogOut: false, redirect: false })}
		if(!localStorage.getItem('token')){ this.setState( { isLoggedIn: false, isLoggedOut: true,  
			chooseToLogIn: false,chooseToLogOut: false,redirect: false })} 
}

	onLogOut = ( event ) => {
		
		localStorage.removeItem('token');
		 this.setState( { isLoggedIn: false, isLoggedOut: false,  
			chooseToLogIn: false,chooseToLogOut: true, redirect: true }) 
			
			
	}
	onLogIn = ( event ) => {
	
		this.setState( { isLoggedIn: false, isLoggedOut: false,  
			chooseToLogIn: true,chooseToLogOut: false, redirect: true })
			
			
	}
	


	render() {
	
	 const { isLoggedIn, isLoggedOut,chooseToLogIn,chooseToLogOut, redirect}  = this.state;
	 if(chooseToLogIn && redirect ){return(<Redirect to={`/login`} noThrow />)}
	 if(chooseToLogOut && redirect ){return(<Redirect to={`/`} noThrow />)}
	 if(isLoggedIn){return(<Nav.Link href="/" id="logOutBtn" title="Se déconnecté"  onClick={this.onLogOut }  ><i className="fas fa-sign-out-alt"></i></Nav.Link>)}
	 if(chooseToLogIn ){
		return(<Nav.Link href="/" id="logOutBtn" title="Se déconnecté"  onClick={ this.onLogOut }  ><i className="fas fa-sign-out-alt"></i></Nav.Link>)
	 }
	 if(isLoggedOut ){return(<Nav.Link href="/login" id="logOutBtn" title="Se connecté"  onClick={ this.onLogIn }  ><i className="fas fa-sign-in-alt"></i></Nav.Link>)}
	 if(chooseToLogOut ){return(<Nav.Link href="/login" id="logOutBtn" title="Se connecté"  onClick={  this.onLogIn }  ><i className="fas fa-sign-in-alt"></i></Nav.Link>)}
	return(<Nav.Link href="/login" id="logOutBtn" title="Se connecté"  onClick={ this.onLogIn }  ><i className="fas fa-sign-in-alt"></i></Nav.Link>)
	}
	

}

export default UserLogBtn;