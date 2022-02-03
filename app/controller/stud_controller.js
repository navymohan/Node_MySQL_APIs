const Student = require("../models/stud_model.js");

exports.show_all = (req, res) => {
    Student.show_all((err, rows) => {
        if(err)
        console.log(err);
        else
        res.send(rows);
    });
};

exports.del = (req, res) => {
    Student.del(req.params.id, (err, rows) => {
        if(err)
        console.log(err);
        else
        res.send("deleted");
    });
};

exports.insert = (req,res) => {
    let stud = req.body;
    Student.insert(stud, (err,rows) => {
        if(err)
        console.log(err);
        else
        res.send("inserted");
    });
};

exports.update = (req,res) => {
    let stud = req.body;
    Student.update(stud, req.params.id, (err, rows) =>{
        if(err)
        console.log(err);
        else
        res.send("updated");
    });
};
