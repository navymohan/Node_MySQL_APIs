// Definition of all regular expressions 
let regexForMobileNumber = /^[6789]\d{9}$/;
// The last question mark represents the choice between ".com" and ".co.in"
let regexForemail = /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,5})(\.[a-z]{2,8})?$/;
let regexForDOB = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&]).{8,16}$/;

// Validation for adding a new student
function validationAddStudent(studentBody, res){
    // Check for empty studentBody
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "The field data can't be empty"});
        return false;
    }
    // Check for some issue in s_name field
    if(!(studentBody && studentBody.s_name)){
        res.status(400).send({message: "There is some issue with the s_name field."});
        return false;
    }
    // Check for some issue in s_class field
    if(!(studentBody && studentBody.s_class)){
        res.status(400).send({message: "There is some issue with the s_class field."});
        return false;
    }
    // Check for some issue in mobNo field
    if(!(studentBody && studentBody.mobNo)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    // Check for some issue in email field
    if(!(studentBody && studentBody.email)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    // Check for some issue in DOB field
    if(!(studentBody && studentBody.DOB)){
        res.status(400).send({message: "There is some issue with the mobNo field."});
        return false;
    }
    // Check for some issue in password field
    if(!(studentBody && studentBody.password)){
        res.status(400).send({message: "There is some issue with the password field."});
        return false;
    }

    // Regex check for mobile number 
    if(!regexForMobileNumber.exec(studentBody.mobNo)){
        res.status(400).send({message: "Mobile number not in correct format."});
        return false;
    }
    // Regex check for email
    if(!regexForemail.exec(studentBody.email)){
        res.status(400).send({message: "Email not in correct format."});
        return false;
    }
    // Regex check for DOB
    if(!regexForDOB.exec(studentBody.DOB)){
        res.status(400).send({message: "DOB not in correct format."});
        return false;
    }
    // Regex check for password
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
    // email exists but not in correct format
    if(studentBody.email && !regexForemail.exec(studentBody.email)){
        res.status(400).send({message: "email not in correct format."});
        return false;
    }
    // DOB exists but not in correct format
    if(studentBody.DOB && !regexForDOB.exec(studentBody.DOB)){
        res.status(400).send({message: "DOB not in correct format."});
        return false;
    }
    // password exists but not in correct format
    if(studentBody.password && !regexForPassword.exec(studentBody.password)){
        res.status(400).send({message: "Password not in correct format."});
        return false;
    }
    return true;
}

module.exports.validationAddStudent = validationAddStudent;
module.exports.validationUpdate = validationUpdate;