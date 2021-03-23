import express from "express";
import dotenv from "dotenv";
import { getData } from "./modules/getData.js";
import compression from "compression";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const api_key = process.env.API_KEY;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(compression());

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=12&rating=g`
    );

    res.render("index2", {
      data: returnData.data,
    });
  } catch (error) {
    res.send("Error on path: / ");
  }
});

app.get("/detail/:id/:username?", async (req, res) => {
  try {
    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${api_key}`
    );

    res.render("detail", {
      data: returnData.data,
      username: req.params.username,
    });
  } catch (error) {
    res.send("Error on path: /detail ");
  }
});

app.get("/offline", (req, res) => {
  res.render("offline");
});

app.listen(port || 3001, () =>
  console.log(`Open page @ http://localhost:${port}`)
);
