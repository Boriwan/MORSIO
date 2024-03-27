var express = require("express");
var router = express.Router();
const RegisterAbl = require("../abl/user-abl/register-abl");
const LoginAbl = require("../abl/user-abl/login-abl");
const GetAbl = require("../abl/user-abl/get-abl");
const ListAll = require("../abl/user-abl/list-all-abl");
const DeleteAbl = require("../abl/user-abl/delete-abl");
const UpdateAbl = require("../abl/user-abl/update-abl");
const { tokenBlacklist, blacklistToken } = require("../middleware/authManager");
const passport = require("passport");

// get user by its ID
router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

// returns a list of all users
router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login", // Redirect to your login page on failure
  })
);
//creates a new user
router.post("/register", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  RegisterAbl(req, res);
});

//login as a user
router.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  LoginAbl(req, res);
});
// Assuming you have a logout route
router.post("/logout", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    blacklistToken(token);
  }
  // Perform other logout operations
  res.sendStatus(200);
});

//update a certain user by its ID
router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});

//delete a certain user by its ID
router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
