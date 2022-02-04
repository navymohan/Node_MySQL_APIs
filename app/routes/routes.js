module.exports = app => {
    const student = require("../controller/stud_controller.js");

    // Retrieve all students
    app.get("/student", student.allStudents);

    // Delete a student with given id
    app.delete("/student/:id",student.deleteStudentById);

    // Create a new student
    app.post("/student",student.addStudent);

    // Update a student with given id
    app.put("/student/:id",student.updateStudentById);
}