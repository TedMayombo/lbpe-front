import React, { Component, Button } from 'react'
import {handleValidation} from './helper.js';
import Accordion from 'react-bootstrap/Accordion';
import Terms from './Terms';
import { Redirect } from 'react-router';
import Loader from "../loader.gif";
import axios from 'axios';
import clientConfig from '../client-config';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import * as uuid from 'uuid';





export class FormFourthStep extends Component {
    constructor() {super(); this.state = {loading: false, errors:[],insertError:"",redirect: null, token:"", refreshToken:"",userUuid:"",tokenDate:null,refreshDate:null}; 
    this.handleCollapse = this.handleCollapse.bind(this);}
   
    continue = e =>{
        e.preventDefault();
       let listOfIds = ["phone","airtel","whatsApp"];
       let listOfValues = [];
       for(let i = 0; i < listOfIds.length; i++){listOfValues[i]= this.getInputsFromId(listOfIds[i]); }     
       let response = handleValidation(listOfIds,listOfValues);
       if (response[0]==true){ 
          if((this.props.values.terms)==""){this.setState({insertError:"Vous devez accepter les terms d'utilisations"})}
          else{
            this.saveInLocalStorage().then((value) => console.log(value));
            
            this.setState({ redirect: "/" });
            
          }
        console.log(this.props.values);
        
        }
       else{ this.setState({ errors:response[1]})}
       
    }
    
    getInputsFromId (id) { let value = document.getElementById(id).value; return value; }
    parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  };
    handleCollapse(e) { e.preventDefault();}
    saveInLocalStorage = async () => { 
      const siteUrl = clientConfig.siteUrl;
      let {handleDataChange}=this.props;
      this.setState({loading:true});
      //axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token?username=${this.props.values.display_name}&password=${this.props.values.password }`)
      axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token?username=TedMAYOMBO&password=Jtemmao@2008`)
      .then( res => {
              if ( undefined === res.data.token ) {	console.log( res.data.message);
                   return false }
                   else {
                  
                   /*console.log("user_nicename" + user_nicename); 
                   console.log("user_display_name" + user_display_name); 
                   console.log("user_email" + user_email);      
                   window.localStorage.setItem('token',token );
                   window.localStorage.setItem('userName',user_nicename );
                   window.localStorage.setItem('userDisplayName',user_display_name );
                   window.localStorage.setItem('userEmail',user_email );*/
                   let {handleDataChange}=this.props;
                   handleDataChange("token",res.data.token);
                    this.getRefrechToken(res.data.token).then((value) => console.log(value));
                    return true; }
      }).catch( err => {this.setState({insertError:"Problème de connections"})});
    
      
    
    }
    getRefrechToken = async (token) => {
      var refreshToken="";
    axios.post(  `http://localhost/wordpress/wp-json/aam/v1/authenticate?jwt=${token}&username=TedMayombo&password=Jtemmao@2008`).then( res => {
     /* const decod = this.parseJwt (token);
      var date = new Date(decod.exp * 1000);
      var refDate = new Date(res.data.jwt.token_expires * 1000);
      console.log(date);
      console.log(refDate);*/
      let {handleDataChange}=this.props;
      handleDataChange("refreshToken", res.data.jwt.token);
      handleDataChange("userUuid", uuid.v4());
      if(res.data.jwt.token){ const { values } = this.props;
      console.log("sending data ");  console.log(values);
      this.saveToDatabase().then((value) => console.log(value));
    }
    
}).catch( err => {console.log( err);});

      return  refreshToken }
            
    saveToDatabase = async () => {
      
      
      /*const apiPath = clientConfig.formHandler;
      //this.generateStatusString();
     
      axios({ method: 'post', url: apiPath, headers: { 'content-type': 'application/json' }, data: this.props.values})
      .then(result => { console.log(" insret into DB: the result is " + result.data)
       console.log(result);
        
     
      })
      .catch();

    return "save in database" */
  }
      
      generateStatusString(){
      let myStatusString = this.props.values.myStatusString;
      if(this.props.values.parent !=""){myStatusString=myStatusString+this.props.values.parent}
      if(this.props.values.director !=""){myStatusString=myStatusString+this.props.values.director}
      if(this.props.values.teacher !=""){myStatusString=myStatusString+this.props.values.teacher}
      if(this.props.values.ape !=""){myStatusString=myStatusString+this.props.values.ape}
      myStatusString="["+myStatusString+"]";
      console.log(myStatusString);
      return myStatusString;
    };
    
    render() {
      const { values, handleChange } = this.props;
      console.log(values);
        
        if ( localStorage.getItem( 'token' ) ) {
          return <Redirect to={this.state.redirect} />
        } else {
        return (
            <div>

                 <legend className="scheduler-border">Contact et payement</legend>
                 {this.state.insertError &&<div className="alert alert-danger" role="alert"> {this.state.insertError }</div>}
                 <div className="form-group row">
                        <div className="col-auto">
                          <label htmlFor="validatePhone">Phone</label>
                          <input name="phone" onChange={handleChange("phone")} type="tel" className={" form-control "} id="phone" placeholder="Numéro de Téléphone " />
                          <p >{this.state.errors[0]}</p>
                        </div>
                        <div className="col-auto">
                          <label htmlFor="validatePhone">Airtel Money</label>
                          <input name="airtel" onChange={handleChange("airtel")} type="tel" className={" form-control "}  id="airtel" placeholder="Numéro de Téléphone " />
                          <p >{this.state.errors[1]}</p>
                        </div>
                        <div className="col-auto">
                          <label htmlFor="whatsApp">whatsApp</label>
                          <input name="whatsApp" onChange={handleChange("whatsApp")} type="tel" className={" form-control "} placeholder="Numéro WhatsApp"  id="whatsApp"/>
                          <p >{this.state.errors[2]}</p>
                        </div>
                        <div className="form-group row">
                      <div className="col-auto">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="terms" name="terms" value="terms" onChange={handleChange("terms")} />
                            <label className="custom-control-label" htmlFor="terms">J'accepte les conditions générales d'utilisation </label>
                          </div>
                        </div>
                      <div className="col-auto">
                        <Accordion > 
                          <Accordion.Toggle   eventKey="0" onClick={this.handleCollapse}> Lire les conditions générales d'utilisation</Accordion.Toggle>
                          <Accordion.Collapse eventKey="0"><Terms/></Accordion.Collapse>
                        </Accordion>
                        </div>
                        </div>
            
                        <button type="submit"  name="firstSubmit" className="btn btn-primary" onClick={this.continue}>Suivant</button>   
            </div></div>
        )
        }
    }
}

export default FormFourthStep
