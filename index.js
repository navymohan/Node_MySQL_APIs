const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyparser.json());
app.use(cors());

require("./app/routes/routes.js")(app);

app.listen(3002, () => console.log("check port 3002"));