const jwt = require("jsonwebtoken");

// Check for correct token
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