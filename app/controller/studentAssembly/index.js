const validationStudent = require("../studentAssembly/studentAssemblyValidation.js");
const StudentController = require("../studentAssembly/stud_controller.js")

// For retrieving the data of all students
exports.allStudents = (req, res) => {
    StudentController.allStudents(req, res);
}

// For retrieving the data of a student with given studentId
exports.getStudentById = (req, res) => {
    StudentController.getStudentById(req, res);
}

// Deleting a student using given studentId
exports.deleteStudentById = (req, res) => {
    StudentController.deleteStudentById(req,res);
}

// To add a new student
exports.addStudent = (req,res) => {
    let studentBody = req.body;
    // validation of request
    if(validationStudent.validationAddStudent(studentBody, res)){
        StudentController.addStudent(studentBody, req, res);
    }
    else return;
}

// To update an existing student
exports.updateStudentById = (req, res) => {
    let studentBody = req.body;
    // validation of request
    if(validationStudent.validationUpdate(studentBody, res)){
        StudentController.updateStudentById(studentBody, req, res);
    }
    else return;
}

// For login
exports.login = (req, res) => {
    let studentBody = req.body;
    StudentController.login(studentBody, req, res);
}

// For signUp
exports.signUp = (req, res) => {
    let studentBody = req.body;
    if(validationStudent.validationAddStudent(studentBody, res)){
        StudentController.signUp(studentBody, req, res);
    }
}