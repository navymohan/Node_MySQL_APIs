module.exports = app => {
    const student = require("../controller/stud_controller.js");

    app.get("/student", student.show_all); //for view
    app.delete("/student/:id",student.del); //for deletion
    app.post("/student",student.insert); //for insertion
    app.put("/student/:id",student.update); //for update
}