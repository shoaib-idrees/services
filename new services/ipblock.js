// Init dependencies
const express = require('express')
const ipfilter = require('express-ipfilter').IpFilter
 
// Blacklist the following IPs
const ips = ['127.0.0.1']
 
// Create the server
app.use(ipfilter(ips))
app.listen(3000)

/*
var blackList =
[
    '77.88.99.1',
    '88.77.99.1'
];
*/