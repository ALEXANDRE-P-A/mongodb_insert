const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.set("view engine","ejs");

app.use("/resources", express.static(path.join(__dirname,"/resources")));

app.use("/",require("./router/index.js"));

app.listen(PORT,_=>{
  console.log(`Application listeing at http://127.0.0.1:${PORT}`);
});