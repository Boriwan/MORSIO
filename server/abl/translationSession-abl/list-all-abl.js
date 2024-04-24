const TranslationSessionDao = require("../../dao/translationSession-dao");

let dao = new TranslationSessionDao();

async function ListAllAbl(req, res) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        const authorId = req.user.id;  // Get the author ID from the logged-in user
        const translationSessions = await dao.listByAuthor(authorId);
        res.json(translationSessions);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = ListAllAbl;
