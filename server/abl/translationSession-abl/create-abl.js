const TranslationDao = require("../../dao/translationDao");
const path = require("path");

let dao = new TranslationDao();

async function CreateAbl(req, res) {
    let body = req.body;

    // Check if required parameters are provided
    if (!body.translationSessionId || !body.sourceText || !body.targetText) {
        return res.status(400).json({
            error: "Invalid input: translationSessionId, sourceText, and targetText parameters are required.",
        });
    }

    // Initialize the translation object
    let newTranslation = {
        translationSessionId: body.translationSessionId,
        sourceText: body.sourceText,
        targetText: body.targetText,
    };

    try {
        // Create the new translation
        newTranslation = await dao.create(newTranslation);
        res.status(201).json(newTranslation); // Send back the newly created translation
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = CreateAbl;
