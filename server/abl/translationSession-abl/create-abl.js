const TranslationSessionDao = require("../../dao/translationSession-dao");  // Adjusted to match context
const crypto = require("crypto");

let dao = new TranslationSessionDao();

async function CreateAbl(req, res) {
    let body = req.body;

    // Check if all required parameters are provided
    if (!body.name || !req.user || !req.user.id) {
        return res.status(400).json({
            error: "Invalid input: Missing name or author information",
        });
    }

    // Initialize the translation session object
    let newTranslationSession = {
        id: crypto.randomBytes(8).toString("hex"),
        name: body.name,
        authorID: req.user.id,  // Assuming req.user.id is the ID of the logged-in user
        creationDate: new Date()  // Set the current date and time as the creation date
    };

    try {
        // Create the new translation session
        newTranslationSession = await dao.create(newTranslationSession);
        res.status(201).json(newTranslationSession); // Send back the newly created translation session
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = CreateAbl;
