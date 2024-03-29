var express =require("express");
var router  =express.Router({mergeParams:true});
var Campground=require("../models/Campground");
var Comment   =require("../models/comment");
var middleware = require("../middleware");

	router.get("/new",middleware.isLoggedIn,function(req,res){
		Campground.findById(req.params.id,function(err,campground){
			if(err){
			console.log(err);
		} else {
			     
	        res.render("comments/new" ,{campground: campground});
	    }

		});
	 });

//Comments Create
router.post("/",middleware.isLoggedIn,function(req,res){
 Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		} else {
			 	Comment.create(req.body.comment,function(err,comment){
                   if(err){    
                      req.flash("error", "Something went wrong");
			              console.log(err);
			       } else {
			       	      comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                         //save comment
                          comment.save();
				          campground.comments.push(comment);
                          campground.save();
                              req.flash("error", "Successfully added comment");
				                      res.redirect("/campgrounds/" + campground._id);
	                      }
                        });
                 }       
});
 });
//EDIT CAMPGROUND ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	  Comment.findById(req.params.comment_id, function(err, foundComment){
	  	if(err){              
              res.redirect("back");
                    } else {
	          res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
	          console.log(foundComment);
                     }
	//is user logged in?	     	
                });	       
             });


//UPDATE CAMPGROUND ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
       if(err){
           res.redirect("back");
       } else {
         var showUrl = "/campgrounds/" + req.params.id ;
         res.redirect(showUrl);
       }
   });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment){
       if(err){
           res.redirect("back");
       } else {
           comment.remove();
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/"+ req.params.id);
       }
   }); 
});
 
  module.exports=router;