// dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/scrape", { useNewUrlParser: true });

// Routes

// A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.nytimes.com").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    var results=[];

    $("h2.esl82me0").slice(3).each(function(i, element) {
      var title = $(element).text();
      // console.log(title)
      var link = $(element).parent().parent().attr("href");
      let url = "https://www.nytimes.com/"+link;
      // console.log(url)
      let summary1 = $(element).parent().next().text();
      let summary2= $(element).parent().next().children().text()
      console.log(summary1 + summary2)
    })
    // console.log(results)
});