var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');
require('dotenv').config();

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

var methods = {

  mailgun: function(emailAdd, subject, message)
  {
    var auth = {
      auth: {
        api_key: process.env.API_KEY,
        domain: 'sandboxcd0eab5e70eb44608a182083f8f907e2.mailgun.org'
      }
    };
  
    var transporter = nodemailer.createTransport(mg(auth));
  
    var mailOptions = {
      from: emailAdd, // sender address (who sends)
      to: 'osmin.sanabria@gmail.com', // list of receivers (who receives)
      subject: subject, // Subject line
      // text: 'Hello world ', // plaintext body
      text: message, // html body
    };
  
    transporter.sendMail(mailOptions, function(err, data){
      if(err)
      {
        console.log("error ");
        req.flash("error", "Message failed to send please try again ");
        res.redirect("/register");
      }
      else
      {
        console.log("message sent");
      }
    })
  }
}
exports.data = methods;
