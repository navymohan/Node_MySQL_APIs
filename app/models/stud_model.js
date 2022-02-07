const sql = require("../config/db.js");

// constructor
const Student = function (student) {
  this.s_id = student.s_id;
  this.s_name = student.s_name;
  this.s_class = student.s_class;
};

// Query for retrieving all students
Student.allStudents = result => {
    sql.query('select * from s_details',(err, rows)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else{
            console.log(rows);
            result(null, rows);
        }
    });
};

// Query for retrieving a student with given id
Student.getStudentById = (studentId, result) => {
    sql.query('select * from s_details where s_id = ?', studentId, (err, rows)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(rows.length){
            console.log("found the student: ", rows[0]);
            result(null, rows[0]);
            return;
        }
        // Student not found
        else{
            console.log("student not found.");
            result({kind: "not_found"}, null);
            return;
        }
    });
};

// Query for deleting a particular student
Student.deleteStudentById = (studentId, result) => {
    sql.query('delete from s_details where s_id = ?', studentId, (err, rows) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        if(rows.affectedRows == 0){
            console.log("error: Not found.");
            result({kind: "not_found"}, null);
            return;
        }
        else{
            console.log('deleted student with id: ',studentId);
            result(null, rows);
        }
    });
};

// Query for creating and inserting a new student
Student.addStudent = (studentBody, result) => {
    // let stud = req.body;
    sql.query('insert into s_details values (?, ?, ?)',[studentBody.s_id,studentBody.s_name,studentBody.s_class], (err,rows)=> {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else{
            console.log('inserted student with id: ', studentBody.s_id);
            result(null, rows);
        }
    });
};

// Query for updating a particular student
Student.updateStudentById = (studentBody, studentId, result) => {
    let updateRequirement = '';
    // Check if provided in the json format in postman
    if(studentBody.s_id){
        updateRequirement += `s_id = '${studentBody.s_id}',`;
    }
    if(studentBody.s_name){
        updateRequirement += `s_name = '${studentBody.s_name}',`;
    }
    if(studentBody.s_class){
        updateRequirement += `s_class = '${studentBody.s_class}',`;
    }
    // Removing last character from the string updatePayload
    updateRequirement = updateRequirement.substring(0, updateRequirement.length-1);
    const mySqlQuery = "update s_details set " + updateRequirement + " where s_id = " + studentId;
    sql.query(mySqlQuery, [], (err,rows)=> {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(rows.affectedRows == 0){
            console.log("error: Not found.");
            result({kind: "not_found"}, null);
            return;
        }
        else{
            console.log("updated student with id: ", studentId);
            result(null, rows);
        }
    });
};

module.exports = Student;