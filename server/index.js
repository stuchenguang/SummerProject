var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var cors = require('cors');
var nodemailer = require("nodemailer");

// Create the application.
var app = express();

// config SMTP server
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "stcg216@gmail.com",
        pass: "930216kjstcg"
    }
});
// SMTP over


// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/welcome', function(req, res, next) {
  res.send('This is the rest api for my crowdsourcing web application.');
  next();
});

var emailArray = ['gmail', 'soton'];


app.get('/send',function(req,res){
    var a = Math.random();
    
    // filter email address
    var filterEmail = function () {
      var e = req.query.to;
      var reqemailArray = [];
      reqemailArray[0] = e;
      var toEmail = "";
      var result = _.difference(emailArray, reqemailArray);
      var b = false;
      b = _.isEqual(result, emailArray);
      if (b === true) {
        emailArray.push(req.query.to);
        toEmail = req.query.to;
      }
      return toEmail;
      // console.log(toEmail);
    };
    

    var mailOptions={
        to : filterEmail(),
        // to : req.query.to,
        subject : 'voucher',
        text : 'Dear participant, thank you for providing data of your living expenses. Your voucher code is: ' + a + ' !'
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/crowdsourcingapp');
mongoose.connection.once('open', function() {
  
  // Load the models.
  app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 3000...');
  app.listen(process.env.PORT||3000);
});