const validationStudent = require("../studentAssembly/studentAssemblyValidation.js");
const StudentController = require("../studentAssembly/stud_controller.js")

exports.allStudents = (req, res) => {
    StudentController.allStudents(req, res);
}

exports.getStudentById = (req, res) => {
    StudentController.getStudentById(req, res);
}

exports.deleteStudentById = (req, res) => {
    StudentController.deleteStudentById(req,res);
}

exports.addStudent = (req,res) => {
    let studentBody = req.body;
    // validation of request
    if(validationStudent.validationAddStudent(studentBody, res)){
        StudentController.addStudent(studentBody, req, res);
    }
    else return;
}

exports.updateStudentById = (req, res) => {
    let studentBody = req.body;
    // validation of request
    if(validationStudent.validationUpdate(studentBody, res)){
        StudentController.updateStudentById(studentBody, req, res);
    }
    else return;
}