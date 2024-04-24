const UserDao = require("../../dao/user-dao");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

let userDao = new UserDao();

async function RegisterUserAbl(req, res) {
  let body = req.body;

  // Check if required parameters are provided
  if (
    !body.userName ||
    !body.email ||
    !body.password ||
    !body.confirmPassword
  ) {
    return res.status(400).json({
      error:
        "Invalid input: name, email, password, and confirmPassword parameters are required.",
    });
  }

  // Check if password and confirmPassword match
  if (body.password !== body.confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // Initialize the user object
  let newUser = {
    
    uuIdentity: crypto.randomBytes(8).toString("hex"),
    userName: body.userName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: "user",
  };

  // Check for duplicate emails
  const userList = await userDao.list(); // Assuming that userDao.list() lists all users
  const duplicateUser = await userList.find(
    (existingUser) => existingUser.email === newUser.email
  );

  if (duplicateUser) {
    return res.status(400).json({ error: "Email already exists." });
  }

  try {
    // Register the new user
    newUser = await userDao.create(newUser);
    res.status(201).json(newUser); // Send back the newly registered user
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = RegisterUserAbl;
