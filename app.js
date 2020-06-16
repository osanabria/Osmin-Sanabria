var express = require("express");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
var functions = require('./functions/mail.js');

// APP CONFIG
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//MAIN ROUTES

app.get("/", function(req, res)
{
  if(res.err)
  {
      console.log("Error with /landing");
  }
  else
  {
          res.render("landing"); 
  }
});

app.post("/email", function(req, res)
{
  if(res.err)
  {
    console.log("Error with /landing");
  }
  else
  {
    const emailAdd = req.body.email;
    const message = req.body.message;
    const subject = req.body.subject;
    functions.data.mailgun(emailAdd, subject, message);
    res.redirect("/");
  }
});


app.listen(process.env.PORT || 8080, function(){
  console.log("The Server Has Started!");
});