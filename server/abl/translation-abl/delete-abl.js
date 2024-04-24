const TranslationDao = require("../../dao/translation-dao");

let translationDao = new TranslationDao();

async function DeleteAbl(req, res) {
  const translationId = req.params.id;
  const user = req.user;

  // Předpokládáme, že req.user je naplněn vaším middlewarem pro autentizaci
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized: Only admins can delete translations." });
  }

  try {
    const translationToDelete = await translationDao.get(translationId); // Počkáme na dokončení asynchronní operace
    if (!translationToDelete) {
      return res.status(404).json({ error: "Translation not found" });
    }

    await translationDao.delete(translationId); // Zajistíme, že smazání bude dokončeno před odesláním odpovědi

    res.json({
      message: `Translation with id ${translationId} has been deleted.`,
    });
  } catch (error) {
    // Zpracování případných chyb, které mohou během mazání nastat
    console.error("Delete Translation Error:", error);
    res.status(500).json({ error: "An error occurred while deleting the translation." });
  }
}

module.exports = DeleteAbl;