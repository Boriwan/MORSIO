const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao();

async function DeleteAbl(req, res) {
    const translationSessionId = req.params.id;
    const translationSession = dao.delete(translationSessionId);
    if (!translationSession) {
        return res.status(404).json({ error: "Translation session not found" });
    }
    res.json(translationSession);
}

module.exports = DeleteAbl;