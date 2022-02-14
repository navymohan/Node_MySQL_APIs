const jwt = require("jsonwebtoken");

// Response for retrieving complete data of students
function responseGetData(res, rows){
    res.send({
        "status": true,
        "message": "Retrieved students data successfully.",
        "data": rows
    });
}

// Response for retrieving the student data for given id
function responseStudentById(res, rows){
    res.send({
        "status": true,
        "message": "Retrieved student data successfully.",
        "data": rows
    });
}

// Response for deleting a student with given id
function responseDeleteStudent(res, id){
    res.send({
        "status": true,
        "message": `Deleted student with id: ${id}`,
    });
}

// Response for creating a new student
function responseCreateStudent(res){
    res.send({
        "status": true,
        "message": "Data of new student inserted successfully."
    });
}

// Response for updating a student with given id
function responseUpdateStudent(res, id){
    res.send({
        "status": true,
        "message": `successfully updated student with id: ${id}`
    });
}

// Response for login
function responseLogin(studentBody, rows, res){
    if(studentBody.password == rows.password){
        rows.password = undefined;
        const jsontoken = jwt.sign({result: rows}, "paisabazaar", {expiresIn: "1h"});
        return res.send({
            "status": true,
            "message": "Logged in successfully.",
            "token": jsontoken
        });
    }
    else{
        return res.send({
            "status": false,
            "message": "Invalid email or password"
        });
    }
}

module.exports.responseGetData = responseGetData;
module.exports.responseStudentById = responseStudentById;
module.exports.responseDeleteStudent = responseDeleteStudent;
module.exports.responseCreateStudent = responseCreateStudent;
module.exports.responseUpdateStudent = responseUpdateStudent;
module.exports.responseLogin = responseLogin;