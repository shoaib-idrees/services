var express                =  require("express"),
    bodyParser             =  require("body-parser"),
    mongoose               =  require("mongoose"),
    passport               =  require("passport"),
    User                   =  require("./models/user"),
    passportLocalMongoose  =  require("passport-local-mongoose"),
    LocalStrategy          =  require("passport-local");

mongoose.connect('mongodb://localhost:27017/Auth_demo', { useNewUrlParser: true ,useUnifiedTopology: true }); 

var app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
      secret: "Rusty is the best and cutest dog in the world",
      resave: false,
      saveUninitialized :false   
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==================Routes===========


app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
});
// Auth Routes
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
    	if (err) {
    		console.log(err);
    		return res.render("register");
    	 } else {
    		passport.authenticate("local")(req, res, function(){
    			res.redirect("/secret");
    		});
    	}
    });
});
app.get("/login", function(req,res){
	res.render("login");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000,function(){
	console.log("Server Started!");
});
