const express = require("express");
const app = express();
const heroesTab = require("../heroes");
const {
  verifyPostHeroe,
  verifyPower,
  verifyHeroe,
} = require("../middlewares/heroes");

// Récupère tous les héros et renvoie une réponse au format json
app.get("/", (req, res) => {
  res.json(heroesTab);
});

// Récupère uniquement le héros correspondant
app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const heroe = heroesTab.find((heroe) => heroe.slug === slug);

  if (heroe) {
    res.json(heroe.slug);
  } else {
    res.status(404).send("Not found");
  }
});

// Récupère les pouvoirs d'un super héros et renvoie une réponse au format json qui contient une liste de ses pouvoirs
app.get("/:slug/powers", (req, res) => {
  const { slug } = req.params;
  const heroe = heroesTab.find((heroe) => heroe.slug === slug);

  if (heroe) {
    res.json(heroe.power);
  } else {
    res.status(404).send("Not found");
  }
});

// Crée un super héros et le renvoie en reponse
app.post("/", verifyPostHeroe, (req, res) => {
  const { slug, name, power, color, isAlive, age, image } = req.body;
  const hero = {
    slug: slug,
    name: name,
    power: power,
    color: color,
    isAlive: isAlive,
    age: age,
    image: image,
  };
  heroesTab.push(hero);
  res.status(201).send(hero);
});

// Ajoute un pouvoir à un super héros et renvoie en réponse le héro avec ses nouveaux pouvoirs
app.put("/:slug/powers", verifyPower, (req, res) => {
  const { slug } = req.params;
  const { newPower } = req.body;
  const hero = heroesTab.find((hero) => hero.slug === slug);

  hero.power.push(newPower);
  res.status(200).json(newPower);
});

// Suppression d'un héro de la liste après vérification que celui-ci n'existe pas
app.delete("/:slug", verifyHeroe, (req, res) => {
  const { slug } = req.params;
  const heroIndex = heroesTab.findIndex((hero) => hero.slug === slug);
  heroesTab.splice(heroIndex, 1);
  res.status(200).json(`${slug} deleted`);
});

// Suppression d'un pouvoir du héro apès vérification que le héro existe
app.delete("/:slug/powers/:power", verifyHeroe, (req, res) => {
  const { slug, power } = req.params;
  const hero = heroesTab.find((hero) => hero.slug === slug);
  const heroPower = hero.power.find((powerToDelete) => powerToDelete === power);

  if (heroPower) {
    const heroPowerIndex = hero.power.findIndex(
      (powerToDelete) => powerToDelete === power
    );
    hero.power.splice(heroPowerIndex, 1);
    res.status(200).json(`The ${power} of ${slug} have been deleted`);
  } else {
    res.status(404).json("Power not found");
  }
});

// Remplace les valeurs du héro existant par celles qui arrivent dans la requete
app.put("/:slug", verifyHeroe, (req, res) => {
  const { slug } = req.params;
  const heroIndex = heroesTab.findIndex((hero) => hero.slug === slug);
  const editedHero = req.body;

  heroes[heroIndex] = editedHero;
  res.status(200).json(editedHero);
});
module.exports = app;
