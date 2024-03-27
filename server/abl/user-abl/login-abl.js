const UserDao = require("../../dao/user-dao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let userDao = new UserDao();

async function LoginUserAbl(req, res) {
  let body = req.body;

  // Check if required parameters are provided
  if (!body.email || !body.password) {
    return res.status(400).json({
      error: "Invalid input: email and password parameters are required.",
    });
  }

  try {
    // Get the list of users and find the user by email
    const userList = await userDao.list();
    const user = userList.find((u) => u.email === body.email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check if the provided password matches the stored hashed password
    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Create JWT payload
    const payload = {
      uuIdentity: user.uuIdentity, // or any unique identifier
      uuIdentityName: user.name,
      role: user.role, // if you have roles
    };

    // Generate a JWT token
    const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" }); // Replace 'yourSecretKey' with a real secret key

    // Send response with token
    res.status(200).json({ message: "Login successful", token: token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = LoginUserAbl;
