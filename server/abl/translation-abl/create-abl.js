// Assuming TranslationDao follows a similar pattern to TranslationSessionDao
const TranslationDao = require("../../dao/translation-dao"); // Adjust the path as necessary
const crypto = require("crypto");

let dao = new TranslationDao();

async function createAbl(req, res) {
    let body = req.body;

    // Validate input; you might want to check for morseCode and translation fields here
    if (!body.sessionId || !body.morseCode || !body.translation) {
        return res.status(400).json({
            error: "Invalid input: Missing required translation details",
        });
    }

    // Initialize the translation object
    let newTranslation = {
        id: crypto.randomBytes(8).toString("hex"),
        sessionId: body.sessionId,
        morseCode: body.morseCode,
        translation: body.translation,
        creationDate: new Date() 
    };

    try {
        // Create the new translation
        newTranslation = await dao.create(newTranslation);
        res.status(201).json(newTranslation); // Send back the newly created translation
    } catch (e) {
        console.error("Failed to create translation:", e); // Log the error for internal review
        res.status(500).json({ error: "Internal Server Error" }); // Do not send the error message to the client
    }
}

module.exports = createAbl;
