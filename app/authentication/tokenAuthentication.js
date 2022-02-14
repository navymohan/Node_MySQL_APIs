const jwt = require("jsonwebtoken");

<<<<<<< HEAD
// Checking for correct token
=======
// Check for correct token
>>>>>>> 3e23861a4823f5e91080eb5856f80044a2c3343b
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token, "paisabazaar", (err, decoded) => {
                if(err){
                    res.send({
                        "status": false,
                        "message": "Invalid token"
                    });
                }
                else{
                    next();
                }
            })
        }
        else{
            res.send({
                "status": false,
                "message": "Access denied"
            });
        }
    }
}