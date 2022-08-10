const express = require("express");
const app = express();
const heroesTab = require("../heroes");

app.get("/", (req, res) => {
  res.json(heroesTab);
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const heroe = heroesTab.find((heroe) => heroe.slug === slug);

  if (heroe) {
    res.json(heroe.slug);
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/:slug/powers", (req, res) => {
  const { slug } = req.params;
  const heroe = heroesTab.find((heroe) => heroe.slug === slug);

  if (heroe) {
    res.json(heroe.power);
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = app;
