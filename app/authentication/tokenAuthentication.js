const { type } = require("express/lib/response");
const jwt = require("jsonwebtoken");

// Checking for correct token
module.exports = {
    checkToken: (req, res, next) => {
        // let token = req.get("authorization");
        let token = req.params.tokn;
        console.log(token);
        // token = token.substr(7);
        console.log(token);
        if(token){
            console.log('here');
            // token = token.slice(7);
            jwt.verify(token, "paisabazaar", (err, decoded) => {
                if(err){
                    // console.log(err);
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