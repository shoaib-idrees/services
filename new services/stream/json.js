var http=require('http');
var fs=require('fs');




var server=http.createServer(function(req,res){
	console.log('Request was made:'+req.url);
	res.writeHead(200,{'Content-Type' : 'application/json'});
	var myObj={
		name:'Shoaib'
		,age:'40'
	};
	res.end(JSON.stringify(myObj));
	//This res.end require string or buffer
});
server.listen(3000,'127.0.0.1');
console.log('yo dawgs,now listening to port 3000');