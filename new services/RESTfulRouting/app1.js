var express   = require("express"),
methodOverride = require("method-override"),
    app       = express();
bodyParser    = require("body-parser"),
helmet        = require("helmet"),
mongoose      = require("mongoose");

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true ,useUnifiedTopology: true }); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// app.use(helmet());


app.use(helmet.contentSecurityPolicy({
				 directives:{
				   defaultSrc:["'self'" , "https://nation.com.pk" ],
				   scriptSrc:["'self'",'code.jquery.com','maxcdn.bootstrapcdn.com'],
				   styleSrc:["'self'", "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"],
				   fontSrc:["'self'",'maxcdn.bootstrapcdn.com']}}));
//<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
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
app.get("/blogs/new" , function(req ,res){
	res.render("new");
});
// CREATE ROUTE
app.post("/blogs",function(req,res){
		// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
				// redirect
			res.redirect("/blogs");
		}
	});
});
// SHOW ROUTE
app.get("/blogs/:id" , function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
      if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
            	 res.render("show", {blog: foundBlog});
	    }
	});
});
//EDIT ROUTE
app.get("/blogs/:id/edit" , function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
      if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
          	res.render("edit" , {blog: foundBlog});
	    }
	});
});
//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
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
app.delete("/blogs/:id",function(req, res){
	//destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
         if(err){
			res.redirect("/blogs");
		} else {
			//console.log(foundCampground.name);
          	res.redirect("/blogs/");
	    }
   });	

});
app.listen(3000,function(){
	console.log("Server Started!");
});