var express =require("express");
var router  =express.Router();
var Campground=require("../models/Campground");
var middleware = require("../middleware");



router.get("/",function(req,res){
    // Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
    	if(err){
    		console.log(err);
    	} else {
	   res.render("campgrounds/index",{campgrounds: allCampgrounds});
    	}
    });
});
 //Create a new campground and save to DB
router.post("/",middleware.isLoggedIn,function(req,res){
	var name= req.body.name;
  var price=req.body.price;
	var image=req.body.image;
	var desc =req.body.description;
	var author={
		username: req.user.username,
		id: req.user._id
	}
 var newCampground={name:name , price:price ,image:image , description: desc, author:author};
 //Create a new campgrounds and save to DB
 Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		} else {
				res.redirect("/campgrounds");
	}
});
});

 router.get("/new", middleware.isLoggedIn,function(req,res){
 	res.render("campgrounds/new");
 });
 
// Show more information about one campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			     // console.log(foundCampground);
			//console.log(foundCampground.name);
            	 res.render("campgrounds/show", {campground: foundCampground});
	    }
      });
	 });
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	//is user logged in?
	      	  Campground.findById(req.params.id, function(err, foundCampground){
	     	if(err){
              
              res.redirect("/campgrounds")
                   } else {
            	    res.render("campgrounds/edit", {campground: foundCampground});
                    }
                });	       
             });

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
       } else {
         var showUrl = "/campgrounds/" + req.params.id;
         res.redirect(showUrl);
       }
   });
});
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           campground.remove();
           res.redirect("/campgrounds");
       }
   }); 
});
module.exports=router;