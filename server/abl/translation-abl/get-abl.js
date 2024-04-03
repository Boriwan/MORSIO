const TranslationDao = require("../../dao/translation-dao");
const path = require("path");

let dao = new TranslationDao();

async function GetAbl(req, res) {
  const translation = await dao.get(req.params.id);
  if (translation) {
    res.json(translation);
  } else {
    res.status(400).json({ error: "Translation does not exist" });
  }
}

module.exports = GetAbl;