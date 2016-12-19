/**
 * Created by Alican on 2016-12-16.
 */
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/jetbrains");
var Product = mongoose.model("Product",{name:String});
var Account = mongoose.model("Account",{username: String, password:String});

app.get("/", function (req, res) {
    Account.find(function (err, accounts) {
        res.send(accounts);
    })
});

app.post("/add", function (req, res) {
    var name = req.body.name;
    var product = new Product({name:name});
    product.save(function () {
        res.send();
    })
});

app.post("/register",function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   var account = Account.findOne({username: username, password: password}).exec(function (err, accs) {
       if(err){
           console.log("it exists");
           res.send("error");
       }
       else if(accs != null){
           console.log("it exists");
           res.send("error");
       }
       else{
           var newAccount = new Account({username: username, password: password});
           newAccount.save(function () {
               res.send(newAccount.username);
           })
       }
   });
});

app.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var account = Account.findOne({username: username, password: password}).exec(function (err, accs) {
        if(err){
            console.log("it's null");
            res.send("error");
        }
        else if(accs == null){
            console.log("it's null");
            res.send("error");
        }
        else{
            console.log("login in as: " + username + " " + password);
            res.send(username);
        }
    });
});

app.post("/send", function (req, res) {
    var name = req.body.name;
    var message = req.body.message;
    console.log("name: " + name + " msg: " + message);
    res.send();
});

app.post("/set", function (req, res){
    var name = req.body.name;
    console.log("set name to: " + name);
    res.send();
});

//app.listen(3000);
server.listen(3000);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});