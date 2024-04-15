const TranslationSession = require('../models/translationSessionModel');

const addTranslationSession = async (sessionData, res) => {
  try {
    const newTranslationSession = new TranslationSession(sessionData);
    const savedTranslationSession = await newTranslationSession.save();
    res.status(201).send(savedTranslationSession);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listTranslationSessions = async (res) => {
  try {
    const sessions = await TranslationSession.find();
    res.status(200).send(sessions);
  } catch (error) {
    res.status(400
    ).send
    (error);
  } 
}

const viewTranslationSession = async (id, res) => {
  try {
    const session = await TranslationSession.findById(id);
    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

const filterTranslationSessions = async (queryParams, res) => {
  try {
    const sessions = await TranslationSession.find(queryParams);
    res.status(200).send(sessions);
  } catch (error) {
    res.status(400).send(error);
  }
};

const renameTranslationSession = async (id, newName, res) => {
  try {
    const session = await TranslationSession.findByIdAndUpdate(id, { name: newName }, { new: true });
    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTranslationSession = async (id, res) => {
  try {
    const session = await TranslationSession.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addTranslationSession,
  listTranslationSessions,
  viewTranslationSession,
  filterTranslationSessions,
  renameTranslationSession,
  deleteTranslationSession,
};
