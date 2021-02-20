import React, { Component } from 'react'

export class FormThirdStep extends Component {
  constructor() { super(); this.state = { errors: [],insertError:"" }; }
  goBack = () =>{this.props.prevStep();}
  
  continue = e => {
    e.preventDefault();
    let listOfValues =  [this.props.values.parent, this.props.values.director,this.props.values.teacher,this.props.values.ape];
    let t=0;
    let myStatus=[];
    for (let i = 0; i <listOfValues.length; i++) { if(listOfValues[i]!=""){ t++; myStatus[i]=listOfValues[i];}}
    this.props.values.status=myStatus;
    if((t>0)&&(t<=listOfValues.length+1)){ this.props.nextStep();}
    else{this.setState({insertError:"Chosissez au moins une option"})}
  }
  getInputsFromId(id) { let value = document.getElementById(id).value; return value; }
  
  
  
    render() {
    const {values, handleChange } = this.props;
    return (
      <div>
      <legend className="scheduler-border">Vos/votre statut(s)</legend>
    <p>{this.state.insertError}</p>
        <div className="form-group row">
                           <div className="col-auto">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="parent" name="parent" value="parent" onChange={handleChange("parent")} />
                            <label className="custom-control-label" htmlFor="parent">Parent d’élève</label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="director" name="director" value="director" onChange={handleChange("director")} />
                            <label className="custom-control-label" htmlFor="director">Directeur d’école</label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="teacher" name="teacher" value="teacher" onChange={handleChange("teacher")} />
                            <label className="custom-control-label" htmlFor="teacher">Enseignant</label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="ape" name="ape" value="ape" onChange={handleChange("ape")} />
                            <label className="custom-control-label" htmlFor="ape">Responsable au sein d’une APE</label>
                          </div>
                        </div>
         
          
          <button type="submit" name="secondSubmit" className="btn btn-primary" onClick={this.continue}>Suivant</button>
        </div></div>
    )
  }
}

export default FormThirdStep
