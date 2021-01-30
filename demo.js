const fs = require("fs");
const http = require("http");
const events = require("events");
const express = require("express");
const mongoose = require("mongoose");
const urlencodedParser = express.urlencoded({extended: false});
const app = express();

/* Connect to the mongodb*/
mongoose.connect("mongodb://Jimmy:jimmy956379@cluster0-shard-00-00.mzswg.azure.mongodb.net:27017,cluster0-shard-00-01.mzswg.azure.mongodb.net:27017,cluster0-shard-00-02.mzswg.azure.mongodb.net:27017/YT-tutorial?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).catch(function(err){if(err)console.log(err)});
const db = mongoose.connection;
db.on("error", function(err) {
  console.log(err);
})
db.on("open", function() {
  console.log("Connect to database");
})
/* Define schema and model */
const Schema = mongoose.Schema;  // store this function to an variable
const itemSchema = new Schema({place: String, job: String});  // constructor call
const itemModel = mongoose.model("identity", itemSchema);

/* Set view engine */
app.set("view engine", "ejs");
/* middleware of all requests */
app.use(express.static(__dirname+"/public"));

/* Handle requests- GET, POST, DELETE */
app.get("/", function(req, res){
  itemModel.find({}, function(err, data) {
    res.render("main.ejs",{data: data});
  });
});
app.post("/", urlencodedParser, function(req, res){
  itemModel(req.body).save(function(err) {
    if(err) throw err;
    console.log("data saved");
    res.send("Already receive the data");
  });
});
app.delete("/", urlencodedParser, function(req, res) {
  itemModel.deleteOne(req.body, function(err){
    if(err) throw err;
    res.send("Already delete the data");
  })
});

app.get("/test/:name", function(req, res){
  console.log("app.get on /test");
  res.send("Welcome to the test page, "+req.params.name);
});

/* Handling ajax requests */
const jsonParser = express.json();
app.post("/contact", jsonParser, function(req, res){
  console.log(req.body);
  res.send("Response had been sent back from app.post");
}).get("/contact", function(req, res){
  res.sendFile(__dirname+"/contact.html");
})

/*let obj = {age: 21, name: ["Jim", "Bob", "Alice"]};
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public") );
app.get("/", function(req, res) {
  res.render("main.ejs", obj);
})
app.listen(3000, function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Work properly");
  }
})*/
