module.exports = app => {
    const student = require("../controller/studentAssembly/index.js");
    const tokenAuthentication = require("../authentication/tokenAuthentication.js")
    // Retrieve all students
    app.get("/students", tokenAuthentication.checkToken, student.allStudents);

    // Retrieve a student with given id
    app.get("/students/:studentId", tokenAuthentication.checkToken, student.getStudentById);

    // Delete a student with given id
    app.delete("/students/:studentId", tokenAuthentication.checkToken, student.deleteStudentById);

    // Create a new student
    app.post("/students", tokenAuthentication.checkToken, student.addStudent);

    // Update a student with given id
    app.put("/students/:studentId", tokenAuthentication.checkToken, student.updateStudentById);

    app.post("/students/login", student.login);

    app.post("/students/signUp", student.signUp);
}