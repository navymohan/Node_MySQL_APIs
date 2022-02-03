const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());

require("./app/routes/routes.js")(app);

app.listen(3000, () => console.log("check port 3000"));