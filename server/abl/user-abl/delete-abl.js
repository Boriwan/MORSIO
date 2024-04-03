const UserDao = require("../../dao/user-dao");

let userDao = new UserDao();

async function DeleteAbl(req, res) {
  const userId = req.params.id;
  const user = req.user;

  // Assuming req.user is populated by your authentication middleware
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized: Only admins can delete users." });
  }

  try {
    const userToDelete = await userDao.get(userId); // Await the asynchronous operation
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    await userDao.delete(userId); // Ensure deletion completes before sending a response

    res.json({
      message: `User with id ${userId} has been deleted.`,
    });
  } catch (error) {
    // Handle any errors that might occur during the delete process
    console.error("Delete User Error:", error);
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
}

module.exports = DeleteAbl;
