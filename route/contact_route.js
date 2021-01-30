const express = require("express");
const router = express.Router();


router.use("/name", function(req, res, next){
  console.log("Base on /contact/name");
  next();
});

router.route("/")
  .all(function(req, res){
    console.log("Accept all requests type", req.body);
    res.send("route.all already receive the data");
  });

router.route("/:age")
  .get(function(req, res){
    console.log("get");
    res.sendFile("/Users/jlcsh/Desktop/js/route.html");
  })
  .post(function(req, res){
    res.send("Response had been sent back from app.post");
  })

router.param("age", function(req, res, next, id){
  console.log("I got you");
  next();
}); // This is kind of middleware that run before router.route("/:age").get

router.get("/name/age", function(req, res){
  res.send("Contact page--Name/Age");
}).post("/name/age", function(req, res){
  res.send("Post");
})


module.exports = router;
