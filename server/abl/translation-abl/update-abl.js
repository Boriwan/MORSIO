const TranslationDao = require("../../dao/translation-dao");
const path = require("path");

let translationDao = new TranslationDao(
  path.join(__dirname, "..", "..", "storage", "translations.json")
);

function UpdateAbl(req, res) {
  const body = req.body;
  const translationIdToUpdate = req.headers["translation-id"]; 

  try {
    const existingTranslation = translationDao.get(translationIdToUpdate);

    if (!existingTranslation) {
      return res.status(404).json({ error: "Translation not found." });
    }

   
    if (body.data) {
      existingTranslation.data = body.data;
    }

   
    translationDao.update(translationIdToUpdate, existingTranslation);

    res.status(200).json(existingTranslation); 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = UpdateAbl;