const { readFileSync } = require("fs");
const express = require("express");
const router = express.Router();


// Getting all translations
router.get("/translations", async (req, res) => {
  try {
    const controlTranslations = JSON.parse(
      readFileSync("./translations/controls.json")
    );
    const infoTranslations = JSON.parse(
      readFileSync("./translations/info.json")
    );

    setTimeout(() => {
      res
        .status(200)
        .send(JSON.stringify({ ...controlTranslations, ...infoTranslations }));
    }, 2000);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
