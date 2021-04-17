var express   = require("express"),
methodOverride = require("method-override"),
    app       = express();
bodyParser    = require("body-parser"),
helmet        = require("helmet"),
cookieParser = require('cookie-parser'),
csrf = require('csurf'),
mongoose      = require("mongoose");
var csrfProtection = csrf({ cookie: true });
const winston = require('winston');
const hpkp = require('hpkp');
//only this works for x-powered-by
const hidePoweredBy = require('hide-powered-by') ;
app.use(hidePoweredBy());

app.use(hpkp({
  maxAge: 123,
  sha256s: ['AbCdEf123=', 'ZyXwVu456='],
  includeSubDomains: true,         // optional
  reportUri: 'http://example.com', // optional
  reportOnly: false,               // optional
  }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true ,useUnifiedTopology: true }); 
app.use(bodyParser.urlencoded({parameterLimit: 100000,
    limit: '50mb',
    extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// app.use(helmet());
app.use(cookieParser());
const nocache = require("nocache");
app.use(nocache());
app.use(helmet.contentSecurityPolicy({
				 directives:{
				   defaultSrc:["'self'" , "https://nation.com.pk","https://semantic-ui.com"],
				   scriptSrc:["'self'",'code.jquery.com','maxcdn.bootstrapcdn.com'],
				   styleSrc:["'self'",'maxcdn.bootstrapcdn.com',"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"],
				   fontSrc:["'self'",'maxcdn.bootstrapcdn.com']}}));

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "img-src": ["'self'", "https://nation.com.pk"],
//       },
//     },
//   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(helmet.expectCt({enforce: true,
    maxAge: 123}));
//Also, you can lie about the technologies used with this header. For example, 
//even if your application does not use PHP, you can set X-Powered-By header to seem so.
// app.use(helmet.hidePoweredBy());
// app.disable('x-powered-by');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
	format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
    transports: [
        new winston.transports.Console(),
         new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    ],//Handling Uncaught Exceptions with winston
    exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ], //Handling Uncaught Promise Rejections with winston
  rejectionHandlers: [
    new transports.File({ filename: 'rejections.log' })
  ],
});

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');
const handler = (func) => (req, res) => {
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};
app.use( (req, res, done) => {
    logger.info(req.originalUrl);
    done();
});
//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
//RESTfulROUTES 
/*Blog.create({
	title: "Test Blog",
	image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Hunza_-_Altit_Valley_-_Nasr_Rahman.jpg/800px-Hunza_-_Altit_Valley_-_Nasr_Rahman.jpg",
	body: " Autumn at its boom in the valley of Hunza Altit Valley, Gilgit Baltistan, Pakistan"
});*/
app.get("/", function(req, res){
	res.redirect("/blogs");
});
//INDEX ROUTE
app.get("/blogs" , function(req, res){
	Blog.find({}, function(err, blogs){
	if(err){
    		console.log(err);
    	} else {
	   res.render("index",{blogs: blogs});
    	}
	});
});
// NEW ROUTE
app.get("/blogs/new" ,csrfProtection, function(req ,res){
		console.log(req.csrfToken() );

	res.render("new", { csrfToken: req.csrfToken() });
});
// CREATE ROUTE
app.post("/blogs", csrfProtection,function(req,res){
		// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
				// redirect
						console.log(req.csrfToken() );

			res.redirect("/blogs");
		}
	});
});
// SHOW ROUTE
app.get("/blogs/:id" ,csrfProtection, function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
      if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
					console.log(req.csrfToken() );
            	 res.render("show", {blog: foundBlog, csrfToken: req.csrfToken() });
	    }
	});
});
//EDIT ROUTE
app.get("/blogs/:id/edit" , csrfProtection,function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
      if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
          	res.render("edit" , {blog: foundBlog, csrfToken: req.csrfToken() });
	    }
	});
});
//UPDATE ROUTE
app.put("/blogs/:id",csrfProtection, function(req, res){
      Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
          	res.redirect("/blogs/"+ req.params.id);
	    }
      });
});
//DELETE ROUTE
app.delete("/blogs/:id",csrfProtection,function(req, res){
	//destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
         if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
			console.log(req.csrfToken() );
          	res.redirect("/blogs/");
	    }
   });	

});
app.listen(3000,function(){
	console.log("Server Started!");
});