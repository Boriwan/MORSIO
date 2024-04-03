const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao(
    path.join(__dirname, "..", "..", "storage", "translationSessions.json")
    );

async function CreateAbl(req, res) {
    const translationSession = await dao.create(req.body);
    res.json(translationSession);
}

module.exports = CreateAbl;
