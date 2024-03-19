
const express = require("express");
const {
  getAllUsers,
  getUsersListById,
} = require("../dao/userDao");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id.toString(); // Ensure the id is an integer
    const usersList = await getUsersListById(id);
    if (usersList) {
      res.json(usersList);
    } else {
      res.status(404).send("Shopping list not found");
    }
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).send(error.message);
  }
});
router.get("/current-user", (req, res) => {
  res.json(req.user); // Send the hardcoded user data
});

module.exports = router;
