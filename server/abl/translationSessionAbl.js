const translationSessionDao = require('../dao/translationSessionDao');

const addTranslationSession = async (req, res) => {
  // Add business logic if needed before saving
  translationSessionDao.addTranslationSession(req.body, res);
};

const viewTranslationSession = async (req, res) => {
  translationSessionDao.viewTranslationSession(req.params.id, res);
};

const filterTranslationSessions = async (req, res) => {
  translationSessionDao.filterTranslationSessions(req.query, res);
};

const renameTranslationSession = async (req, res) => {
  translationSessionDao.renameTranslationSession(req.params.id, req.body.name, res);
};

const showMorseCodeAlphabet = async (req, res) => {
  // Static data, directly send response
  const morseAlphabet = {
    // Define Morse code alphabet here
  };
  res.status(200).send(morseAlphabet);
};

module.exports = {
  addTranslationSession,
  viewTranslationSession,
  filterTranslationSessions,
  renameTranslationSession,
  showMorseCodeAlphabet
};
