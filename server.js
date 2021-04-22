const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();

app.set("view engine", "hbs");

//Middleware for logging requests
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `Method:${req.method} URL:${req.url} time: ${now} \n`;
  fs.appendFileSync("server.log", log);
  next();
});

//Maintenance Page
app.use((req, res) => {
  res.render("maintenance.hbs");
});

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("upperCase", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    message: "This is Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    message: "This is About Page",
  });
});

app.listen(3000, () => {
  console.log("Server run on 3000 port");
});
