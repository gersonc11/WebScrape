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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape";


// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes

// landing page route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


// Route to get news that is scraped from the NY times website
app.get("/scrape", function (req, res) {
// grabbing body of website with axios
  axios.get("https://www.nytimes.com").then(function (response) {
    // loading body into cheerio and giving it a variable of $ for shorthand
    var $ = cheerio.load(response.data);

    var results = db.articles;

    $("h2.esl82me0").slice(3).each(function (i, element) {
      var title = $(element).text();
      // console.log(title)
      var link = $(element).parent().parent().attr("href");
      let url = "https://www.nytimes.com/" + link;
      // console.log(url)
      let summary = $(element).parent().next().text();
      console.log(`${summary}`)
      results.insert({ "headLine": `${title}`, "link": `${url}`, "summary": `${summary}` })
    })
    res.send("Scrape Complete");
  });
});



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
