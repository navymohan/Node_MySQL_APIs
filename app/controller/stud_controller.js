const Student = require("../models/stud_model.js");

// Retrieve all students from the database
exports.allStudents = (req, res) => {
    Student.allStudents((err, rows) => {
        if(err)
            res.status(500).send({message: err.message || "Some unexpected error occured while retieving."});
        else
            res.send(rows);
    });
};

// Delete a student with given id in the request
exports.deleteStudentById = (req, res) => {
    Student.deleteStudentById(req.params.id, (err, rows) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + req.params.id});
            }
            else{
                res.status(500).send({message: err.message || "Some unexpected error occured."});
            }
        }
        else
            res.send({message: "Student is deleted successfully with id " + req.params.id});
    });
};

// Create and save a new student
exports.addStudent = (req,res) => {
    let stud = req.body;
    Student.addStudent(stud, (err,rows) => {
        if(err){
            res.status(500).send({message: err.message || "Some unexpected error occured."});
        }
        else{
            res.send({message: "Student is inserted successfully with id " + stud.s_id});
        }
    });
};

// Update a student identified by the id in the request
exports.updateStudentById = (req,res) => {
    let stud = req.body;
    Student.updateStudentById(stud, req.params.id, (err, rows) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + req.params.id});
            }
            else{
                res.status(500).send({message: err.message || "Some unexpected error occured."});
            }
        }
        else{
            res.send({message: "Student is updated successfully with id " + req.params.id});
        }
    });
};
