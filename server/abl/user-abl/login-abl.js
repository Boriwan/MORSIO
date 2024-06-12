const UserDao = require("../../dao/user-dao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let userDao = new UserDao();

async function LoginUserAbl(req, res) {
  const { email, password } = req.body;

  // Check if required parameters are provided
  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid input: email and password parameters are required.",
    });
  }

  try {
    // Find the user by email directly using userDao
    const user = await userDao.findByEmail(email); // Adjust findByEmail method based on your actual UserDao implementation

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check if the provided password matches the stored hashed password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Create JWT payload
    const payload = {
      id: user.id, // or any unique identifier
      email: user.email,
      userName: user.userName,
      role: user.role, // if you have roles
    };

    // Generate a JWT token
    
    const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" }); 

    // Send response with token
    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = LoginUserAbl;
