function responseGetData(res, rows){
    res.send({
        "status": true,
        "message": "Retrieved students data successfully.",
        "data": rows
    });
}

function responseDeleteStudent(res, id){
    res.send({
        "status": true,
        "message": `Deleted student with id: ${id}`,
    });
}

function responseCreateStudent(res){
    res.send({
        "status": true,
        "message": "Data of new student inserted successfully."
    });
}

function responseUpdateStudent(res, id){
    res.send({
        "status": true,
        "message": `successfully updated student with id: ${id}`
    })
}

module.exports.responseGetData = responseGetData;
module.exports.responseDeleteStudent = responseDeleteStudent;
module.exports.responseCreateStudent = responseCreateStudent;
module.exports.responseUpdateStudent = responseUpdateStudent;