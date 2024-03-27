const UserDao = require("../../dao/user-dao");
const path = require("path");

let userDao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
);

function UpdateAbl(req, res) {
  const loggedInUser = req.user; // Assuming the user is logged in
  const body = req.body;
  const userIdToUpdate = req.headers["user-id"]; // Assuming user ID is passed in the header

  if (!loggedInUser) {
    return res.status(401).json({ error: "Unauthorized: User not logged in." });
  }

  try {
    // Check if the user is trying to update their own account
    if (loggedInUser.id !== userIdToUpdate) {
      return res
        .status(403)
        .json({ error: "Forbidden: Cannot update other user's account." });
    }

    // Retrieve the user from the storage
    const existingUser = userDao.get(userIdToUpdate);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user information based on provided parameters
    if (body.name) {
      existingUser.name = body.name;
    }

    if (body.email) {
      // Check for duplicate emails
      const userList = userDao.list();
      const duplicateUser = userList.find(
        (user) => user.email === body.email && user.id !== existingUser.id
      );

      if (duplicateUser) {
        return res.status(400).json({ error: "Email already exists." });
      }

      existingUser.email = body.email;
    }

    if (body.password) {
      existingUser.password = body.password;
    }

    // Update the user in the storage
    userDao.update(existingUser.id, existingUser);

    res.status(200).json(existingUser); // Send back the updated user
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = UpdateAbl;
