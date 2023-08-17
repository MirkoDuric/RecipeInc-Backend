require("dotenv").config();
const express = require("express");
const path = require("path"); // Dodato
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Recipes = require("./Recipes");
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());

const corsOptions = {
  origin: "https://recipeinc.onrender.com",
  methods: ["GET", "POST"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use("", Recipes);

// Ovo je vaš statički direktorijum za React aplikaciju.
// Posluži statičke fajlove iz 'build' direktorijuma
app.use(express.static(path.join(__dirname, "build")));

// Za sve nepostojeće rute, posluži React aplikaciju.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Port listens on port ${PORT}`);
});
