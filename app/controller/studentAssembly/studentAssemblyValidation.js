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
    return true;
}

// Validation for updating the data for any existing student
function validationUpdate(studentBody, res){
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "All the fields can't be empty"});
        return false;
    }
    if(studentBody  && Object.keys(studentBody).length >= 1 && Object.getPrototypeOf(studentBody) === Object.prototype){
        if(!studentBody.s_class && !studentBody.s_name && !studentBody.mobNo){
            res.status(400).send({message: "There is some issue with the fields."});
            return false;
        }
    }
    return true;
}

module.exports.validationAddStudent = validationAddStudent;
module.exports.validationUpdate = validationUpdate;