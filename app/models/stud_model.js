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

// Query for deleting a particular student
Student.deleteStudentById = (id, result) => {
    sql.query('delete from s_details where s_id = ?', id, (err, rows) => {
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
            console.log('deleted student with id: ',id);
            result(null, rows);
        }
    });
};

// Query for creating and inserting a new student
Student.addStudent = (stud, result) => {
    // let stud = req.body;
    sql.query('insert into s_details values (?, ?, ?)',[stud.s_id,stud.s_name,stud.s_class], (err,rows)=> {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else{
            console.log('inserted student with id: ', stud.s_id);
            result(null, rows);
        }
    });
};

// Query for updating a particular student
Student.updateStudentById = (stud, id, result) => {
    let updatePayload = '';
    // Means if provided in the json format in postman
    if(stud.s_id){
        updatePayload += `s_id = '${stud.s_id}',`;
    }
    if(stud.s_name){
        updatePayload += `s_name = '${stud.s_name}',`;
    }
    if(stud.s_class){
        updatePayload += `s_class = '${stud.s_class}',`;
    }
    // Removing last character from the string updatePayload
    updatePayload = updatePayload.substring(0, updatePayload.length-1);
    const mySqlQuery = "update s_details set " + updatePayload + " where s_id = " + id;
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
            console.log("updated student with id: ", id);
            result(null, rows);
        }
    });
};

module.exports = Student;