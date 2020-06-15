var express = require("express");
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");

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

app.listen(process.env.PORT || 8080, function(){
  console.log("The Server Has Started!");
});