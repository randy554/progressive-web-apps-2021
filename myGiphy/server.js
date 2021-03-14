const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

// API endpoint
const api_endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=10&rating=g`;

app.get("/", (req, res) => {
  fetch(api_endpoint)
    .then((result) => result.json())
    .then((jsonReturnData) => {
      res.render("index", {
        data: jsonReturnData.data,
      });
    });
});

app.get("/detail/:id/:username?", (req, res) => {
  fetch(
    `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${process.env.API_KEY}`
  )
    .then((result) => result.json())
    .then((jsonReturnData) => {
      res.render("detail", {
        data: jsonReturnData.data,
        username: req.params.username,
      });
    });
});

app.listen(process.env.PORT, () =>
  console.log(`Open page @ http://localhost:${process.env.PORT}`)
);
