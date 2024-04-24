// Assuming TranslationDao and TranslationSessionDao follow a similar pattern
const TranslationDao = require("../../dao/translation-dao");
const TranslationSessionDao = require("../../dao/translationSession-dao");
const crypto = require("crypto");

let translationDao = new TranslationDao();
let sessionDao = new TranslationSessionDao();

async function createAbl(req, res) {
    let body = req.body;

    // Validate input
    if (!body.sessionId || !body.morseCode || !body.translation) {
        return res.status(400).json({
            error: "Invalid input: Missing required translation details."
        });
    }

    // Check if the session belongs to the user
    try {
        const session = await sessionDao.get(body.sessionId);
        if (!session) {
            return res.status(404).json({ error: "Session not found." });
        }
        if (session.authorID !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized: You can only add translations to your own sessions." });
        }

        // Initialize the translation object
        let newTranslation = {
            id: crypto.randomBytes(8).toString("hex"),
            sessionId: body.sessionId,
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
