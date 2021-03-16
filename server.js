import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const api_key = process.env.API_KEY;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

// // API endpoint
// const api_endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=12&rating=g`;

// app.get("/", (req, res) => {
//   fetch(api_endpoint)
//     .then((result) => result.json())
//     .then((jsonReturnData) => {
//       res.render("index", {
//         data: jsonReturnData.data,
//       });
//     });
// });

async function getData(apiEndpoint) {
  const response = await fetch(apiEndpoint);
  console.log("Response: ", response);

  const data = await response.json();
  console.log("Data:", data);

  return data;
}

app.get("/", async (req, res) => {
  try {
    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=12&rating=g`
    );

    console.log("Dit is returnData ", returnData);

    res.render("index", {
      data: returnData.data,
    });
  } catch (error) {
    res.send("Error on path: / ");
  }
});

// app.get("/detail/:id/:username?", (req, res) => {
//   fetch(`https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${api_key}`)
//     .then((result) => result.json())
//     .then((jsonReturnData) => {
//       res.render("detail", {
//         data: jsonReturnData.data,
//         username: req.params.username,
//       });
//     });
// });

app.get("/detail/:id/:username?", async (req, res) => {
  try {
    const returnData = await getData(
      `https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${api_key}`
    );

    console.log("Dit is returnData ", returnData);

    res.render("detail", {
      data: returnData.data,
      username: req.params.username,
    });
  } catch (error) {
    res.send("Error on path: /detail ");
  }
});

app.listen(port || 3001, () =>
  console.log(`Open page @ http://localhost:${port}`)
);
