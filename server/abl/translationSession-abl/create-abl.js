const TranslationDao = require("../../dao/translationDao");
const path = require("path");

let dao = new TranslationDao(
    path.join(__dirname, "..", "..", "storage", "translation.json")
    );

async function CreateAbl(req, res) {
    const translation = await dao.create(req.body);
    res.json(translation);
}

module.exports = CreateAbl;
