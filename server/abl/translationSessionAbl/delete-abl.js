const TranslationSessionDao = require("../../dao/translationSessionDao");
const path = require("path");

let dao = new TranslationSessionDao(
    path.join(__dirname, "..", "..", "storage", "translationSessions.json")
    );

async function DeleteAbl(req, res) {
    const translationSessionId = req.params.id;
    const translationSession = dao.get(translationSessionId);
    if (!translationSession) {
        return res.status(404).json({ error: "Translation session not found" });
    }
    dao.delete(translationSessionId);
    res.json({
        message: `Translation session with id ${translationSessionId} has been deleted.`,
    });
}

module.exports = DeleteAbl;