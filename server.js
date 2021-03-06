// Requiring all the dependencies.
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");
// var Save = require("./models/Save.js");
var logger = require("morgan");
var cheerio = require("cheerio");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 4000;

// Parse application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
require("./routes/scrape.js")(app);
require("./routes/html.js")(app);
// connect to database
mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/web-scraper";
mongoose.connect(MONGODB_URI);


app.get("/", function (req, res) {
    res.redirect(path.join(__dirname, "./views/index.html"));
});

app.get("/saved/all", function (req, res) {
    res.redirect(path.join(__dirname, "views/saved.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});