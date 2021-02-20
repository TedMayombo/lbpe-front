import {valueChecker} from './valueChecker.js';
export function handleValidation(listOfIds,listOfValues) {
    let errors =[];
    let noErrors=[];
    let moveOn;
    let textGroup = ["name","firstname","loginName","loginPass"];
    let passWordGroup =["password","passwordRepeat"];
    let emailGroup =["email"];
    let phoneGroup =["phone","airtel","whatsApp"];
   
   
    for(let i = 0; i < listOfIds.length; i++){ 
        let currentId = listOfIds[i]; let value = listOfValues[i];
        switch (true) {
            case(textGroup.includes(currentId)): errors[i] = valueChecker(value,"text"); break;
            case(emailGroup.includes(currentId)): errors[i] = valueChecker(value,"email"); break; 
            case(passWordGroup.includes(currentId)): errors[i] = valueChecker(value,"password"); break;
            case(phoneGroup.includes(currentId)): errors[i] = valueChecker(value,"phone"); 
            break;           
        }
    }    
    for(let i = 0; i < errors.length; i++){noErrors[i]=""; }
    if((errors.toString())==(noErrors.toString())){moveOn=true} else{moveOn=false}
    let responses =[moveOn,errors];
return responses;
}
export default handleValidation;

