import React, { Component, Button } from 'react'
import {handleValidation} from './helper.js';

export class FormPinStep extends Component {
    constructor() { super(); this.state = {error:""}; }
   
    continue = e =>{
        e.preventDefault();
        let response = [];
       let userPinValue = this.getInputsFromId("userPin");
       let pinRepeatValue = this.getInputsFromId("pinRepeat"); 
       if( (/^\d+$/.test(userPinValue))){
           if(userPinValue.length==4){
                if(userPinValue==pinRepeatValue){response[0]=true}else{this.setState({ error:"Repetez correctement votre pin"}) }}
            else{this.setState({ error:"Le pin doit comporter 4 chiffres"});}} 
        else{this.setState({ error:"Le pin ne doit comporter que des chiffres"})}  
       if (response[0]==true){ this.props.nextStep();}
             
    }
    getInputsFromId (id) { let value = document.getElementById(id).value; return value; }


    render() {
        const {values, handleChange }= this.props;
        return (
            <div>
            <legend className="scheduler-border">Pin de Sécurité</legend>
          
           {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
           <div className="form-group row">
                   <div className="col-auto">
                     <label htmlFor="userPin">Pin</label>
                     <input name="userPin" type="number" className={" form-control"} id="userPin"  onChange={handleChange('userPin')} placeholder="Votre pin"  />
                   </div>
                   <div className="col-auto">
                     <label htmlFor="pinRepeat">Repété votre pin</label>
                     <input name="pinRepeat" type="text" className={" form-control"} id="pinRepeat"  onChange={handleChange('pinRepeat')} placeholder="Répétez votre pin"  />
                   </div>
                   <button type="submit"  name="firstSubmit" className="btn btn-primary" onClick={this.continue}>Suivant</button>   
       </div></div>
        )
    }
}

export default FormPinStep
