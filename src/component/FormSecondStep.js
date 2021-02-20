import React, { Component, Button } from 'react'
import { handleValidation } from './helper.js';
import clientConfig from '../client-config';
import axios from 'axios';
import localStorage from 'local-storage';
import Loader from "../loader.gif";

export class FormSecondStep extends Component {


  constructor() {super();
    this._isMounted = false;
    this.state = {errors:[], insertError: "",loading: false}; }
    goBack = () => { this.props.prevStep(); }
    continue = e =>{
        e.preventDefault();
       let listOfIds = ["email", "password", "passwordRepeat"];
       let listOfValues = [];
       for(let i = 0; i < listOfIds.length; i++){listOfValues[i]= this.getInputsFromId(listOfIds[i]); }     
       let response = handleValidation(listOfIds,listOfValues);
       if (response[0] == true) {
        if (listOfValues[1] == listOfValues[2]) {

          this.getWPnonce(listOfValues[0], listOfValues[1]);
        }
        else {
          response[0] = false; this.state.errors[0] = "Cela semble bon!"; this.state.errors[1] = "vos mots de passes ne correspondent pas"; this.state.errors[2] = "vos mots de passes ne correspondent pas";
          this.setState({ errors: this.state.errors }); 
        }
      }
      else { this.setState({ errors: response[1] }); }
       
    }
    getInputsFromId (id) { let value = document.getElementById(id).value; return value; }
    getWPnonce(email, password) {
      const siteUrl = clientConfig.siteUrl;
      this.setState( { loading: true });
      axios.get(siteUrl + '/api/get_nonce/?controller=user&method=register').then(res => { this.insertData(res.data.nonce, email, password); }).catch(error => { this.setState({ insertError: "Un prolème de connection avec le serveur est survenue. Essayez plus tard" });  this.setState( { loading: false }); });
    }
    insertData(myNonce, email, password) {
      const siteUrl = clientConfig.siteUrl;
      this.setState( { loading: true });
      let displayName = this.props.values.display_name;
      if ((displayName === "") || (!displayName) || (0 === displayName.length)) { displayName = this.props.values.firstname + " " + this.props.values.name }
      axios.get(siteUrl + '/api/user/register/?username=' + displayName + '&email=' + email + '&nonce=' + myNonce + '&display_name=' + displayName + '&user_pass=' + password + '&insecure=cool',{timeout:5000})
        .then(res => {
          const status = res.data.status;
          if (status == "error") { this.setState({ insertError: "Cet email ou nom d'utilisateur existe déja" });  this.setState( { loading: false});}
          if (status == "ok") { 
            let cookieData =[res.data.cookie,res.data.cookie_admin,res.data.cookie_name,res.data.user_id];
            let {regCookies}=this.props;
            regCookies(cookieData);
            this.setState( { loading: false });     
            this.props.nextStep();
          
          }
        }).catch(error => {
          if (error.code === 'ECONNABORTED'){ 
            this.setState({ insertError: "La connection avec le serveur a pris trop de temps. Essayez encore" });
            this.setState( { loading: false });
          }
          else{
          this.setState({ insertError: error.response });
          this.setState( { loading: false });}
        });
    }
   
    render() {
      const { values, handleChange } = this.props;
      const loading = this.state.loading;
      return (       
        <div>
          <legend className="scheduler-border">Vos access </legend>
          { this.state.insertError && <div className="alert alert-danger"> <p>{this.state.insertError}</p></div> }
          <div className="form-group row">
            <div className="col-auto">
              <label htmlFor="email">Email</label>
              <input name="email" type="text" className={" form-control"} id="email" onChange={handleChange('email')} placeholder="Email" />
              <p className={""}>{this.state.errors[0]}</p>
            </div>
            <div className="col-auto">
              <label htmlFor="password">Mot de passe</label>
              <input name="password" type="password" className={" form-control"} id="password" onChange={handleChange('password')} placeholder="Mot de passe" />
              <p className={""}>{this.state.errors[1]}</p>
            </div>
            <div className="col-auto">
              <label htmlFor="passwordRepeat">Repétez le mot de passe</label>
              <input name="passwordRepeat" type="password" className={" form-control"} id="passwordRepeat" onChange={handleChange('passwordRepeat')} placeholder="Repétez le mot de passe" />
              <p className={""}>{this.state.errors[2]}</p>
            </div>
            <button type="submit" name="secondSubmit" className="btn btn-primary" onClick={this.continue}>Suivant</button>
            { loading && <img className="loader" src={Loader} alt="Loader"/> }
            <button type="submit" name="secondSubmit" className="btn btn-primary" onClick={this.goBack}>Revenir à zéro</button>
          </div></div>
      )
    }
  
  }

export default FormSecondStep
