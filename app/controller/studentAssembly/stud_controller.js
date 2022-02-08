const Student = require("../../models/stud_model.js");
const responseGetData = require("../../utility/response.js")
const responseStudentById = require("../../utility/response.js")
const responseDeleteStudent = require("../../utility/response.js")
const responseCreateStudent = require("../../utility/response.js")
const responseUpdateStudent = require("../../utility/response.js")

// Retrieve all students from the database
exports.allStudents = (req, res) => {
    Student.allStudents((err, rows) => {
        if(err)
            res.status(500).send({message: err.message || "Some unexpected error occured while retieving."});
        else{
            responseGetData.responseGetData(res, rows);
        }
    });
};

// Retrieve a student with given id
exports.getStudentById = (req, res) => {
    Student.getStudentById(req.params.studentId, (err, rows) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + req.params.studentId});
            }
            else
                res.status(500).send({message: err.message || "Some unexpected error occured while retieving."});
        }
        else{
            responseStudentById.responseStudentById(res, rows);
        }
    });
};

// Delete a student with given id in the request
exports.deleteStudentById = (req, res) => {
    Student.deleteStudentById(req.params.studentId, (err, rows) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + req.params.studentId});
            }
            else{
                res.status(500).send({message: err.message || "Some unexpected error occured."});
            }
        }
        else{
            responseDeleteStudent.responseDeleteStudent(res, req.params.studentId);
        }
    });
};

// Create and save a new student
exports.addStudent = (req,res) => {
    let studentBody = req.body;
    // validation of request
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "The field data can't be empty"});
        return;
    }
    if(!(studentBody && studentBody.s_name)){
        return res.status(400).send({message: "There is some issue with the s_name field."});
    }
    if(!(studentBody && studentBody.s_class)){
        return res.status(400).send({message: "There is some issue with the s_class field."});
    }
    if(!(studentBody && studentBody.mobNo)){
        return res.status(400).send({message: "There is some issue with the mobNo field."});
    }
    Student.addStudent(studentBody, (err,rows) => {
        if(err){
            res.status(500).send({message: err.message || "Some unexpected error occured."});
        }
        else{
            responseCreateStudent.responseCreateStudent(res);
        }
    });
};

// Update a student identified by the id in the request
exports.updateStudentById = (req,res) => {
    let studentBody = req.body;
    // validation of request
    if(studentBody  && Object.keys(studentBody).length === 0 && Object.getPrototypeOf(studentBody) === Object.prototype){
        res.status(400).send({message: "All the fields can't be empty"});
        return;
    }
    if(studentBody  && Object.keys(studentBody).length === 1 && Object.getPrototypeOf(studentBody) === Object.prototype){
        if(!studentBody.s_class && !studentBody.s_name && !studentBody.mobNo){
            return res.status(400).send({message: "There is some issue with the fields."});
        }
    }
    Student.updateStudentById(studentBody, req.params.studentId, (err, rows) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + req.params.studentId});
            }
            else{
                res.status(500).send({message: err.message || "Some unexpected error occured."});
            }
        }
        else{
            responseUpdateStudent.responseUpdateStudent(res,req.params.studentId);
        }
    });
};
