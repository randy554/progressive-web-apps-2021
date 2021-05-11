import express from "express";
import dotenv from "dotenv";
import compression from "compression";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const api_key = process.env.API_KEY;

// Import routes
import home from "./modules/home.js";
import detail from "./modules/detail.js";
import offline from "./modules/offline.js";

// Set template engine
// Set views location
app.set("view engine", "ejs");
app.set("views", "views");

app.use(compression());
app.use(express.static("public"));

// Routes
app.get("/", home);
app.get("/detail/:id/:username?", detail);
app.get("/offline", offline);

app.listen(port || 3001, () =>
  console.log(`Open page @ http://localhost:${port}`)
);
