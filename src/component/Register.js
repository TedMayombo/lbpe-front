import React, { Component, Button } from 'react'
import axios from 'axios';
import clientConfig from '../client-config';
import Tab from 'react-bootstrap/Tab';
import { Nav } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Terms from './Terms';
import FormPinStep from './FormPinStep';
import FormFirstStep from './FormFirstStep';
import FormSecondStep from './FormSecondStep';
import FormThirdStep from './FormThirdStep';
import FormFourthStep from './FormFourthStep';


class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',firstname: '', display_name: '',
      email: '', password: '',  passwordRepeat: '',
      cookie:'', cookie_admin:'',cookie_name:'',wp_user_id:'',
      phone: '', whatsApp: '', airtel:'', libertis:'',
      response: '',userPin:"",pinRepeat:"",
      parent:"",director:"",teacher: "", ape: "", terms: "", status: [],         
      statusString: "",token:"", refreshToken:"",userUuid:"",action:"createUser",
      step:4, cookieSteps:0 };
    
  }

//proceed to the next step
nextStep = () => {
  const {step} = this.state; 
  this.setState({step:step +1});
}
//proceed to the previous step
prevStep = () => {
  const {step} = this.state; 
  this.setState({step:step -1});
}

//handle Changes
handleChange = input => e => {
  console.log(input);
  this.setState({[input]: e.target.value}); 
}
handleDataChange = (key,value) => {
  console.log(key + " "+ value);
  this.setState({[key]: value});
  //this.setState({key:value});
}
regCookies=(stateValue) => { 
  for(let i = 0; i < stateValue.length; i++){
    switch (i) {
      case 0: this.setState({ cookie:stateValue[i]}); break;
      case 1: this.setState({ cookie_admin:stateValue[i]}); break;
      case 2: this.setState({ cookie_name:stateValue[i]}); break;
      case 3: this.setState({ wp_user_id:stateValue[i]}); break;
      }
  }  
}


  render() {
  const {step} = this.state;
  const {name,firstname,display_name,email,password,passwordRepeat,cookie,cookie_admin,cookie_name,wp_user_id,phone,whatsApp,airtel,libertis,response,userPin,pinRepeat,parent,director,teacher,ape,terms,status,statusString,token,refreshToken,userUuid,action}= this.state;
  const values = {name,firstname,display_name,email,password,passwordRepeat,cookie,cookie_admin,cookie_name,wp_user_id,phone,whatsApp,airtel,libertis,response,userPin,pinRepeat,parent,director,teacher,ape,terms,status,statusString,token,refreshToken,userUuid,action};
  console.log(this.state);
  switch(step){
    case 0: return(<FormPinStep
      nextStep ={this.nextStep}
      handleChange ={this.handleChange}
      values = {values}
      />);
    case 1: return(<FormFirstStep
    nextStep ={this.nextStep}
    handleChange ={this.handleChange}
    values = {values}
    />);
    case 2: return(<FormSecondStep
      nextStep ={this.nextStep}
      prevStep ={this.prevStep}
      handleChange ={this.handleChange}
      regCookies ={this.regCookies}
      values = {values}
      />);
    case 3: return(<FormThirdStep
      nextStep ={this.nextStep}
      prevStep ={this.prevStep}
      handleChange ={this.handleChange}
      values = {values}
      />);
      case 4: return(<FormFourthStep
        nextStep ={this.nextStep}
        prevStep ={this.prevStep}
        handleChange ={this.handleChange}
        handleDataChange ={this.handleDataChange}
        values = {values}
        />);
      
  }
    
  }
}

export default Register
