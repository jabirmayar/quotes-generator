const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
var path = require("path");


const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

var quote = "I am a man of fixed and unbending principles, the first of which is to be flexible at all times.";
var author = "Everett Dirksen";


app.get("/", function(req,res){


 if(author === "")
 {
   author = "Unknown";
 }

 res.render("inspirational",{quote: quote, author: author});


});



app.post("/", function(req,res){


var options = {
  url: "https://type.fit/api/quotes",
  method: "GET",

};

request(options, function(error, response, body){
var data = JSON.parse(body);


if(error){
quote = "Couldn't fetch quote, please try again!";
author = "";
}
else {
  if(response.statusCode === 200)
{
  var num = Math.floor(Math.random() * data.length);
   quote = data[num].text;
   author = data[num].author;

res.redirect("/");  }}
});  });




app.get("/random", function(req,res){

  if(author === "")
  {
    author = "Unknown";
  }

 res.render("random",{quote: quote, author: author});


});

app.post("/random", function(req,res){


var options = {
  url: "https://api.quotable.io/random",
  method: "get",

};

request(options, function(error, response, body){
var data = JSON.parse(body);


if(error){
  quote = "Couldn't fetch quote, please try again!";
  author = "";
}
else {
  if(response.statusCode === 200)
{
   quote = data.content;
   author = data.author;

res.redirect("/random");

  }
}


});


});







app.listen(process.env.PORT || 3000,function(req,res){

console.log("server is running at port 3000");

});
