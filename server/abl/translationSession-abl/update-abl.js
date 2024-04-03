const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao(
    path.join(__dirname, "..", "..", "storage", "translationSessions.json")
    );

async function UpdateAbl(req, res) {
    const translationSessionId = req.params.id;
    const translationSession = dao.get(translationSessionId);
    if (!translationSession) {
        return res.status(404).json({ error: "Translation session not found" });
    }
    const updatedTranslationSession = await dao.update(translationSessionId, req.body);
    res.json(updatedTranslationSession);
}

module.exports = UpdateAbl;