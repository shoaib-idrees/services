var express = require('express');
var bodyParser = require('body-parser');
var pub = __dirname + '/public';
var app = express();
var Recaptcha = require('express-recaptcha').RecaptchaV3;
 
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY',{callback:'cb'});
 
//- required by express-recaptcha in order to get data from body or query.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(express.static(pub));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 
app.get('/', recaptcha.middleware.render, function(req, res){
  res.render('login', { captcha:res.recaptcha });
});
 
// override default options for that route
app.get('/fr', recaptcha.middleware.renderWith({'hl':'fr'}), function(req, res){
  res.render('login', { captcha:res.recaptcha });
});
 {
  "success": true|false,
  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "apk_package_name": string, // the package name of the app where the reCAPTCHA was solved
  "error-codes": [...]        // optional
}

app.post('/', recaptcha.middleware.verify, function(req, res){
  if (!req.recaptcha.error) {
    // success code
  } else {
    // error code
  }
});
app.listen(3000,function(){
    console.log("Server Started!");
});