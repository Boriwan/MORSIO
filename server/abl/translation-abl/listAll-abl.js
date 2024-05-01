const TranslationDao = require("../../dao/translation-dao");
const TranslationSessionDao = require("../../dao/translationSession-dao");

let translationDao = new TranslationDao();
let sessionDao = new TranslationSessionDao();

async function ListAllAbl(req, res) {
    console.log(req.params.sessionId);
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const sessionId = req.params.sessionId;

    try {
        // Retrieve all sessions to update their 'inUse' status
        const userSessions = await sessionDao.listByUserId(req.user.id);
        const togglePromises = userSessions.map(session => {
            const inUse = session.id === sessionId; // Only the specified session will have inUse set to true
            return sessionDao.edit(session.id, { inUse: inUse });
        });

        // Wait for all updates to complete
        await Promise.all(togglePromises);

        // After updating session statuses, list translations for the requested session
        const translationSessions = await translationDao.listBySession(sessionId);
        res.json(translationSessions);
    } catch (error) {
        console.error("Error in ListAllAbl:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = ListAllAbl;
