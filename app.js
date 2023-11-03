const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cookie = require("cookie-parser");

const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");

const PORT = process.env.PORT || 8080;

// Express stteings.
const app = express();
app.set("view engine","ejs");
app.disable("x-powered-by");

// Set accesslogger.
app.use(accesslogger());

// Static resources.
app.use("/resources", express.static(path.join(__dirname,"/resources")));
app.use(favicon(path.join(__dirname,"/resources/favicon.ico")));

// Set cookie.
app.use(cookie());
app.use((req,res,next)=>{
  res.cookie("atoviag_cookie","keypress_typing_game");
  next();
});

// Dynamic resources.
app.use("/",require("./router/index.js"));

// Set applicationlogger.
app.use(applicationlogger());

// Execute application.
app.listen(PORT,_=>{
  logger.application.info(`Application listeing at http://127.0.0.1:${PORT}`);
});