const TranslationSessionDao = require("../../dao/translationSession-dao");
const TranslationDao = require("../../dao/translation-dao"); // You'll need to create this if it doesn't exist

let sessionDao = new TranslationSessionDao();
let translationDao = new TranslationDao(); // Assuming this DAO handles the deletion of translations by session

async function DeleteAbl(req, res) {
    const translationSessionId = req.params.id;
    console.log(translationSessionId);
    try {
        const translationSession = await sessionDao.get(translationSessionId); // Retrieve the session
        if (!translationSession) {
            return res.status(404).json({ error: "Translation session not found" });
        }

        // Check if the logged-in user is the author of the translation session
        if (translationSession.authorID !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to delete this session" });
        }

        // Delete the translation session
        await sessionDao.delete(translationSessionId);

        // Delete all associated translations
        await translationDao.deleteBySessionId(translationSessionId); // This method needs to be implemented in your TranslationDao

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting translation session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = DeleteAbl;
