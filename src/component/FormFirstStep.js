import React, { Component, Button } from 'react'
import {handleValidation} from './helper.js';
export class FormFirstStep extends Component {
    constructor() {super(); this.state = {errors:[]}; }
   
    continue = e =>{
        e.preventDefault();
       let listOfIds = ["name","firstname","display_name"];
       let listOfValues = [];
       for(let i = 0; i < listOfIds.length; i++){listOfValues[i]= this.getInputsFromId(listOfIds[i]); }     
       let response = handleValidation(listOfIds,listOfValues);
       if (response[0]==true){ this.props.nextStep();}
       else{ this.setState({ errors:response[1]})}
       
    }
    getInputsFromId (id) { let value = document.getElementById(id).value; return value; }
   
    
    render() {
        const {values, handleChange }= this.props;
        return (
            <div>
                 <legend className="scheduler-border">A propos de vous</legend>
                <div className="form-group row">
                
                        <div className="col-auto">
                          <label htmlFor="surname">Nom</label>
                          <input name="name" type="text" className={" form-control"} id="name"  onChange={handleChange('name')} placeholder="Nom"  />
                          <p className={""}>{this.state.errors[0]}</p>
                        </div>
                        <div className="col-auto">
                          <label htmlFor="firstname">Prénom</label>
                          <input name="firstname" type="text" className={" form-control"} id="firstname"  onChange={handleChange('firstname')} placeholder="Prénom"  />
                          <p className={""}>{this.state.errors[1]}</p>
                        </div>
                        <div className="col-auto">
                          <label htmlFor="display_name">Nom à affiché</label>
                          <input name="display_name" type="text" className={" form-control"} id="display_name"  onChange={handleChange('display_name')} placeholder="Nom à affiché"  />
                          <p className={""}>{this.state.errors[2]}</p>
                        </div>
                        <button type="submit"  name="firstSubmit" className="btn btn-primary" onClick={this.continue}>Suivant</button>   
            </div></div>
        )
    }
}

export default FormFirstStep
