const TranslationDao = require("../../dao/translation-dao");

let dao = new TranslationDao();

async function ListAllAbl(req, res) {
  console.log(req.params.sessionId);
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        const sessionId = req.params.sessionId; 
        const translationSessions = await dao.listBySession(sessionId);
        res.json(translationSessions);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = ListAllAbl;
