const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

// API endpoint
const api_endpoint =
  "https://api.giphy.com/v1/gifs/trending?api_key=tuMYha0ArdAhO9rqn9aM9erHww61XGns&limit=10&rating=g";

app.get("/", (req, res) => {
  fetch(api_endpoint)
    .then((result) => result.json())
    .then((jsonReturnData) => {
      res.render("index", {
        pageTitle: "Welcome to MyGiphy App!",
        pageDescription: "The Best Trending GIFs",
        data: jsonReturnData.data,
      });
    });
});

app.get("/detail/:id/:username?", (req, res) => {
  fetch(
    `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=tuMYha0ArdAhO9rqn9aM9erHww61XGns`
  )
    .then((result) => result.json())
    .then((jsonReturnData) => {
      res.render("detail", {
        pageTitle: "Welcome to MyGiphy App!",
        data: jsonReturnData.data,
        username: req.params.username,
      });
    });
});

app.listen(port, () => console.log(`Open page @ http://localhost:${port}`));
