var express = require("express");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
//var functions = require('./functions/mail.js');
const flash = require("connect-flash");
var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');
require('dotenv').config();


// APP CONFIG
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.general = req.flash();
    next();
});  

  var auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };

  var transporter = nodemailer.createTransport(mg(auth));
  
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
    
    var mailOptions = {
      from: emailAdd, // sender address (who sends)
      to: process.env.EMAIL, // list of receivers (who receives)
      subject: subject, // Subject line
      // text: 'Hello world ', // plaintext body
      text: message, // html body
    };
  
    transporter.sendMail(mailOptions, function(err, data){
      if(err)
      {
        console.log("error ");
        req.flash("error", "Message failed to send please try again ");
        res.redirect("/#contact");
      }
      else
      {
        console.log("message sent");
        req.flash("success", "Message Sent ");
        res.redirect("/#contact");
      }
    })
  }
});

//haaahahah 
app.listen(process.env.PORT || 8080, function(){
  console.log("The Server Has Started!");
});