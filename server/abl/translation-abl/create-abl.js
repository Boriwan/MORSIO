const TranslationDao = require("../../dao/translation-dao");
const TranslationSessionDao = require("../../dao/translationSession-dao");
const crypto = require("crypto");

let translationDao = new TranslationDao();
let sessionDao = new TranslationSessionDao();

async function createAbl(req, res) {
    let body = req.body;

    // Validate input
    if (!body.morseCode || !body.translation) {
        return res.status(400).json({
            error: "Invalid input: Missing required translation details."
        });
    }

    try {
        // Retrieve all sessions for the user
        const sessions = await sessionDao.listByUserId(req.user.id);
        if (!sessions.length) {
            return res.status(404).json({ error: "No sessions found for this user." });
        }

        // Find the session that is currently in use
        const activeSession = sessions.find(session => session.inUse === true);
        if (!activeSession) {
            return res.status(404).json({ error: "No active session available." });
        }

        // Initialize the translation object using the active session ID
        let newTranslation = {
            id: crypto.randomBytes(8).toString("hex"),
            sessionId: activeSession.id, // Use the active session's ID
            morseCode: body.morseCode,
            translation: body.translation,
            creationDate: new Date()
        };

        // Create the new translation
        newTranslation = await translationDao.create(newTranslation);
        res.status(201).json(newTranslation); // Send back the newly created translation
    } catch (e) {
        console.error("Failed to create translation:", e); // Log the error for internal review
        res.status(500).json({ error: "Internal Server Error" }); // Do not send the error message to the client
    }
}

module.exports = createAbl;
