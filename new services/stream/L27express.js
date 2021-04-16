var express=require('express');
var app=express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/assets"));
app.get('/',function(req,res){
	res.render('index');
});


app.get('/contact',function(req,res){
	res.render('contact');
});

app.get('/profile/:name',function(req,res){
	var data={age:40, job: 'learning', hobbies:['eating', 'reading', 'sleeping']};
	res.render('Profile' , {person: req.params.name, data: data});
});


app.listen(3000);




















