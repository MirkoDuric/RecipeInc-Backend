require("dotenv").config();
const express = require("express");
const path = require("path"); // Dodato za putanje
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

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));

// Koristi API rute
app.use("/api", Recipes); // Ovo je promenjeno da bi jasno razdvojili API rute

// Sve ostale rute vodi na index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware za obradu grešaka
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Port listens on port ${PORT}`);
});
