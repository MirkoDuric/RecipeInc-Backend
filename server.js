require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Recipes = require("./Recipes");
const PORT = 8001;

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use("", Recipes);
app.listen(PORT, () => {
  console.log(`Port listens on port ${PORT}`);
});
