const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao();

async function DeleteAbl(req, res) {
    const translationSessionId = req.params.id;
    const translationSession = dao.get(translationSessionId);
    if (!translationSession) {
        return res.status(404).json({ error: "Translation session not found" });
    }
    await dao.delete(translationSessionId);
    res.status(204).end();
}

module.exports = DeleteAbl;