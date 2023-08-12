const express = require("express");
const app = express.Router();
const pool = require("./pool");

const dishTypeMap = {
  AllRecipes: [],
  PeruvianDishes: [1, 2, 3],
  ZAFDishes: [4, 5, 6],
  SerbianDishes: [7, 8, 9],
};

app.get("/:dishType", (req, res) => {
  const dishType = req.params.dishType;
  const dishIds = dishTypeMap[dishType];

  if (!dishIds) {
    return res.status(404).json({ error: "Unknown dish type requested." });
  }

  if (dishIds.length === 0) {
    pool
      .query("SELECT id, name, description, image_url FROM dishes;")
      .then(({ rows }) => res.json(rows))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    pool
      .query(
        `SELECT id, name, description, image_url FROM dishes WHERE id IN ($1, $2, $3);`,
        dishIds
      )
      .then(({ rows }) => res.json(rows))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

app.get("/:dishId/data", (req, res) => {
  const dishId = req.params.dishId;
  pool
    .query("SELECT * FROM dishes WHERE id=$1;", [dishId])
    .then(({ rows }) => res.json(rows))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/:dishId/ingredients", (req, res) => {
  const dishId = req.params.dishId;
  pool
    .query("SELECT * FROM ingredients WHERE dish_id=$1;", [dishId])
    .then(({ rows }) => res.json(rows))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/:dishId/preparation", (req, res) => {
  const dishId = req.params.dishId;
  pool
    .query("SELECT * FROM preparation_steps WHERE dish_id=$1;", [dishId])
    .then(({ rows }) => res.json(rows))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = app;
