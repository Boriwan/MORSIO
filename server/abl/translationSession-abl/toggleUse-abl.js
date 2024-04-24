// toggleUse-abl.js
const TranslationSessionDao = require("../../dao/translationSession-dao");

let dao = new TranslationSessionDao();

async function toggleUseAbl(req, res) {
    const sessionId = req.params.id;
    const userId = req.user.id; // Extract the user ID from the request, added by your authentication middleware

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        // Retrieve all translation sessions for the logged-in user
        const userSessions = await dao.listByAuthor(userId);

        // Check if the requested session belongs to the user
        const sessionToToggle = userSessions.find(session => session.id === sessionId);
        if (!sessionToToggle) {
            return res.status(404).json({ error: "Translation session not found or you do not have permission to modify it." });
        }

        // Perform the toggle operation
        const togglePromises = userSessions.map(session => {
            const inUse = session.id === sessionId; // Only the specified session will have inUse set to true
            return dao.edit(session.id, { inUse: inUse });
        });

        // Wait for all updates to complete
        await Promise.all(togglePromises);

        // Respond with success
        res.status(200).json({ message: "Session use status updated successfully." });
    } catch (error) {
        console.error("Error toggling use status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = toggleUseAbl;
