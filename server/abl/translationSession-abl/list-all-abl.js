const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao();

async function ListAllAbl(req, res) {
    const translationSessions = await dao.list();
    res.json(translationSessions);
}

module.exports = ListAllAbl;