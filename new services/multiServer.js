app
  .use('/app1', require('./app1/index').app)
  .use('/app2', require('./app2/index').app)
  .listen(8080);
  /*---------------------------------*/
  var express = require('express');

let app1 = express();
let app2 = express();

app1.listen(3000, () => {
  console.log("Started server on 3000");
});

app2.listen(3002, () => {
  console.log("Started server on 3002");   
});
Share