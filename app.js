
const express = require("express");

let app = express();

app.use(express.static(__dirname+"/"));

let PORT = process.env.PORT || 3001;
app.listen(PORT,()=>console.log("starting on port:",PORT));


