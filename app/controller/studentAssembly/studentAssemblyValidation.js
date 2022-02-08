// Definition of all regular expressions 
let regexForMobileNumber = /^[6789]\d{9}$/;
let regexForemail = /^([a-zA-Z0-9+_.-]+)[@]([a-zA-Z0-9.-]+)[.com]$/;
let regexForDOB = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

// Validation for adding a new student
function validationAddStudent(studentBody, res){
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "The field data can't be empty"});
        return false;
    }
    if(!(studentBody && studentBody.s_name)){
        res.status(400).send({message: "There is some issue with the s_name field."});
        return false;
    }
    if(!(studentBody && studentBody.s_class)){
        res.status(400).send({message: "There is some issue with the s_class field."});
        return false;
    }
    if(!(studentBody && studentBody.mobNo)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    if(!(studentBody && studentBody.email)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    if(!(studentBody && studentBody.DOB)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    if(!(studentBody && studentBody.password)){
        res.status(400).send({message: "There is some issue with the password field."});
        return false;
    }

    // Regex check for mobile number 
    if(!regexForMobileNumber.exec(studentBody.mobNo)){
        res.status(400).send({message: "Mobile number not in correct format."});
        return false;
    }
    if(!regexForemail.exec(studentBody.email)){
        res.status(400).send({message: "Email not in correct format."});
        return false;
    }
    if(!regexForDOB.exec(studentBody.DOB)){
        res.status(400).send({message: "DOB not in correct format."});
        return false;
    }
    if(!regexForPassword.exec(studentBody.password)){
        res.status(400).send({message: "Password not in correct format."});
        return false;
    }
    return true;
}

// Validation for updating the data for any existing student
function validationUpdate(studentBody, res){
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "All the fields can't be empty"});
        return false;
    }
    // if(studentBody  && Object.keys(studentBody).length >= 1 && Object.getPrototypeOf(studentBody) === Object.prototype){
    //     if(!studentBody.s_class && !studentBody.s_name && !studentBody.mobNo){
    //         res.status(400).send({message: "There is some issue with the fields."});
    //         return false;
    //     }
    // }

    // Mobile number exists but not in correct format
    if(studentBody.mobNo && !regexForMobileNumber.exec(studentBody.mobNo)){
        res.status(400).send({message: "Mobile number not in correct format."});
        return false;
    }
    if(studentBody.email && !regexForemail.exec(studentBody.email)){
        res.status(400).send({message: "email not in correct format."});
        return false;
    }
    if(studentBody.DOB && !regexForDOB.exec(studentBody.DOB)){
        res.status(400).send({message: "DOB not in correct format."});
        return false;
    }
    if(studentBody.password && !regexForPassword.exec(studentBody.password)){
        res.status(400).send({message: "Password not in correct format."});
        return false;
    }
    return true;
}

module.exports.validationAddStudent = validationAddStudent;
module.exports.validationUpdate = validationUpdate;