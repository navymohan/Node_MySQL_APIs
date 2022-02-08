module.exports = app => {
    const student = require("../controller/studentAssembly/stud_controller.js");

    // Retrieve all students
    app.get("/students", student.allStudents);

    // Retrieve a student with given id
    app.get("/students/:studentId", student.getStudentById);

    // Delete a student with given id
    app.delete("/students/:studentId",student.deleteStudentById);

    // Create a new student
    app.post("/students",student.addStudent);

    // Update a student with given id
    app.put("/students/:studentId",student.updateStudentById);
}