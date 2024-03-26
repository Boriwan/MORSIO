const express = require('express');
const userAbl = require('../abl/userAbl');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  userAbl.getAllUsers(req, res);
});

// GET a user by ID
router.get('/:id', (req, res) => {
  userAbl.getUserById(req, res);
});

// POST to add a new user
router.post('/', (req, res) => {
  userAbl.addUser(req, res);
});

// PUT to update a user
router.put('/:id', (req, res) => {
  userAbl.updateUser(req, res);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  userAbl.deleteUser(req, res);
});

module.exports = router;
