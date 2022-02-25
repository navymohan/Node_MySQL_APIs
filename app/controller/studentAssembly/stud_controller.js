const Student = require("../../models/stud_model.js");
const responseGetData = require("../../utility/response.js")
const responseStudentById = require("../../utility/response.js")
const responseDeleteStudent = require("../../utility/response.js")
const responseCreateStudent = require("../../utility/response.js")
const responseUpdateStudent = require("../../utility/response.js")
const responseLogin = require("../../utility/response.js")
const jwt = require("jsonwebtoken");
const { signUp } = require("../../models/stud_model.js");
// const redis = require("redis");

// const redisClient = redis.createClient(6379);
// redisClient.on('connect',() => {
//     console.log(`Connected to Redis on port 6379.`)
// });
// redisClient.connect();

// Retrieve all students from the database
exports.allStudents = (req, res) => {
    // console.log("before get");
    // redisClient.get('students', (err, value) => {
    //     // console.log("just after get");
    //     if(err){
    //         console.log(err);
    //     }
    //     if(value != null){
    //         console.log(value);
    //         return res.send({
    //             "status": true,
    //             "message": "Retrieved students data successfully.",
    //             "data": JSON.parse(value)
    //         });
    //     }
    //     else{
            Student.allStudents((err, rows) => {
                if(err)
                    res.status(500).send({message: err.message || "Some unexpected error occured while retieving."});
                else{
                    // redisClient.SETEX('students', 3600, JSON.stringify(rows));
                    responseGetData.responseGetData(res, rows);
                }
            });
        // }
    // })
};

// Retrieve a student with given id
// Added redis
exports.getStudentById = (req, res) => {
    // let bearerToken = req.get("authorization");
    let bearerToken = req.params.tokn;
    // bearerToken = bearerToken.substr(7);
    decoded = jwt.verify(bearerToken, "paisabazaar");
    let id = decoded.payload;
    Student.getStudentById(id, (err, rows) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "No student is found with id " + id});
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
exports.addStudent = (studentBody, req, res) => {
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
exports.updateStudentById = (studentBody, req, res) => {
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

// For login and creating token
exports.login = (studentBody, req, res) => {
    Student.login(studentBody.email, (err, rows) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: "Invalid email or password"});
            }
            else
                res.status(500).send({message: err.message || "Some unexpected error occured while retieving."});
        }
        else{
            responseLogin.responseLogin(studentBody, rows, res);
        }
    });
};

// For SignUp and creating token
exports.signUp = (studentBody, req, res) => {
    Student.signUp(studentBody, (err, rows, studentId) => {
        if(err){
            if(err.kind == "already_exists"){
                // res.status(404).send({message: "Email already exists."});
                return res.send({
                    "status": false,
                    "message": "Student already exists."
                });
            }
            else
                res.status(500).send({message: err.message || "Some unexpected error occured."});
        }
        else {
            const jsontoken = jwt.sign({payload: rows.insertId}, "paisabazaar", {expiresIn: "1h"});
            return res.send({
                "status": true,
                "message": "Signed Up successfully.",
                "token": jsontoken
            });
        }
    });
};