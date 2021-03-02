var express              =require("express"),
    app                  =express(),
    bodyParser           =require("body-parser"),
    passport             =require("passport"),
    LocalStrategy        =require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    methodOverride       =require("method-override"),
    flash                = require("connect-flash"),
    mongoose             =require("mongoose"),
    Comment              =require("./models/comment"),
    Campground           =require("./models/Campground"),
    User                 =  require("./models/user"),
    seedDB               =require("./seeds");


    var commentRoutes    =require("./routes/comments"),
        campgroundRoutes =require("./routes/campgrounds"),
        indexRoutes      =require("./routes/index");

    
    app.use(flash());
    app.use(require("express-session")({
    	secret: "Rusty is the best and cutest dog in the world",
    	resave: false,
    	saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
   // //seedDB();
   // mongoose.connect("mongodb+srv://shoaib:shoaib@cluster0-c7kek.mongodb.net/test?retryWrites=true&w=majority",{
   //  useNewUrlParser: true,
   //  useCreateIndex: true
   // }).then(()=>{
   //  console.log("connected to DB");
   // }).catch(err=>{
   //  console.log("Error:", err.message);
   // })
   var url = process.env.DATABASEURL|| "mongodb://localhost:27017/camping_experience"
      // var url = process.env.DATABASEURL;

mongoose.connect(url,{ useNewUrlParser: true ,useCreateIndex: true });

   console.log(process.env.DATABASEURL);

// mongoose.connect('mongodb://localhost:27017/Yelp_camp', { useNewUrlParser: true ,useUnifiedTopology: true }); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");

	next();
});
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


// app.listen(3000,function(){
//     console.log("Server Started!");
// });
app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server Started!");
});
   
