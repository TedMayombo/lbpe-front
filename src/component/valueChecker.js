export function valueChecker(value,type) {
    let errors =["Ce champs est obligatoire", "Ce champs ne doit contenir que des lettres","Ce champs est incorrect", "Les mots de passes est trop courts", "vos mots de passes ne correspondent pas", "Cela semble bon!", "Chosissez au moins une option","Ce champs ne doit contenir que des chiffres","Ce numéro est trop court"];
    let error="";
    if ((value === "") || (!value) ||  (0 === value.length)){error=errors[0]}
    else{
    switch (type) {
        case "text": if(!(/^[a-zA-Z]+$/.test(value))){error=errors[1]}
        break;
        case "email": 
        if(!(value).includes("@")){error=errors[2]}
        if((value).includes("@")){if(!(value).includes(".")){error=errors[2]}}
        break; 
        case "password": if((value.length)<=6){error=errors[3]}   break;
        case "phone": if( !(/^\d+$/.test(value))){ error=errors[7]} else if((value.length)<8){error=errors[8]} break;
        
    }
}
    return error;
}
export default valueChecker;
