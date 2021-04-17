var mongoose= require("mongoose"),
    Campground = require("./models/Campground"),
    Comment = require("./models/comment");
    

var data= [
            {
            name: "Naltar valley",
            image:"http://i.dawn.com/large/2015/12/567d1a1cc9595.jpg",
            description:"Naltar is famous for its colourful lakes, it is situated at a drive of 2.5 hours from Gilgit. World’s tastiest potatoes are cultivated here. Covered with pine trees, this valley doesn’t seem to be a part of this world. If you really want to experience paradise in this world, you should visit Naltar at least once. This place will make you fall in love with it."	,
            author:{
            id : "588c2e092403d11145412345",
            username: "Shoaib"
        }},
             {
            name: "Naltar valley-1",
            image:"http://i.dawn.com/large/2015/12/567d1a1cb17ad.jpg",
            description:"Naltar is famous for its colourful lakes, it is situated at a drive of 2.5 hours from Gilgit. World’s tastiest potatoes are cultivated here. Covered with pine trees, this valley doesn’t seem to be a part of this world. If you really want to experience paradise in this world, you should visit Naltar at least once. This place will make you fall in love with it." 
            ,author:{
            id : "588c2e092403d111454fff76",
            username: "Muhammad Umar"
        }},
            {
            name: "Neelum Valley, Azad Kashmir",
            image:"http://i.dawn.com/large/2015/12/567d1aceb5677.jpg",
            description:"Opposite to the Keran sector of Indian-held Kashmir. From the Chella Bandi Bridge – just north of Azaad Kashmir’s capital Muzaffarabad – to Tau Butt, a valley stretches out for 240 kilometres; it is known as the Neelum Valley (literally, the Blue Gem Valley).Neelum is one of the most beautiful valleys of Azaad Kashmir, and it hosts several brooks, freshwater streams, forests, lush green mountains, and a river. Here, you see cataracts falling down the mountains; their milky-white waters flowing over the roads and splashing against the rocks, before commingling with the muddy waters of River Neelum."	
            ,author:{
            id : "588c2e092403d11145467891",
            username: "Shoaib"
            } },
            {
            name: "Neelum Valley, Azad Kashmir-1",
            image:"http://i.dawn.com/large/2015/12/567d1acecd90d.jpg",
            description:"Opposite to the Keran sector of Indian-held Kashmir. From the Chella Bandi Bridge – just north of Azaad Kashmir’s capital Muzaffarabad – to Tau Butt, a valley stretches out for 240 kilometres; it is known as the Neelum Valley (literally, the Blue Gem Valley).Neelum is one of the most beautiful valleys of Azaad Kashmir, and it hosts several brooks, freshwater streams, forests, lush green mountains, and a river. Here, you see cataracts falling down the mountains; their milky-white waters flowing over the roads and splashing against the rocks, before commingling with the muddy waters of River Neelum."  
            ,author:{
            id : "588c2e092403d11145456871",
            username: "Muhammad Umar"
        }}
           ]   



    function seedDB(){
    	//Remove all campgrounds
    	Campground.deleteMany({}, function(err){
             if(err){
      	         console(err);
             } 
                        console.log("Removed Campgrounds");
    	     //add a few campgrounds
                data.forEach(function(seed){
                       Campground.create(seed,function(err, campground){
                       	if(err){
                       		console.log(err)
                       	} else { //second else
                       		console.log("Added a campground");
                       		//create a comment
                       		Comment.create(
                       			{
                       				text: "This place is greate, but I wish there was internet",
                       				      author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Shoaib"
                                }
                       			}, function(err, comment){
                       				if (err) {
                       					      console.log(err);
                       				} else { // third else ends
                       					     campground.comments.push(comment);
                       				         campground.save();
                       				         console.log("Created new comment");
                       				         }
                       				

                       			        });//comment.create ends
                                	}
                                  }); //campground,create ends

                              });//for each ends

                    
    	     
                });    //delete many ends
    	        //add a few comments       
           }    // seedDB ends
               module.exports=seedDB;

   