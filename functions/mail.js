var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');

var methods = {

  mailgun: function(emailAdd, subject, message)
  {
    var auth = {
      auth: {
        api_key: 'key-c39a4865e67e574228993caf69146fb4',
        domain: 'osminsanabria.com'
      }
    };
  
    var transporter = nodemailer.createTransport(mg(auth));
  
    var mailOptions = {
      from: emailAdd, // sender address (who sends)
      to: "osanabri@uark.edu", // list of receivers (who receives)
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