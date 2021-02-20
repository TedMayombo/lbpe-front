import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loader from "../loader.gif";
import axios from 'axios';
import clientConfig from '../client-config';
import {handleValidation} from './helper.js';
import addNotification from 'react-push-notification';
export class LoginForm extends Component {

	constructor( props ) { super( props );
		this._isMounted = false;
		this.state = { username: '', password: '', userNiceName: '', userDispalyName:"", userEmail: '',	loggedIn: false,
			loading: false, error: '', redirect:'/', loginReq:false, regReq: false, inputValueCheck:false }}
			buttonClick = (e) => {
				
				e.preventDefault();
				addNotification({
					title: 'title',
					subtitle: 'subtitle', //optional
					message: 'message', //optional
					
					theme: 'red', //optional, default: undefined
					duration: 10000, //optional, default: 5000,
					
					colorTop: 'white', //optional, font color of top container.
					colorBottom: 'white', //optional, font color of bottom container.
					closeButton: 'Go away', //optional, text or html/jsx element for close text. Default: Close,
					native: true // when using native, your OS will handle theming.
				 
				});}
	componentDidMount() { this._isMounted = true;}
	componentWillUnmount() { this._isMounted = false; }
	createMarkup = ( data ) => ({ __html: data });
	onFormSubmit = ( event ) => { event.preventDefault();
		let usernameValue = document.getElementById("loginName").value;
		let passwordValue = document.getElementById("loginPass").value;
        console.log(usernameValue+"  "+passwordValue) 
        if((passwordValue!="")&&(usernameValue!="")){
        const siteUrl = clientConfig.siteUrl; const loginData = {username: this.state.username, password: this.state.password	};
        this.setState( { loading: true }, () => {
			axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token`, loginData )
				.then( res => {if ( undefined === res.data.token ) { this.setState( { error: res.data.message, loading: false } ); return; }
								const { token, user_nicename,user_display_name,user_email } = res.data;
								this.setState( { loading: false, token: token, userNiceName: user_nicename,	userDisplayName: user_display_name,
								userEmail: user_email, loggedIn: true } )
								localStorage.setItem('token',token );
								localStorage.setItem('userName',user_nicename );
								localStorage.setItem('isLoggedIn',this.state.loggedIn);
								localStorage.setItem('FirstTimeIn',"alreadyCame");
				
				} )
				.catch( err => {if (err.response) { this.setState( { error:err.response.data.message, loading: false } ); }
				 else if (err.request) { this.setState( { error:"Erreur de connection: nous n'avons pas pue contacter le server. Réessayez s'il vous plait", loading: false } );}
				 else {	this.setState( { error:"Une erreur s'est produite, Réessayez s'il vous plait", loading: false } );
				 if (!err.response) { this.setState( { error:"Erreur de connection: nous n'avons pas pue contacter le server. Réessayez s'il vous plait", loading: false } );} 
				 else {	this.setState( { error:err.response.data.message, loading: false } );} }				
				} ) }); }
	else{ this.setState( { error:"Le nom d'utilisateur et le mot de passe sont obligatoires", loading: false } );}};
    getInputsFromId (id) { let value = document.getElementById(id).value; return value; }
	handleOnChange = ( event ) => { this.setState( { [event.target.name]: event.target.value } ); console.log(event.target.value) };
    componentDidCatch(error, info) {
		this.setState( { error:error } );
	  }

    render() {

        const token = localStorage.getItem( 'token' );
    const {username,password,userNiceName,userDispalyName,userEmail,loggedIn,loading,error, loginReq, regReq} =this.state;
    
        return (
            <div>
               <React.Fragment>
			   
				<div>
				<div className="jumbotron jumbotron-fluid text-center">
				<img className="logo" src={require('./../logo-01.svg')} />
					<h4>  Le Bon Parent d'élève</h4>
					{ error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }
					<form >
					<div className="input-group">
						<div class="input-group-prepend">
          					<div class="input-group-text">@</div>
        				</div>
							<input type="text" placeholder="Email" className="form-control" name="username" id="loginName" value={ username } onChange={ this.handleOnChange } />
						</div>
						<br/>
						<div className="input-group">
						<div class="input-group-prepend">
          					<div class="input-group-text"><i class="fa fa-lock"></i></div>
        				</div>
							<input
								type="password"
								className="form-control"
								name="password" id="loginPass"
								placeholder="********"
								value={ password }
								onChange={ this.handleOnChange }
								
							/>
							
						</div>
						<br/>
						
						
						
						
						<div className="container passwordBox">
							<div className="col-12">
						   <a href="#">Mot de passe oublié</a>
						</div></div>
						

						  
						<div className="input-group">
						<button className="btn btn-large btn-block   full-width"  type="button" onClick={ this.onFormSubmit }>S'identifier</button>
						{ loading && <img className="loader" src={Loader} alt="Loader"/> }
						</div>

					</form>
					
				</div></div>
			</React.Fragment>
            </div>
        )
    }
}

export default LoginForm
