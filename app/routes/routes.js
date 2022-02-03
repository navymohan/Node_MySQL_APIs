module.exports = app => {
    const student = require("../controller/stud_controller.js");

    app.get("/student", student.show_all);
    app.delete("/student/:id",student.del);
    app.post("/student",student.insert);
    app.put("/student/:id",student.update);
}