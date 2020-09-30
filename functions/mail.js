var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');

var methods = {

  mailgun: function(emailAdd, subject, message)
  {
    var auth = {
      auth: {
        api_key: 'key-5cf8659024b6164a817e308fb6b5dc7b',
        domain: 'osminsanabria.com'
      }
    };
  
    var transporter = nodemailer.createTransport(mg(auth));
  
    var mailOptions = {
      from: emailAdd, // sender address (who sends)
      to: "osmin.sanabria@gmail.com", // list of receivers (who receives)
      subject: subject, // Subject line
      // text: 'Hello world ', // plaintext body
      text: message, // html body
    };
  
    transporter.sendMail(mailOptions, function(err, data){
      if(err)
      {
        console.log("error ");
      }
      else
      {
        console.log("message sent");
      }
    })
  }
}
exports.data = methods;
