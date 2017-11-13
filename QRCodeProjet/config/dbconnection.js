var mysql=require('mysql');
var express = require('express')
var app = express();

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'qrcode',
    multipleStatements:true
});
module.exports = connection;
