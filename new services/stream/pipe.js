var http=require('http');
var fs=require('fs');

// var myReadStream= fs.createReadStream('./readMe.txt','utf8');
// var myWriteStream=fs.createWriteStream(__dirname +'/writeMe.txt');
// myReadStream.pipe(myWriteStream);




var server=http.createServer(function(req,res){
	console.log('Request was made:'+req.url);
	res.writeHead(200,{'content-type':'text/plain'});
	var myReadStream= fs.createReadStream(__dirname+ '/readMe.txt','utf8');
myReadStream.pipe(res);
	
});
server.listen(3000,'127.0.0.1');
console.log('yo dawgs,now listening to port 3000');