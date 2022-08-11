const heroesTab = require("../heroes");

const verifyPostHeroe = (req, res, next) => {
  const { slug } = req.body;
  const hero = heroesTab.find((hero) => hero.slug === slug);

  if (hero) {
    res.status(409).json("Hero already exists");
  } else {
    next();
  }
};

const verifyPower = (req, res, next) => {
  const { slug } = req.params;
  const { power } = req.body;

  const hero = heroesTab.find((hero) => hero.slug === power);
  const powers = hero.power.find((power) => power === slug);

  if (powers) {
    res.status(409).json("Power already exists");
  } else {
    next();
  }
};

const verifyHeroe = (req, res, next) => {
  const { slug } = req.params;
  const hero = heroesTab.find((hero) => hero.slug === slug);

  if (hero) {
    next();
  } else {
    res.status(404).json("Hero not found ");
  }
};

module.exports = {
  verifyPostHeroe: verifyPostHeroe,
  verifyPower: verifyPower,
  verifyHeroe: verifyHeroe,
};
