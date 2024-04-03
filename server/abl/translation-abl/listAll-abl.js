const TranslationDao = require("../../dao/translation-dao");
const path = require("path");

let dao = new TranslationDao();

async function ListAllAbl(req, res) {
  const translations = await dao.list();

  res.json(translations);
}

module.exports = ListAllAbl;