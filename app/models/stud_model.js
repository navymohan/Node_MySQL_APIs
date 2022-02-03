const sql = require("../config/db.js");

// constructor
const Student = function (student) {
  this.s_id = student.s_id;
  this.s_name = student.s_name;
  this.s_class = student.s_class;
};

Student.show_all = result => {
    sql.query('select * from s_details',(err, rows)=>{
        if(err)
        console.log(err);
        else
        console.log(rows);
    });
};

Student.del = (id, result) => {
    sql.query('delete from s_details where s_id = ?', id, (err, rows) => {
        if(err)
        console.log(err);
        else
        console.log('deleted employee with id: ',id);
    });
};

Student.insert = (stud, result) => {
    // let stud = req.body;
    sql.query('insert into s_details values (?, ?, ?)',[stud.s_id,stud.s_name,stud.s_class], (err,rows)=> {
        if(err)
        console.log(err);
        else
        console.log('inserted');
    });
};

Student.update = (stud, id, result) => {
    sql.query('update s_details set s_name = ? where s_id = ?',[stud.s_name,id], (err,rows)=> {
        if(err)
        console.log(err);
        else
        console.log('updated');
    });
};

module.exports = Student;