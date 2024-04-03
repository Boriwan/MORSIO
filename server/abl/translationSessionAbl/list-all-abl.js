const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao(
    path.join(__dirname, "..", "..", "storage", "translationSessions.json")
    );

async function ListAllAbl(req, res) {
    const translationSessions = dao.list();
    res.json(translationSessions);
}

module.exports = ListAllAbl;