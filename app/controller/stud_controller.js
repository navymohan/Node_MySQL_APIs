const Student = require("../models/stud_model.js");
const responseGetData = require("../utility/response.js")
const responseDeleteStudent = require("../utility/response.js")
const responseCreateStudent = require("../utility/response.js")
const responseUpdateStudent = require("../utility/response.js")

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
